// ─── Low-Level Design (LLD) Core Problems ─────────────────────────────────
// 20 curated problems: 10 complex system designs + 10 classic OOD problems
// Each includes requirements, design patterns, UML, and scaffold code

export const lldProblems = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PART A — 10 COMPLEX SYSTEM DESIGNS FROM SCRATCH
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 1,
    title: 'Design a Ride-Sharing Platform (Uber/Ola)',
    difficulty: 'Hard',
    category: 'Complex System',
    tags: ['Strategy', 'Observer', 'State', 'Location Services'],
    estimatedTime: '90 min',
    companies: ['Uber', 'Ola', 'Lyft', 'Google'],
    description:
      'Design a ride-sharing platform that matches riders with nearby drivers in real-time, handles trip lifecycle, fare calculation, and driver-rider rating.',
    requirements: [
      'Riders can request a ride specifying pick-up & drop-off locations.',
      'System matches the closest available driver using a location-based strategy.',
      'Drivers can accept or decline ride requests within a timeout window.',
      'Trip progresses through states: REQUESTED → ACCEPTED → IN_PROGRESS → COMPLETED / CANCELLED.',
      'Fare is calculated dynamically based on distance, time, surge pricing, and ride type (Pool, Go, Premier).',
      'Both rider and driver can rate each other after a trip.',
      'Support ride cancellation with configurable penalty rules.',
      'Maintain a real-time location feed for active trips.',
    ],
    designPatterns: ['Strategy (fare calculation)', 'Observer (trip status updates)', 'State (trip lifecycle)', 'Factory (ride type creation)'],
    uml: `
┌─────────────────┐      ┌──────────────────┐
│   RideService   │      │     Rider        │
├─────────────────┤      ├──────────────────┤
│ - tripManager   │─────▶│ - id             │
│ - matchEngine   │      │ - name           │
│ - fareCalc      │      │ - location: Loc  │
├─────────────────┤      │ - paymentMethod  │
│ + requestRide() │      └──────────────────┘
│ + cancelRide()  │
└────────┬────────┘      ┌──────────────────┐
         │               │     Driver       │
         │               ├──────────────────┤
         └──────────────▶│ - id             │
                         │ - vehicle: Veh   │
                         │ - location: Loc  │
┌─────────────────┐      │ - status         │
│      Trip       │      └──────────────────┘
├─────────────────┤
│ - id            │      ┌──────────────────┐
│ - rider         │─────▶│  FareStrategy    │
│ - driver        │      ├──────────────────┤
│ - state: State  │      │ + calculate()    │
│ - route         │      └────────┬─────────┘
│ - fare          │        ┌──────┴───────┐
├─────────────────┤        │              │
│ + accept()      │   PoolFare      PremierFare
│ + start()       │
│ + complete()    │
│ + cancel()      │
└─────────────────┘`,
    scaffold: `class Trip {
  constructor(rider, driver, rideType) {
    this.id = generateId();
    this.rider = rider;
    this.driver = driver;
    this.state = TripState.REQUESTED;
    this.rideType = rideType;
    this.fare = null;
    this.route = null;
    this.observers = [];
  }

  accept() {
    if (this.state !== TripState.REQUESTED) throw new Error('Invalid transition');
    this.state = TripState.ACCEPTED;
    this.notifyObservers();
  }

  start() { /* REQUESTED → IN_PROGRESS */ }
  complete() { /* IN_PROGRESS → COMPLETED, calculate fare */ }
  cancel(reason) { /* Any → CANCELLED with penalty check */ }

  addObserver(obs) { this.observers.push(obs); }
  notifyObservers() { this.observers.forEach(o => o.update(this)); }
}

// Strategy Pattern — Fare Calculation
class FareStrategy {
  calculate(distance, duration, surgeMultiplier) {
    throw new Error('Must implement calculate');
  }
}

class PoolFareStrategy extends FareStrategy {
  calculate(distance, duration, surge) {
    return (distance * 6 + duration * 1) * surge * 0.65;
  }
}

class PremierFareStrategy extends FareStrategy {
  calculate(distance, duration, surge) {
    return (distance * 14 + duration * 3) * surge;
  }
}`,
  },

  {
    id: 2,
    title: 'Design a Food Delivery System (Zomato/Swiggy)',
    difficulty: 'Hard',
    category: 'Complex System',
    tags: ['Observer', 'Strategy', 'State', 'Builder'],
    estimatedTime: '90 min',
    companies: ['Zomato', 'Swiggy', 'DoorDash', 'Uber Eats'],
    description:
      'Design a food delivery platform that supports restaurant browsing, cart management, order placement, real-time tracking, and delivery assignment.',
    requirements: [
      'Users browse restaurants with menu items, prices, and availability.',
      'Cart supports adding/removing items with quantity, customizations, and coupon application.',
      'Order lifecycle: PLACED → CONFIRMED → PREPARING → OUT_FOR_DELIVERY → DELIVERED / CANCELLED.',
      'System assigns optimal delivery partner based on proximity and current load.',
      'Real-time order tracking with ETA estimation.',
      'Support multiple payment methods and split payments.',
      'Restaurants can mark items as out-of-stock in real time.',
      'Rating system for restaurants, food items, and delivery partners.',
    ],
    designPatterns: ['Builder (order construction)', 'Observer (order status)', 'Strategy (delivery assignment)', 'State (order lifecycle)'],
    uml: `
┌──────────────────┐     ┌──────────────────┐
│    Restaurant    │     │     MenuItem     │
├──────────────────┤     ├──────────────────┤
│ - id             │────▶│ - name           │
│ - name           │     │ - price          │
│ - menu: List     │     │ - category       │
│ - isOpen         │     │ - isAvailable    │
└──────────────────┘     └──────────────────┘

┌──────────────────┐     ┌──────────────────┐
│      Cart        │     │      Order       │
├──────────────────┤     ├──────────────────┤
│ - items: List    │────▶│ - id             │
│ - coupon         │     │ - user           │
│ - total          │     │ - restaurant     │
├──────────────────┤     │ - items          │
│ + addItem()      │     │ - state: State   │
│ + applyCoupon()  │     │ - deliveryAgent  │
│ + checkout()     │     │ - total          │
└──────────────────┘     └──────┬───────────┘
                                │
                    ┌───────────┴──────────┐
                    │  DeliveryAssigner    │
                    ├─────────────────────┤
                    │ + assignAgent()     │
                    │ + findNearest()     │
                    └─────────────────────┘`,
    scaffold: `class Order {
  constructor(user, restaurant) {
    this.id = generateId();
    this.user = user;
    this.restaurant = restaurant;
    this.items = [];
    this.state = OrderState.PLACED;
    this.deliveryAgent = null;
    this.observers = [];
  }

  confirm() { this.setState(OrderState.CONFIRMED); }
  markPreparing() { this.setState(OrderState.PREPARING); }
  dispatchForDelivery(agent) {
    this.deliveryAgent = agent;
    this.setState(OrderState.OUT_FOR_DELIVERY);
  }
  deliver() { this.setState(OrderState.DELIVERED); }

  setState(newState) {
    // validate transition
    this.state = newState;
    this.observers.forEach(o => o.onOrderUpdate(this));
  }
}

class OrderBuilder {
  constructor(user, restaurant) {
    this.order = new Order(user, restaurant);
  }
  addItem(item, qty, customizations) {
    this.order.items.push({ item, qty, customizations });
    return this;
  }
  applyCoupon(code) { /* discount logic */ return this; }
  build() { return this.order; }
}`,
  },

  {
    id: 3,
    title: 'Design a Video Streaming Platform (Netflix/YouTube)',
    difficulty: 'Hard',
    category: 'Complex System',
    tags: ['Observer', 'Strategy', 'Decorator', 'Proxy'],
    estimatedTime: '90 min',
    companies: ['Netflix', 'YouTube', 'Amazon Prime', 'Hotstar'],
    description:
      'Design a video streaming service supporting content cataloging, adaptive streaming, user profiles, watchlists, recommendations, and subscription tiers.',
    requirements: [
      'Catalog of videos organized by genre, language, and type (Movie, Series, Documentary).',
      'Users have profiles with independent watch history and preferences.',
      'Adaptive bitrate streaming based on user bandwidth.',
      'Support subscription tiers (Free, Basic, Premium) with content gating.',
      'Watchlist management (add, remove, reorder).',
      'Continue watching — resume from the last position.',
      'Content recommendations based on watch history and genre affinity.',
      'Parental controls via profile-level content filters.',
    ],
    designPatterns: ['Strategy (streaming quality)', 'Decorator (content filters)', 'Observer (new content alerts)', 'Proxy (lazy loading of video metadata)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│  StreamingService│      │     Video        │
├──────────────────┤      ├──────────────────┤
│ - catalog: List  │─────▶│ - id             │
│ - users: List    │      │ - title          │
├──────────────────┤      │ - genre          │
│ + search()       │      │ - duration       │
│ + recommend()    │      │ - tier: SubTier  │
└──────────────────┘      └──────────────────┘

┌──────────────────┐      ┌──────────────────┐
│   UserProfile    │      │   Subscription   │
├──────────────────┤      ├──────────────────┤
│ - name           │      │ - tier           │
│ - watchHistory   │      │ - maxScreens     │
│ - watchlist      │      │ - canDownload    │
│ - preferences    │      │ - hdEnabled      │
│ - parentalLock   │      └──────────────────┘
├──────────────────┤
│ + addToWatchlist()│     ┌──────────────────┐
│ + getResume()    │      │  StreamStrategy  │
└──────────────────┘      ├──────────────────┤
                          │ + selectQuality()│
                          └────────┬─────────┘
                           ┌──────┴──────┐
                        Low360p     HD1080p`,
    scaffold: `class Video {
  constructor(id, title, genre, duration, tier) {
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.duration = duration;
    this.requiredTier = tier;
  }
}

class UserProfile {
  constructor(name) {
    this.name = name;
    this.watchHistory = []; // { videoId, position, timestamp }
    this.watchlist = [];
    this.preferences = {};
    this.parentalControlEnabled = false;
  }

  addToWatchlist(video) { this.watchlist.push(video); }
  getResumePosition(videoId) {
    const entry = this.watchHistory.find(h => h.videoId === videoId);
    return entry ? entry.position : 0;
  }
}

// Strategy — Adaptive Bitrate
class StreamQualityStrategy {
  selectQuality(bandwidthMbps) { throw new Error('implement'); }
}
class AutoQualityStrategy extends StreamQualityStrategy {
  selectQuality(bw) {
    if (bw >= 10) return '1080p';
    if (bw >= 5) return '720p';
    if (bw >= 2) return '480p';
    return '360p';
  }
}`,
  },

  {
    id: 4,
    title: 'Design a Chat Messaging System (WhatsApp)',
    difficulty: 'Hard',
    category: 'Complex System',
    tags: ['Observer', 'Mediator', 'Command', 'Singleton'],
    estimatedTime: '90 min',
    companies: ['Meta', 'WhatsApp', 'Slack', 'Microsoft'],
    description:
      'Design a real-time messaging system supporting 1-on-1 chats, group chats, message delivery receipts, media sharing, and online presence tracking.',
    requirements: [
      'Users can send text, image, video, and document messages.',
      'Support 1-on-1 and group conversations (up to 256 participants).',
      'Message delivery status: SENT → DELIVERED → READ.',
      'End-to-end encryption placeholder for all messages.',
      'Online/offline presence indicator with last-seen timestamps.',
      'Group admin can add/remove members, change group info.',
      'Message reply, forward, and delete (for everyone / for me).',
      'Typing indicators and read receipts.',
    ],
    designPatterns: ['Observer (presence & status)', 'Mediator (chat room coordination)', 'Command (message operations)', 'Singleton (connection manager)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│   ChatService    │      │      User        │
├──────────────────┤      ├──────────────────┤
│ - conversations  │      │ - id             │
│ - connManager    │      │ - name           │
├──────────────────┤      │ - status: Online │
│ + sendMessage()  │      │ - lastSeen       │
│ + createGroup()  │      └──────────────────┘
└────────┬─────────┘
         │                ┌──────────────────┐
         ▼                │     Message      │
┌──────────────────┐      ├──────────────────┤
│  Conversation    │─────▶│ - id             │
├──────────────────┤      │ - sender         │
│ - id             │      │ - content        │
│ - participants   │      │ - type: MsgType  │
│ - messages       │      │ - status: Deliv  │
│ - isGroup        │      │ - timestamp      │
├──────────────────┤      └──────────────────┘
│ + addMessage()   │
│ + addMember()    │      ┌──────────────────┐
│ + removeMember() │      │  MessageCommand  │
└──────────────────┘      ├──────────────────┤
                          │ + execute()      │
                          │ + undo()         │
                          └────────┬─────────┘
                           ┌──────┴──────┐
                       SendCmd     DeleteCmd`,
    scaffold: `class Message {
  constructor(sender, content, type = 'TEXT') {
    this.id = generateId();
    this.sender = sender;
    this.content = content;
    this.type = type; // TEXT, IMAGE, VIDEO, DOCUMENT
    this.status = DeliveryStatus.SENT;
    this.timestamp = Date.now();
    this.replyTo = null;
  }
  markDelivered() { this.status = DeliveryStatus.DELIVERED; }
  markRead() { this.status = DeliveryStatus.READ; }
}

class Conversation {
  constructor(participants, isGroup = false) {
    this.id = generateId();
    this.participants = participants;
    this.messages = [];
    this.isGroup = isGroup;
    this.groupAdmin = isGroup ? participants[0] : null;
    this.observers = [];
  }

  addMessage(msg) {
    this.messages.push(msg);
    this.observers.forEach(o => o.onNewMessage(this, msg));
  }

  addMember(user) {
    if (!this.isGroup) throw new Error('Cannot add member to DM');
    if (this.participants.length >= 256) throw new Error('Group full');
    this.participants.push(user);
  }
}`,
  },

  {
    id: 5,
    title: 'Design a Payment Gateway (Razorpay/Stripe)',
    difficulty: 'Hard',
    category: 'Complex System',
    tags: ['Strategy', 'Chain of Responsibility', 'State', 'Template Method'],
    estimatedTime: '90 min',
    companies: ['Razorpay', 'Stripe', 'PayPal', 'PhonePe'],
    description:
      'Design a payment processing system that supports multiple payment methods, fraud detection, transaction lifecycle management, refunds, and settlement.',
    requirements: [
      'Support payment methods: Credit/Debit Card, UPI, Net Banking, Wallet.',
      'Transaction lifecycle: INITIATED → PROCESSING → SUCCESS / FAILED / REFUNDED.',
      'Fraud detection pipeline with configurable rules (velocity check, amount threshold, geo-mismatch).',
      'Idempotency — duplicate payment requests must return the same result.',
      'Retry mechanism with exponential backoff for gateway timeouts.',
      'Partial and full refund support.',
      'Webhook notifications for merchants on transaction status changes.',
      'PCI-DSS compliant card data handling (tokenization).',
    ],
    designPatterns: ['Strategy (payment method)', 'Chain of Responsibility (fraud checks)', 'State (transaction lifecycle)', 'Template Method (payment flow)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│ PaymentGateway   │      │   Transaction    │
├──────────────────┤      ├──────────────────┤
│ - fraudEngine    │      │ - id             │
│ - paymentProcs   │      │ - amount         │
│ - txnStore       │      │ - currency       │
├──────────────────┤      │ - state: State   │
│ + processPayment │─────▶│ - paymentMethod  │
│ + refund()       │      │ - idempotencyKey │
│ + getStatus()    │      └──────────────────┘
└──────────────────┘
                          ┌──────────────────┐
┌──────────────────┐      │  FraudChecker    │
│ PaymentStrategy  │      ├──────────────────┤
├──────────────────┤      │ - next: Checker  │
│ + pay()          │      │ + check()        │
│ + validate()     │      └────────┬─────────┘
└────────┬─────────┘       ┌──────┴───────┐
  ┌──────┴──────┐     VelocityChk   AmountChk
CardPay     UPIPay`,
    scaffold: `class Transaction {
  constructor(amount, currency, method, idempotencyKey) {
    this.id = generateId();
    this.amount = amount;
    this.currency = currency;
    this.method = method;
    this.state = TxnState.INITIATED;
    this.idempotencyKey = idempotencyKey;
    this.createdAt = Date.now();
    this.refundedAmount = 0;
  }

  process() { this.state = TxnState.PROCESSING; }
  succeed() { this.state = TxnState.SUCCESS; }
  fail(reason) { this.state = TxnState.FAILED; this.failureReason = reason; }
  refund(amount) {
    if (amount > this.amount - this.refundedAmount) throw new Error('Exceeds refundable');
    this.refundedAmount += amount;
    if (this.refundedAmount === this.amount) this.state = TxnState.REFUNDED;
  }
}

// Chain of Responsibility — Fraud Detection
class FraudChecker {
  constructor(next = null) { this.next = next; }
  check(txn) {
    if (this.next) return this.next.check(txn);
    return true; // passed all checks
  }
}
class VelocityChecker extends FraudChecker {
  check(txn) {
    // Reject if > 5 txns in 1 min from same user
    const passed = true; // ... logic
    if (!passed) throw new Error('Velocity check failed');
    return super.check(txn);
  }
}`,
  },

  {
    id: 6,
    title: 'Design a Social Media Feed (Twitter/Instagram)',
    difficulty: 'Hard',
    category: 'Complex System',
    tags: ['Observer', 'Strategy', 'Iterator', 'Composite'],
    estimatedTime: '90 min',
    companies: ['Twitter', 'Meta', 'LinkedIn', 'Snap'],
    description:
      'Design a social media platform with user profiles, posts (text/image/video), followers, a personalized news feed, likes, comments, and notifications.',
    requirements: [
      'Users can create posts with text, images, or video attachments.',
      'Follow/unfollow other users; followers see posts in their feed.',
      'News feed is ranked using a configurable algorithm (chronological, engagement-based, ML-scored).',
      'Like, comment, and share (repost) functionality on posts.',
      'Real-time notifications for likes, comments, follows, and mentions.',
      'Hashtag and mention parsing within post content.',
      'User can mute, block, or report other users.',
      'Infinite scroll pagination for feed loading.',
    ],
    designPatterns: ['Observer (notifications)', 'Strategy (feed ranking)', 'Iterator (feed pagination)', 'Composite (nested comments)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│      User        │      │      Post        │
├──────────────────┤      ├──────────────────┤
│ - id             │─────▶│ - id             │
│ - username       │      │ - author         │
│ - followers      │      │ - content        │
│ - following      │      │ - media: List    │
│ - blockedUsers   │      │ - likes: Set     │
├──────────────────┤      │ - comments: List │
│ + follow()       │      │ - hashtags       │
│ + unfollow()     │      │ - createdAt      │
│ + createPost()   │      ├──────────────────┤
│ + getFeed()      │      │ + like()         │
└──────────────────┘      │ + comment()      │
                          │ + share()        │
┌──────────────────┐      └──────────────────┘
│  FeedStrategy    │
├──────────────────┤      ┌──────────────────┐
│ + rank(posts)    │      │   Notification   │
└────────┬─────────┘      ├──────────────────┤
  ┌──────┴──────┐         │ - type           │
Chrono    Engagement      │ - actor          │
                          │ - target         │
                          │ - isRead         │
                          └──────────────────┘`,
    scaffold: `class Post {
  constructor(author, content, media = []) {
    this.id = generateId();
    this.author = author;
    this.content = content;
    this.media = media;
    this.likes = new Set();
    this.comments = [];
    this.shares = 0;
    this.hashtags = this.extractHashtags(content);
    this.mentions = this.extractMentions(content);
    this.createdAt = Date.now();
  }
  extractHashtags(text) { return text.match(/#\\w+/g) || []; }
  extractMentions(text) { return text.match(/@\\w+/g) || []; }
  like(userId) { this.likes.add(userId); }
  unlike(userId) { this.likes.delete(userId); }
  comment(user, text) { this.comments.push({ user, text, ts: Date.now() }); }
}

// Strategy — Feed Ranking
class FeedRankingStrategy {
  rank(posts) { throw new Error('implement'); }
}
class ChronologicalStrategy extends FeedRankingStrategy {
  rank(posts) { return [...posts].sort((a, b) => b.createdAt - a.createdAt); }
}
class EngagementStrategy extends FeedRankingStrategy {
  rank(posts) {
    return [...posts].sort((a, b) =>
      (b.likes.size + b.comments.length) - (a.likes.size + a.comments.length)
    );
  }
}`,
  },

  {
    id: 7,
    title: 'Design an Online Auction System (eBay)',
    difficulty: 'Hard',
    category: 'Complex System',
    tags: ['Observer', 'Strategy', 'State', 'Proxy'],
    estimatedTime: '75 min',
    companies: ['eBay', 'Amazon', 'Flipkart', 'Sotheby\'s'],
    description:
      'Design an auction platform where sellers list items, buyers place bids in real-time, and the system handles auction lifecycle, auto-bidding, and payment settlement.',
    requirements: [
      'Sellers list items with title, description, images, starting bid, reserve price, and auction end time.',
      'Buyers place bids; each bid must exceed the current highest bid by a minimum increment.',
      'Support auto-bidding — user sets a max limit, system bids incrementally on their behalf.',
      'Auction states: SCHEDULED → ACTIVE → ENDED → SETTLED.',
      'Real-time notifications to all watchers when a new bid is placed.',
      'Anti-sniping: extend auction by 5 minutes if bid placed in last 2 minutes.',
      'Winner determination and payment settlement after auction ends.',
      'Bid history is immutable and auditable.',
    ],
    designPatterns: ['Observer (bid notifications)', 'Strategy (auto-bidding)', 'State (auction lifecycle)', 'Proxy (bid validation)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│  AuctionService  │      │    AuctionItem   │
├──────────────────┤      ├──────────────────┤
│ - auctions: Map  │─────▶│ - id             │
│ - bidEngine      │      │ - seller         │
├──────────────────┤      │ - title          │
│ + createAuction()│      │ - startingBid    │
│ + placeBid()     │      │ - reservePrice   │
│ + endAuction()   │      │ - currentHighBid │
└──────────────────┘      │ - state          │
                          │ - endTime        │
┌──────────────────┐      │ - bids: List     │
│       Bid        │      │ - watchers: List │
├──────────────────┤      ├──────────────────┤
│ - id             │      │ + placeBid()     │
│ - bidder         │      │ + extendIfSnipe()│
│ - amount         │      │ + getWinner()    │
│ - timestamp      │      └──────────────────┘
│ - isAutoBid      │
└──────────────────┘      ┌──────────────────┐
                          │   AutoBidder     │
                          ├──────────────────┤
                          │ - maxLimit       │
                          │ - increment      │
                          │ + shouldBid()    │
                          │ + nextBidAmount()│
                          └──────────────────┘`,
    scaffold: `class AuctionItem {
  constructor(seller, title, startingBid, reservePrice, durationMs) {
    this.id = generateId();
    this.seller = seller;
    this.title = title;
    this.startingBid = startingBid;
    this.reservePrice = reservePrice;
    this.currentHighBid = null;
    this.state = AuctionState.SCHEDULED;
    this.endTime = Date.now() + durationMs;
    this.bids = [];
    this.watchers = [];
  }

  placeBid(bidder, amount) {
    if (this.state !== AuctionState.ACTIVE) throw new Error('Auction not active');
    if (this.currentHighBid && amount <= this.currentHighBid.amount)
      throw new Error('Bid too low');
    
    const bid = new Bid(bidder, amount);
    this.bids.push(bid);
    this.currentHighBid = bid;
    this.extendIfSnipe();
    this.notifyWatchers(bid);
    return bid;
  }

  extendIfSnipe() {
    const timeLeft = this.endTime - Date.now();
    if (timeLeft < 2 * 60 * 1000) {
      this.endTime += 5 * 60 * 1000;
    }
  }

  getWinner() {
    if (this.state !== AuctionState.ENDED) return null;
    if (!this.currentHighBid) return null;
    if (this.currentHighBid.amount < this.reservePrice) return null;
    return this.currentHighBid.bidder;
  }
}`,
  },

  {
    id: 8,
    title: 'Design a Hotel Booking System (MakeMyTrip/Booking.com)',
    difficulty: 'Hard',
    category: 'Complex System',
    tags: ['Strategy', 'Observer', 'Template Method', 'Decorator'],
    estimatedTime: '75 min',
    companies: ['MakeMyTrip', 'Booking.com', 'Airbnb', 'OYO'],
    description:
      'Design a hotel booking platform supporting room search, availability management, reservation lifecycle, dynamic pricing, and cancellation policies.',
    requirements: [
      'Hotels list rooms categorized by type (Standard, Deluxe, Suite) with amenities and pricing.',
      'Search with filters: location, check-in/check-out dates, guests, price range, rating.',
      'Room availability is checked against reservations to prevent double-booking.',
      'Reservation lifecycle: PENDING → CONFIRMED → CHECKED_IN → CHECKED_OUT / CANCELLED.',
      'Dynamic pricing based on demand, season, and day-of-week.',
      'Cancellation policies: Free, Partial Refund, Non-Refundable based on timing.',
      'Support add-on services (breakfast, airport pickup, spa) via decorator pattern.',
      'Review and rating system for hotels.',
    ],
    designPatterns: ['Strategy (pricing & cancellation)', 'Observer (booking confirmations)', 'Template Method (booking flow)', 'Decorator (add-on services)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│      Hotel       │      │      Room        │
├──────────────────┤      ├──────────────────┤
│ - id             │─────▶│ - id             │
│ - name           │      │ - type: RoomType │
│ - location       │      │ - basePrice      │
│ - rooms: List    │      │ - amenities      │
│ - rating         │      │ - isAvailable    │
├──────────────────┤      └──────────────────┘
│ + searchRooms()  │
│ + checkAvail()   │      ┌──────────────────┐
└──────────────────┘      │   Reservation    │
                          ├──────────────────┤
┌──────────────────┐      │ - id             │
│ PricingStrategy  │      │ - guest          │
├──────────────────┤      │ - room           │
│ + calculatePrice │      │ - checkIn        │
└────────┬─────────┘      │ - checkOut       │
  ┌──────┴──────┐         │ - state          │
Season    Demand          │ - addOns: List   │
                          │ - totalPrice     │
                          ├──────────────────┤
                          │ + confirm()      │
                          │ + cancel()       │
                          │ + checkIn()      │
                          └──────────────────┘`,
    scaffold: `class Reservation {
  constructor(guest, room, checkIn, checkOut) {
    this.id = generateId();
    this.guest = guest;
    this.room = room;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.state = ReservationState.PENDING;
    this.addOns = [];
    this.totalPrice = 0;
  }

  confirm(pricingStrategy) {
    const nights = this.getNights();
    this.totalPrice = pricingStrategy.calculate(this.room, nights, this.checkIn);
    this.addOns.forEach(a => { this.totalPrice += a.getPrice(); });
    this.state = ReservationState.CONFIRMED;
  }

  cancel(cancellationPolicy) {
    const refund = cancellationPolicy.calculateRefund(this);
    this.state = ReservationState.CANCELLED;
    return refund;
  }

  getNights() {
    return Math.ceil((this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24));
  }
}

// Decorator — Add-on Services
class RoomAddOn {
  constructor(room) { this.room = room; }
  getPrice() { return this.room.basePrice; }
  getDescription() { return this.room.description; }
}
class BreakfastAddOn extends RoomAddOn {
  getPrice() { return super.getPrice() + 500; }
  getDescription() { return super.getDescription() + ' + Breakfast'; }
}`,
  },

  {
    id: 9,
    title: 'Design a Distributed Task Scheduler (Cron/Airflow)',
    difficulty: 'Hard',
    category: 'Complex System',
    tags: ['Observer', 'Strategy', 'Command', 'State'],
    estimatedTime: '90 min',
    companies: ['Google', 'Airbnb', 'LinkedIn', 'Uber'],
    description:
      'Design a distributed task scheduling system that supports recurring jobs, dependency-based DAG execution, priority scheduling, retries, and monitoring.',
    requirements: [
      'Define tasks with execution logic, schedule (cron expression), and priority.',
      'Support task dependencies forming a Directed Acyclic Graph (DAG).',
      'Task states: PENDING → QUEUED → RUNNING → SUCCESS / FAILED / RETRYING.',
      'Configurable retry policy (max retries, backoff strategy).',
      'Distributed execution across worker nodes with load balancing.',
      'Dead-letter queue for permanently failed tasks.',
      'Task result storage and downstream notification on completion.',
      'Admin dashboard for monitoring, pausing, and killing tasks.',
    ],
    designPatterns: ['Command (task encapsulation)', 'Strategy (scheduling & retry)', 'Observer (completion events)', 'State (task lifecycle)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│    Scheduler     │      │      Task        │
├──────────────────┤      ├──────────────────┤
│ - taskQueue      │─────▶│ - id             │
│ - workers: List  │      │ - name           │
│ - dagManager     │      │ - command: Cmd   │
├──────────────────┤      │ - schedule: Cron │
│ + submitTask()   │      │ - state: State   │
│ + executeDag()   │      │ - priority       │
│ + retryTask()    │      │ - retryPolicy    │
└──────────────────┘      │ - dependencies   │
                          ├──────────────────┤
┌──────────────────┐      │ + execute()      │
│   WorkerNode     │      │ + retry()        │
├──────────────────┤      │ + cancel()       │
│ - id             │      └──────────────────┘
│ - capacity       │
│ - runningTasks   │      ┌──────────────────┐
├──────────────────┤      │   RetryStrategy  │
│ + runTask()      │      ├──────────────────┤
│ + reportResult() │      │ + getDelay()     │
└──────────────────┘      └────────┬─────────┘
                           ┌──────┴──────┐
                        Linear    Exponential`,
    scaffold: `class Task {
  constructor(name, command, schedule, priority = 0) {
    this.id = generateId();
    this.name = name;
    this.command = command; // Command pattern
    this.schedule = schedule; // Cron expression
    this.state = TaskState.PENDING;
    this.priority = priority;
    this.retryPolicy = { maxRetries: 3, strategy: 'EXPONENTIAL' };
    this.dependencies = [];
    this.retriesLeft = this.retryPolicy.maxRetries;
    this.result = null;
  }

  execute() {
    this.state = TaskState.RUNNING;
    try {
      this.result = this.command.execute();
      this.state = TaskState.SUCCESS;
    } catch (err) {
      if (this.retriesLeft > 0) {
        this.retriesLeft--;
        this.state = TaskState.RETRYING;
      } else {
        this.state = TaskState.FAILED;
      }
    }
  }

  canExecute(completedTaskIds) {
    return this.dependencies.every(depId => completedTaskIds.has(depId));
  }
}

class DAGExecutor {
  constructor(tasks) {
    this.tasks = tasks;
    this.completed = new Set();
  }
  getReadyTasks() {
    return this.tasks.filter(t =>
      t.state === TaskState.PENDING && t.canExecute(this.completed)
    );
  }
}`,
  },

  {
    id: 10,
    title: 'Design an E-Commerce Marketplace (Amazon)',
    difficulty: 'Hard',
    category: 'Complex System',
    tags: ['Strategy', 'Observer', 'Factory', 'Chain of Responsibility'],
    estimatedTime: '90 min',
    companies: ['Amazon', 'Flipkart', 'Walmart', 'Shopify'],
    description:
      'Design an end-to-end e-commerce marketplace with product catalog, multi-seller support, cart, order processing, inventory management, and review system.',
    requirements: [
      'Multi-seller marketplace — sellers list products with prices and inventory.',
      'Product catalog with categories, search, filtering, and sorting.',
      'Shopping cart with quantity management, price computation, and coupon application.',
      'Order pipeline: PLACED → PAYMENT_PENDING → CONFIRMED → SHIPPED → DELIVERED / RETURNED.',
      'Inventory management with stock reservation on order placement.',
      'Multiple shipping strategies (standard, express, same-day).',
      'Product review and rating system with verified-purchase badges.',
      'Notification system for order updates, price drops, and back-in-stock alerts.',
    ],
    designPatterns: ['Strategy (shipping & pricing)', 'Observer (notifications)', 'Factory (payment processors)', 'Chain of Responsibility (order validation)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│   Marketplace    │      │    Product       │
├──────────────────┤      ├──────────────────┤
│ - productCatalog │─────▶│ - id             │
│ - sellers: List  │      │ - seller         │
│ - orderService   │      │ - name           │
├──────────────────┤      │ - price          │
│ + search()       │      │ - stock          │
│ + placeOrder()   │      │ - category       │
│ + processReturn()│      │ - reviews: List  │
└──────────────────┘      └──────────────────┘

┌──────────────────┐      ┌──────────────────┐
│      Cart        │      │      Order       │
├──────────────────┤      ├──────────────────┤
│ - items: Map     │─────▶│ - id             │
│ - coupon         │      │ - buyer          │
├──────────────────┤      │ - items          │
│ + add()          │      │ - state          │
│ + remove()       │      │ - shippingMethod │
│ + getTotal()     │      │ - trackingId     │
│ + applyCoupon()  │      │ - totalAmount    │
│ + checkout()     │      ├──────────────────┤
└──────────────────┘      │ + confirm()      │
                          │ + ship()         │
┌──────────────────┐      │ + deliver()      │
│ShippingStrategy  │      │ + returnOrder()  │
├──────────────────┤      └──────────────────┘
│ + calculateETA() │
│ + getCost()      │
└────────┬─────────┘
  ┌──────┴──────┐
Standard   Express`,
    scaffold: `class Product {
  constructor(seller, name, price, stock, category) {
    this.id = generateId();
    this.seller = seller;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.reviews = [];
    this.rating = 0;
  }

  reserveStock(qty) {
    if (this.stock < qty) throw new Error('Insufficient stock');
    this.stock -= qty;
  }

  releaseStock(qty) { this.stock += qty; }

  addReview(user, rating, text) {
    this.reviews.push({ user, rating, text, ts: Date.now() });
    this.rating = this.reviews.reduce((s, r) => s + r.rating, 0) / this.reviews.length;
  }
}

class OrderPipeline {
  constructor() { this.validators = []; }
  addValidator(validator) { this.validators.push(validator); return this; }

  validate(order) {
    for (const v of this.validators) {
      const result = v.validate(order);
      if (!result.ok) throw new Error(result.reason);
    }
    return true;
  }
}`,
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PART B — 10 CLASSIC OOD / LLD PROBLEMS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  {
    id: 11,
    title: 'Design a Parking Lot',
    difficulty: 'Medium',
    category: 'Classic OOD',
    tags: ['Strategy', 'Factory', 'Singleton'],
    estimatedTime: '45 min',
    companies: ['Amazon', 'Google', 'Microsoft', 'Goldman Sachs'],
    description:
      'Design a multi-level parking lot system that supports different vehicle types, automated ticketing, flexible pricing, and live capacity tracking.',
    requirements: [
      'Parking lot has multiple levels, each with spots for Compact, Regular, and Large vehicles.',
      'Vehicles include Motorcycle, Car, Truck — each requires a different spot type.',
      'System auto-assigns the nearest available spot based on vehicle type.',
      'Entry generates a ticket; exit computes fee based on duration and vehicle type.',
      'Support hourly and flat-rate pricing strategies.',
      'Real-time tracking of available spots per level.',
      'Handle concurrent entry/exit without double-assigning spots.',
      'Support reserved/handicapped spots.',
    ],
    designPatterns: ['Strategy (pricing)', 'Factory (vehicle/spot creation)', 'Singleton (ParkingLot instance)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│    ParkingLot    │      │   ParkingLevel   │
├──────────────────┤      ├──────────────────┤
│ - levels: List   │─────▶│ - floor: int     │
│ - entryPanels    │      │ - spots: List    │
│ - exitPanels     │      ├──────────────────┤
├──────────────────┤      │ + findSpot()     │
│ + parkVehicle()  │      │ + getAvailable() │
│ + unparkVehicle()│      └──────────────────┘
│ + getCapacity()  │
└──────────────────┘      ┌──────────────────┐
                          │   ParkingSpot    │
┌──────────────────┐      ├──────────────────┤
│     Vehicle      │      │ - id             │
├──────────────────┤      │ - type: SpotType │
│ - licensePlate   │─────▶│ - vehicle        │
│ - type: VehType  │      │ - isOccupied     │
└──────────────────┘      └──────────────────┘`,
    scaffold: `class ParkingLot {
  constructor(levels) {
    this.levels = levels;
    this.tickets = new Map();
  }

  parkVehicle(vehicle) {
    for (const level of this.levels) {
      const spot = level.findAvailableSpot(vehicle.type);
      if (spot) {
        spot.park(vehicle);
        const ticket = new Ticket(vehicle, spot, Date.now());
        this.tickets.set(ticket.id, ticket);
        return ticket;
      }
    }
    throw new Error('Parking lot full for this vehicle type');
  }

  unparkVehicle(ticketId, pricingStrategy) {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) throw new Error('Invalid ticket');
    const duration = Date.now() - ticket.entryTime;
    const fee = pricingStrategy.calculate(duration, ticket.vehicle.type);
    ticket.spot.unpark();
    this.tickets.delete(ticketId);
    return fee;
  }
}`,
  },

  {
    id: 12,
    title: 'Design an Elevator System',
    difficulty: 'Hard',
    category: 'Classic OOD',
    tags: ['State', 'Strategy', 'Observer'],
    estimatedTime: '60 min',
    companies: ['Google', 'Microsoft', 'Uber', 'Oracle'],
    description:
      'Design a multi-elevator control system for a high-rise building with intelligent dispatching, state management, and emergency handling.',
    requirements: [
      'Building has N floors and M elevators.',
      'External request buttons (up/down) on each floor; internal buttons inside each elevator.',
      'Dispatcher assigns the optimal elevator using configurable algorithms (nearest, LOOK, SCAN).',
      'Elevator states: IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN, MAINTENANCE.',
      'Capacity limits and weight sensors.',
      'Emergency button overrides normal behavior — moves to nearest floor and opens doors.',
      'VIP/Express elevator that skips certain floors.',
      'Display panel shows current floor and direction for each elevator.',
    ],
    designPatterns: ['State (elevator states)', 'Strategy (dispatch algorithm)', 'Observer (floor display updates)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│ ElevatorSystem   │      │    Elevator      │
├──────────────────┤      ├──────────────────┤
│ - elevators: List│─────▶│ - id             │
│ - dispatcher     │      │ - currentFloor   │
│ - floors: int    │      │ - state: State   │
├──────────────────┤      │ - direction      │
│ + requestElev()  │      │ - destQueue      │
│ + emergency()    │      │ - capacity       │
└──────────────────┘      ├──────────────────┤
                          │ + moveUp()       │
┌──────────────────┐      │ + moveDown()     │
│ DispatchStrategy │      │ + openDoor()     │
├──────────────────┤      │ + addDest()      │
│ + selectElev()   │      └──────────────────┘
└────────┬─────────┘
  ┌──────┴──────┐
Nearest     LOOK`,
    scaffold: `class Elevator {
  constructor(id, capacity) {
    this.id = id;
    this.currentFloor = 0;
    this.state = ElevatorState.IDLE;
    this.direction = Direction.NONE;
    this.destinationQueue = new Set();
    this.capacity = capacity;
    this.currentLoad = 0;
  }

  addDestination(floor) {
    this.destinationQueue.add(floor);
    if (this.state === ElevatorState.IDLE) {
      this.direction = floor > this.currentFloor ? Direction.UP : Direction.DOWN;
      this.state = floor > this.currentFloor ? ElevatorState.MOVING_UP : ElevatorState.MOVING_DOWN;
    }
  }

  step() {
    if (this.destinationQueue.has(this.currentFloor)) {
      this.destinationQueue.delete(this.currentFloor);
      this.state = ElevatorState.DOOR_OPEN;
      return;
    }
    if (this.direction === Direction.UP) this.currentFloor++;
    else if (this.direction === Direction.DOWN) this.currentFloor--;
    if (this.destinationQueue.size === 0) {
      this.state = ElevatorState.IDLE;
      this.direction = Direction.NONE;
    }
  }
}`,
  },

  {
    id: 13,
    title: 'Design a Tic-Tac-Toe Game',
    difficulty: 'Easy',
    category: 'Classic OOD',
    tags: ['Strategy', 'Factory', 'Template Method'],
    estimatedTime: '30 min',
    companies: ['Amazon', 'Facebook', 'Adobe', 'Intuit'],
    description:
      'Design an extensible Tic-Tac-Toe game engine supporting 2-player mode, variable board size, win detection, and undo functionality.',
    requirements: [
      'N × N board (default 3×3) with configurable size.',
      'Two players alternate turns placing their mark (X or O).',
      'Win condition: N consecutive marks in a row, column, or diagonal.',
      'Draw detection when the board is full with no winner.',
      'Undo last move functionality.',
      'Support human vs. human and human vs. AI (simple strategy).',
      'Game states: IN_PROGRESS, WIN, DRAW.',
      'Move validation — cannot place on an occupied cell.',
    ],
    designPatterns: ['Strategy (AI move selection)', 'Factory (player creation)', 'Template Method (game loop)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│      Game        │      │     Board        │
├──────────────────┤      ├──────────────────┤
│ - board: Board   │─────▶│ - grid: char[][] │
│ - players: [2]   │      │ - size: int      │
│ - currentTurn    │      ├──────────────────┤
│ - state          │      │ + placeMark()    │
│ - moveHistory    │      │ + checkWin()     │
├──────────────────┤      │ + checkDraw()    │
│ + makeMove()     │      │ + undo()         │
│ + undo()         │      └──────────────────┘
│ + getState()     │
└──────────────────┘      ┌──────────────────┐
                          │     Player       │
                          ├──────────────────┤
                          │ - name           │
                          │ - mark: X / O    │
                          │ - strategy       │
                          └──────────────────┘`,
    scaffold: `class Board {
  constructor(size = 3) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
    this.moveCount = 0;
  }

  placeMark(row, col, mark) {
    if (this.grid[row][col] !== null) throw new Error('Cell occupied');
    this.grid[row][col] = mark;
    this.moveCount++;
  }

  undo(row, col) {
    this.grid[row][col] = null;
    this.moveCount--;
  }

  checkWin(mark) {
    const n = this.size;
    // Check rows, columns, diagonals
    for (let i = 0; i < n; i++) {
      if (this.grid[i].every(c => c === mark)) return true;
      if (this.grid.every(row => row[i] === mark)) return true;
    }
    if (this.grid.every((row, i) => row[i] === mark)) return true;
    if (this.grid.every((row, i) => row[n - 1 - i] === mark)) return true;
    return false;
  }

  isDraw() { return this.moveCount === this.size * this.size; }
}`,
  },

  {
    id: 14,
    title: 'Design a Library Management System',
    difficulty: 'Medium',
    category: 'Classic OOD',
    tags: ['Observer', 'Strategy', 'Singleton'],
    estimatedTime: '45 min',
    companies: ['Infosys', 'TCS', 'Wipro', 'Cognizant'],
    description:
      'Design a complete library management system supporting book cataloging, member management, borrowing/returning with fine calculation, and reservation queues.',
    requirements: [
      'Library holds books identified by ISBN with multiple copies.',
      'Members can borrow up to a configurable limit (e.g., 5 books).',
      'Borrow period is 14 days; overdue books incur daily fines.',
      'If a book is unavailable, a member can reserve it — notified when returned.',
      'Search books by title, author, ISBN, or category.',
      'Track borrow history for each member.',
      'Librarian can add/remove books and members.',
      'System sends reminders for upcoming due dates.',
    ],
    designPatterns: ['Observer (reservation notifications)', 'Strategy (fine calculation)', 'Singleton (library instance)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│     Library      │      │      Book        │
├──────────────────┤      ├──────────────────┤
│ - books: Map     │─────▶│ - isbn           │
│ - members: Map   │      │ - title          │
│ - borrowings     │      │ - author         │
├──────────────────┤      │ - copies: int    │
│ + searchBooks()  │      │ - available: int │
│ + borrowBook()   │      │ - reserveQueue   │
│ + returnBook()   │      └──────────────────┘
│ + reserveBook()  │
└──────────────────┘      ┌──────────────────┐
                          │     Member       │
┌──────────────────┐      ├──────────────────┤
│    Borrowing     │      │ - id             │
├──────────────────┤      │ - name           │
│ - member         │      │ - borrowedBooks  │
│ - book           │      │ - maxLimit       │
│ - borrowDate     │      └──────────────────┘
│ - dueDate        │
│ - returnDate     │
│ - fine           │
└──────────────────┘`,
    scaffold: `class Library {
  constructor() {
    this.books = new Map(); // isbn -> Book
    this.members = new Map();
    this.borrowings = [];
  }

  borrowBook(memberId, isbn) {
    const member = this.members.get(memberId);
    const book = this.books.get(isbn);
    if (!member) throw new Error('Member not found');
    if (!book || book.available <= 0) throw new Error('Book not available');
    if (member.borrowedBooks.length >= member.maxLimit)
      throw new Error('Borrow limit reached');

    book.available--;
    const borrowing = new Borrowing(member, book);
    member.borrowedBooks.push(borrowing);
    this.borrowings.push(borrowing);
    return borrowing;
  }

  returnBook(borrowingId, fineStrategy) {
    const borrowing = this.borrowings.find(b => b.id === borrowingId);
    if (!borrowing) throw new Error('Borrowing not found');
    borrowing.returnDate = Date.now();
    borrowing.fine = fineStrategy.calculate(borrowing);
    borrowing.book.available++;
    // Notify first person in reserve queue
    if (borrowing.book.reserveQueue.length > 0) {
      const nextMember = borrowing.book.reserveQueue.shift();
      nextMember.notify('Book available: ' + borrowing.book.title);
    }
    return borrowing.fine;
  }
}`,
  },

  {
    id: 15,
    title: 'Design a Snake and Ladder Game',
    difficulty: 'Easy',
    category: 'Classic OOD',
    tags: ['Strategy', 'Template Method', 'Observer'],
    estimatedTime: '30 min',
    companies: ['Amazon', 'Microsoft', 'Flipkart'],
    description:
      'Design a configurable Snake and Ladder board game engine supporting multiple players, custom board configurations, and game event broadcasting.',
    requirements: [
      'Board of configurable size (default 100 cells).',
      'Configurable snakes (head → tail, moves backward) and ladders (bottom → top, moves forward).',
      'Players take turns rolling a 6-sided die.',
      'If a player lands on a snake head, they slide down to its tail.',
      'If a player lands on a ladder bottom, they climb to its top.',
      'Player must land exactly on the last cell to win.',
      'Support for 2–4 players.',
      'Game log broadcasting all moves and events.',
    ],
    designPatterns: ['Strategy (dice implementation)', 'Template Method (game loop)', 'Observer (game events)'],
    uml: `
┌──────────────────┐
│   GameEngine     │
├──────────────────┤
│ - board: Board   │
│ - players: List  │
│ - currentTurn    │
│ - winner         │
├──────────────────┤
│ + play()         │
│ + rollDice()     │
│ + movePlayer()   │
└──────────┬───────┘
           │
           ▼
┌──────────────────┐      ┌──────────────────┐
│     Board        │      │    Player        │
├──────────────────┤      ├──────────────────┤
│ - size: int      │      │ - name           │
│ - snakes: Map    │      │ - position: int  │
│ - ladders: Map   │      └──────────────────┘
├──────────────────┤
│ + getDestination│
└──────────────────┘`,
    scaffold: `class Board {
  constructor(size = 100) {
    this.size = size;
    this.snakes = new Map(); // head -> tail
    this.ladders = new Map(); // bottom -> top
  }

  addSnake(head, tail) {
    if (head <= tail) throw new Error('Snake head must be above tail');
    this.snakes.set(head, tail);
  }

  addLadder(bottom, top) {
    if (bottom >= top) throw new Error('Ladder bottom must be below top');
    this.ladders.set(bottom, top);
  }

  getDestination(position) {
    if (this.snakes.has(position)) return this.snakes.get(position);
    if (this.ladders.has(position)) return this.ladders.get(position);
    return position;
  }
}

class GameEngine {
  constructor(board, players) {
    this.board = board;
    this.players = players;
    this.currentTurn = 0;
    this.winner = null;
    this.observers = [];
  }

  rollDice() { return Math.floor(Math.random() * 6) + 1; }

  movePlayer() {
    const player = this.players[this.currentTurn];
    const roll = this.rollDice();
    const newPos = player.position + roll;
    if (newPos > this.board.size) return; // must land exactly
    player.position = this.board.getDestination(newPos);
    if (player.position === this.board.size) this.winner = player;
    this.currentTurn = (this.currentTurn + 1) % this.players.length;
  }
}`,
  },

  {
    id: 16,
    title: 'Design a Vending Machine',
    difficulty: 'Medium',
    category: 'Classic OOD',
    tags: ['State', 'Strategy', 'Chain of Responsibility'],
    estimatedTime: '40 min',
    companies: ['Amazon', 'Oracle', 'Salesforce', 'VMware'],
    description:
      'Design a vending machine supporting product selection, multiple payment modes, change dispensation, and inventory management using the State pattern.',
    requirements: [
      'Machine holds products in slots with configurable inventory.',
      'States: IDLE → PRODUCT_SELECTED → PAYMENT_PENDING → DISPENSING → OUT_OF_STOCK.',
      'Support multiple payment methods: coins, notes, and digital payments.',
      'Change calculation and dispensation in optimal denominations.',
      'Refund support if user cancels after inserting money.',
      'Admin can restock products and collect cash.',
      'Display shows product name, price, and stock count.',
      'Handle insufficient payment and insufficient change scenarios.',
    ],
    designPatterns: ['State (machine states)', 'Strategy (payment processing)', 'Chain of Responsibility (change dispensation)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│  VendingMachine  │      │    Product       │
├──────────────────┤      ├──────────────────┤
│ - slots: Map     │─────▶│ - name           │
│ - state: State   │      │ - price          │
│ - cashRegister   │      │ - quantity       │
├──────────────────┤      └──────────────────┘
│ + selectProduct()│
│ + insertMoney()  │      ┌──────────────────┐
│ + dispense()     │      │  MachineState    │
│ + cancelAndRefund│      ├──────────────────┤
│ + restock()      │      │ + onSelect()     │
└──────────────────┘      │ + onPayment()    │
                          │ + onDispense()   │
                          └────────┬─────────┘
                           ┌──────┴──────┐
                        IdleState   PaymentState`,
    scaffold: `class VendingMachine {
  constructor() {
    this.slots = new Map(); // slotId -> Product
    this.state = new IdleState(this);
    this.selectedProduct = null;
    this.insertedAmount = 0;
    this.cashRegister = { coins: {}, notes: {} };
  }

  selectProduct(slotId) { this.state.onSelect(slotId); }
  insertMoney(amount) { this.state.onPayment(amount); }
  dispense() { this.state.onDispense(); }
  cancel() { this.state.onCancel(); }

  setState(state) { this.state = state; }
}

// State Pattern
class MachineState {
  constructor(machine) { this.machine = machine; }
  onSelect(slotId) { throw new Error('Invalid action'); }
  onPayment(amount) { throw new Error('Invalid action'); }
  onDispense() { throw new Error('Invalid action'); }
  onCancel() { throw new Error('Invalid action'); }
}

class IdleState extends MachineState {
  onSelect(slotId) {
    const product = this.machine.slots.get(slotId);
    if (!product || product.quantity <= 0) {
      this.machine.setState(new OutOfStockState(this.machine));
      return;
    }
    this.machine.selectedProduct = product;
    this.machine.setState(new PaymentState(this.machine));
  }
}`,
  },

  {
    id: 17,
    title: 'Design a Chess Game',
    difficulty: 'Hard',
    category: 'Classic OOD',
    tags: ['Strategy', 'Command', 'Observer', 'Factory'],
    estimatedTime: '75 min',
    companies: ['Google', 'Amazon', 'Microsoft', 'Adobe'],
    description:
      'Design a fully functional chess game engine with piece movement validation, check/checkmate detection, castling, en passant, and move history.',
    requirements: [
      '8×8 board with standard piece setup (King, Queen, Rook, Bishop, Knight, Pawn).',
      'Each piece type has unique movement rules enforced by the engine.',
      'Moves must validate: destination is reachable, path is clear (except Knight), not capturing own piece.',
      'Check detection — warn when king is under threat.',
      'Checkmate detection — game over when king has no escape.',
      'Special moves: castling, en passant capture, pawn promotion.',
      'Move history with undo/redo support.',
      'Support for game timers (blitz, rapid, classical).',
    ],
    designPatterns: ['Strategy (piece movement)', 'Command (move history/undo)', 'Observer (check notifications)', 'Factory (piece creation)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│    ChessGame     │      │     Board        │
├──────────────────┤      ├──────────────────┤
│ - board: Board   │─────▶│ - squares[8][8]  │
│ - players: [2]   │      │ - capturedPieces │
│ - currentTurn    │      ├──────────────────┤
│ - moveHistory    │      │ + movePiece()    │
│ - state          │      │ + isCheck()      │
├──────────────────┤      │ + isCheckmate()  │
│ + makeMove()     │      └──────────────────┘
│ + undo()         │
│ + resign()       │      ┌──────────────────┐
└──────────────────┘      │     Piece        │
                          ├──────────────────┤
                          │ - color          │
                          │ - position       │
                          │ - type           │
                          ├──────────────────┤
                          │ + getValidMoves()│
                          │ + canMoveTo()    │
                          └────────┬─────────┘
                    ┌──────┬──────┴──────┬───────┐
                  King   Queen   Rook   Knight  Pawn`,
    scaffold: `class Piece {
  constructor(color, position) {
    this.color = color;
    this.position = position;
    this.hasMoved = false;
  }
  getValidMoves(board) { throw new Error('implement in subclass'); }
  canMoveTo(target, board) {
    return this.getValidMoves(board).some(
      m => m.row === target.row && m.col === target.col
    );
  }
}

class King extends Piece {
  getValidMoves(board) {
    const moves = [];
    const { row, col } = this.position;
    const directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    for (const [dr, dc] of directions) {
      const r = row + dr, c = col + dc;
      if (r >= 0 && r < 8 && c >= 0 && c < 8) {
        const target = board.squares[r][c];
        if (!target || target.color !== this.color) {
          moves.push({ row: r, col: c });
        }
      }
    }
    // Castling logic here
    return moves;
  }
}

class Knight extends Piece {
  getValidMoves(board) {
    const moves = [];
    const { row, col } = this.position;
    const jumps = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
    for (const [dr, dc] of jumps) {
      const r = row + dr, c = col + dc;
      if (r >= 0 && r < 8 && c >= 0 && c < 8) {
        const target = board.squares[r][c];
        if (!target || target.color !== this.color) {
          moves.push({ row: r, col: c });
        }
      }
    }
    return moves;
  }
}`,
  },

  {
    id: 18,
    title: 'Design a Logging Framework (Log4j)',
    difficulty: 'Medium',
    category: 'Classic OOD',
    tags: ['Singleton', 'Chain of Responsibility', 'Observer', 'Strategy'],
    estimatedTime: '40 min',
    companies: ['Amazon', 'Netflix', 'Uber', 'LinkedIn'],
    description:
      'Design a flexible logging framework supporting multiple log levels, output sinks (console, file, remote), log formatting, and log level filtering.',
    requirements: [
      'Log levels: TRACE, DEBUG, INFO, WARN, ERROR, FATAL.',
      'Logger filters messages below the configured threshold level.',
      'Support multiple output sinks: Console, File, Remote (HTTP).',
      'Configurable log format: timestamp, level, class name, message.',
      'Hierarchical loggers — child logger inherits parent config.',
      'Log rotation for file sink (max size, max file count).',
      'Thread-safe logging with async flush capability.',
      'Support structured logging (key-value context).',
    ],
    designPatterns: ['Singleton (root logger)', 'Chain of Responsibility (log level filtering)', 'Observer (log sinks)', 'Strategy (formatting)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│     Logger       │      │    LogSink       │
├──────────────────┤      ├──────────────────┤
│ - name           │─────▶│ + write(entry)   │
│ - level: Level   │      └────────┬─────────┘
│ - sinks: List    │       ┌──────┴───────┐
│ - formatter      │   ConsoleSink   FileSink
│ - parent: Logger │
├──────────────────┤      ┌──────────────────┐
│ + trace()        │      │   LogFormatter   │
│ + debug()        │      ├──────────────────┤
│ + info()         │      │ + format(entry)  │
│ + warn()         │      └────────┬─────────┘
│ + error()        │       ┌──────┴──────┐
│ + fatal()        │    SimpleFormat  JSONFormat
└──────────────────┘`,
    scaffold: `class Logger {
  constructor(name, level = LogLevel.INFO, parent = null) {
    this.name = name;
    this.level = level;
    this.sinks = [];
    this.formatter = new SimpleFormatter();
    this.parent = parent;
  }

  addSink(sink) { this.sinks.push(sink); }
  setFormatter(formatter) { this.formatter = formatter; }

  log(level, message, context = {}) {
    if (level < this.level) return;
    const entry = {
      timestamp: new Date().toISOString(),
      level: LogLevel[level],
      logger: this.name,
      message,
      context,
    };
    const formatted = this.formatter.format(entry);
    this.sinks.forEach(sink => sink.write(formatted));
    if (this.parent) this.parent.log(level, message, context);
  }

  info(msg, ctx) { this.log(LogLevel.INFO, msg, ctx); }
  warn(msg, ctx) { this.log(LogLevel.WARN, msg, ctx); }
  error(msg, ctx) { this.log(LogLevel.ERROR, msg, ctx); }
}

class ConsoleSink {
  write(formatted) { console.log(formatted); }
}
class FileSink {
  constructor(filepath, maxSize) {
    this.filepath = filepath;
    this.maxSize = maxSize;
    this.currentSize = 0;
  }
  write(formatted) { /* append to file, rotate if needed */ }
}`,
  },

  {
    id: 19,
    title: 'Design a Cache System (LRU Cache)',
    difficulty: 'Medium',
    category: 'Classic OOD',
    tags: ['Strategy', 'Observer', 'Proxy', 'Decorator'],
    estimatedTime: '45 min',
    companies: ['Amazon', 'Google', 'Microsoft', 'Redis Labs'],
    description:
      'Design a flexible caching system supporting multiple eviction policies (LRU, LFU, TTL), cache-aside pattern, write-through, and cache statistics.',
    requirements: [
      'Cache stores key-value pairs with configurable maximum capacity.',
      'Support eviction policies: LRU (Least Recently Used), LFU (Least Frequently Used), TTL (Time-To-Live).',
      'O(1) get and put operations for LRU implementation.',
      'Cache-aside pattern: check cache → miss → load from source → populate cache.',
      'Write-through: writes go to both cache and backing store.',
      'Cache statistics: hit count, miss count, hit ratio, eviction count.',
      'Support for cache invalidation (single key, pattern, full flush).',
      'Thread-safe concurrent access.',
    ],
    designPatterns: ['Strategy (eviction policy)', 'Observer (cache events)', 'Proxy (cache-aside wrapper)', 'Decorator (statistics layer)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│     Cache        │      │ EvictionPolicy   │
├──────────────────┤      ├──────────────────┤
│ - store: Map     │─────▶│ + evict(): key   │
│ - capacity       │      │ + onAccess(key)  │
│ - policy         │      │ + onInsert(key)  │
│ - stats: Stats   │      └────────┬─────────┘
├──────────────────┤       ┌──────┴──────┐
│ + get(key)       │     LRU          LFU
│ + put(key, val)  │
│ + invalidate()   │      ┌──────────────────┐
│ + flush()        │      │   CacheStats     │
└──────────────────┘      ├──────────────────┤
                          │ - hits: int      │
                          │ - misses: int    │
                          │ - evictions: int │
                          │ + hitRatio()     │
                          └──────────────────┘`,
    scaffold: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.stats = { hits: 0, misses: 0, evictions: 0 };
  }

  get(key) {
    if (!this.cache.has(key)) {
      this.stats.misses++;
      return null;
    }
    this.stats.hits++;
    // Move to most recent (Map maintains insertion order)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict least recently used (first in map)
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey);
      this.stats.evictions++;
    }
    this.cache.set(key, value);
  }

  invalidate(key) { this.cache.delete(key); }
  flush() { this.cache.clear(); }
  getHitRatio() {
    const total = this.stats.hits + this.stats.misses;
    return total === 0 ? 0 : this.stats.hits / total;
  }
}`,
  },

  {
    id: 20,
    title: 'Design a Movie Ticket Booking System (BookMyShow)',
    difficulty: 'Medium',
    category: 'Classic OOD',
    tags: ['Strategy', 'Observer', 'State', 'Factory'],
    estimatedTime: '50 min',
    companies: ['BookMyShow', 'Paytm', 'Amazon', 'Fandango'],
    description:
      'Design a movie ticket booking platform supporting theater management, show scheduling, seat selection with locking, payment, and booking confirmation.',
    requirements: [
      'Theaters have multiple screens (halls), each with a seating arrangement.',
      'Shows are scheduled for movies at specific screens and times.',
      'Seat categories: Gold, Silver, Platinum — each with different pricing.',
      'Seat selection with temporary lock (5-minute hold) to prevent race conditions.',
      'Booking lifecycle: SEAT_SELECTED → PAYMENT_PENDING → CONFIRMED / EXPIRED.',
      'Support for multiple concurrent booking attempts on same show.',
      'Cancellation with refund policy based on time before show.',
      'Notification on booking confirmation and upcoming show reminders.',
    ],
    designPatterns: ['Strategy (pricing by seat type)', 'Observer (booking notifications)', 'State (seat locking lifecycle)', 'Factory (booking creation)'],
    uml: `
┌──────────────────┐      ┌──────────────────┐
│    Theater       │      │     Screen       │
├──────────────────┤      ├──────────────────┤
│ - id             │─────▶│ - id             │
│ - name           │      │ - seats: [][]    │
│ - screens: List  │      │ - capacity       │
│ - location       │      └──────────────────┘
└──────────────────┘
                          ┌──────────────────┐
┌──────────────────┐      │      Show        │
│     Movie        │      ├──────────────────┤
├──────────────────┤──────│ - movie          │
│ - title          │      │ - screen         │
│ - duration       │      │ - dateTime       │
│ - genre          │      │ - seatStatus: Map│
│ - rating         │      ├──────────────────┤
└──────────────────┘      │ + lockSeats()    │
                          │ + bookSeats()    │
┌──────────────────┐      │ + releaseSeats() │
│    Booking       │      └──────────────────┘
├──────────────────┤
│ - id             │      ┌──────────────────┐
│ - user           │      │ PricingStrategy  │
│ - show           │      ├──────────────────┤
│ - seats: List    │      │ + getPrice()     │
│ - state          │      └────────┬─────────┘
│ - totalAmount    │       ┌──────┴──────┐
│ - expiresAt      │     Gold       Platinum
├──────────────────┤
│ + confirm()      │
│ + cancel()       │
│ + isExpired()    │
└──────────────────┘`,
    scaffold: `class Show {
  constructor(movie, screen, dateTime) {
    this.id = generateId();
    this.movie = movie;
    this.screen = screen;
    this.dateTime = dateTime;
    // seat status: AVAILABLE | LOCKED | BOOKED
    this.seatStatus = new Map();
    screen.seats.flat().forEach(seat => {
      this.seatStatus.set(seat.id, 'AVAILABLE');
    });
  }

  lockSeats(seatIds, userId, ttlMs = 5 * 60 * 1000) {
    for (const id of seatIds) {
      if (this.seatStatus.get(id) !== 'AVAILABLE')
        throw new Error(\`Seat \${id} not available\`);
    }
    seatIds.forEach(id => this.seatStatus.set(id, 'LOCKED'));
    // Set timeout to auto-release
    setTimeout(() => {
      seatIds.forEach(id => {
        if (this.seatStatus.get(id) === 'LOCKED') {
          this.seatStatus.set(id, 'AVAILABLE');
        }
      });
    }, ttlMs);
    return true;
  }

  bookSeats(seatIds) {
    seatIds.forEach(id => this.seatStatus.set(id, 'BOOKED'));
  }

  releaseSeats(seatIds) {
    seatIds.forEach(id => this.seatStatus.set(id, 'AVAILABLE'));
  }
}

class Booking {
  constructor(user, show, seats, pricingStrategy) {
    this.id = generateId();
    this.user = user;
    this.show = show;
    this.seats = seats;
    this.state = 'PAYMENT_PENDING';
    this.totalAmount = seats.reduce((sum, s) => sum + pricingStrategy.getPrice(s.type), 0);
    this.expiresAt = Date.now() + 5 * 60 * 1000;
  }

  confirm() {
    if (Date.now() > this.expiresAt) {
      this.state = 'EXPIRED';
      this.show.releaseSeats(this.seats.map(s => s.id));
      throw new Error('Booking expired');
    }
    this.show.bookSeats(this.seats.map(s => s.id));
    this.state = 'CONFIRMED';
  }
}`,
  },
];

// ─── Category & tag aggregation helpers ────────────────────────────────────
export const lldCategories = [...new Set(lldProblems.map(p => p.category))];
export const lldDifficulties = ['Easy', 'Medium', 'Hard'];
export const allLldTags = [...new Set(lldProblems.flatMap(p => p.tags))].sort();
export const allLldCompanies = [...new Set(lldProblems.flatMap(p => p.companies))].sort();
