/**
 * YOUPI PG Payment Gateway Integration Helper
 * Provides programmatic payment execution for HYPERS Curricula and Course tracks.
 */

export async function ensureYoupiLoaded() {
  if (typeof window === 'undefined') return false;
  if (window.Youpi && typeof window.Youpi.pay === 'function') return true;

  return new Promise((resolve) => {
    // Check if script element already exists
    let script = document.querySelector('script[src*="youpi.js"]');
    if (!script) {
      script = document.createElement('script');
      script.src = '/youpi.js';
      script.setAttribute('data-youpi-key', '00000000-0000-0000-0000-000000000001');
      script.setAttribute('data-api-url', 'http://localhost:6100');
      script.setAttribute('data-portal-url', 'http://localhost:7050');
      script.setAttribute('data-name', 'HYPERS ACADEMY');
      script.setAttribute('data-currency', 'INR');
      document.head.appendChild(script);
    }

    const checkInterval = setInterval(() => {
      if (window.Youpi && typeof window.Youpi.pay === 'function') {
        clearInterval(checkInterval);
        resolve(true);
      }
    }, 100);

    // Timeout after 3 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
      resolve(Boolean(window.Youpi && typeof window.Youpi.pay === 'function'));
    }, 3000);
  });
}

/**
 * Initiates the payment wall checkout for a curriculum course
 * @param {Object} course - Course or curriculum object
 * @param {string|number} [amount=2799] - Amount in INR
 * @param {Object} [callbacks] - Optional custom handlers
 */
export async function triggerYoupiPayment(course, amount = '2799.00', callbacks = {}) {
  const courseTitle = course?.title || 'Industrial Curriculum';
  const courseId = course?.id || course?.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'course';
  const orderId = `HYPERS-${courseId.toUpperCase().slice(0, 16)}-${Date.now().toString().slice(-6)}`;
  const cleanAmount = typeof amount === 'number' ? amount : parseFloat(amount) || 2799;

  await ensureYoupiLoaded();

  if (window.Youpi && typeof window.Youpi.pay === 'function') {
    try {
      return await window.Youpi.pay({
        order_id: orderId,
        orderId: orderId,
        amount: cleanAmount,
        currency: 'INR',
        name: 'HYPERS ACADEMY',
        description: `Tuition Pass: ${courseTitle}`,
        customer: {
          name: 'Frontier Candidate',
          email: 'engineer@hypers.dev',
          phone: '9876543210'
        },
        metadata: {
          courseId,
          courseTitle,
          platform: 'HYPERS Production Academy',
          enrollmentType: 'LIFETIME_ACCESS'
        },
        portalUrl: 'http://localhost:7050',
        apiUrl: 'http://localhost:6100',
        successUrl: `/order-success?order_id=${encodeURIComponent(orderId)}&course=${encodeURIComponent(courseTitle)}&amount=${encodeURIComponent(cleanAmount)}`,
        handler: function (response) {
          console.log(`[YOUPI PG] Payment Confirmed:`, response);
          if (typeof callbacks.onSuccess === 'function') {
            callbacks.onSuccess(response);
          } else {
            const utr = response.utr || response.bankRef || 'UPI-' + Date.now().toString().slice(-8);
            window.location.href = `/order-success?order_id=${encodeURIComponent(response.order_id || orderId)}&utr=${encodeURIComponent(utr)}&amount=${encodeURIComponent(cleanAmount)}&course=${encodeURIComponent(courseTitle)}`;
          }
        },
        onClose: function () {
          console.log('[YOUPI PG] Customer closed payment modal');
          if (typeof callbacks.onClose === 'function') {
            callbacks.onClose();
          }
        },
        onFailed: function (err) {
          console.error('[YOUPI PG] Payment failed or expired:', err);
          if (typeof callbacks.onFailed === 'function') {
            callbacks.onFailed(err);
          }
        }
      });
    } catch (err) {
      console.warn('[YOUPI PG] Programmatic pay threw, trying fallback:', err);
    }
  }

  // Direct HTTP Fallback if Youpi SDK script was blocked
  try {
    const apiEndpoint = typeof window !== 'undefined' ? '/api/v1/payments' : 'http://localhost:6100/api/v1/payments';
    const res = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Merchant-Id': '00000000-0000-0000-0000-000000000001'
      },
      body: JSON.stringify({
        orderId,
        amount: cleanAmount.toFixed(2),
        currency: 'INR',
        description: `Tuition Pass: ${courseTitle}`,
        metadata: { courseId, courseTitle }
      })
    });

    const data = await res.json();
    if (data.checkoutUrl) {
      window.open(data.checkoutUrl, '_blank');
      return data;
    }
    throw new Error(data.error || 'Failed to create payment session');
  } catch (apiErr) {
    alert(`YOUPI Payment Gateway: ${apiErr.message}\nMake sure YOUPI PG services are running on port 6100.`);
    throw apiErr;
  }
}
