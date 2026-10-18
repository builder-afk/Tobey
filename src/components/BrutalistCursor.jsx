import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playTactileClick, isSoundEnabled, toggleSound } from '../utils/soundEffects';

export default function BrutalistCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [reticlePos, setReticlePos] = useState({ x: -100, y: -100 });
  const [isDown, setIsDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [hoverLabel, setHoverLabel] = useState('CLICK');
  const [ripples, setRipples] = useState([]);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [isFinePointer, setIsFinePointer] = useState(true);

  const requestRef = useRef();
  const mousePosRef = useRef({ x: -100, y: -100 });
  const reticlePosRef = useRef({ x: -100, y: -100 });

  // Detect interactive element under cursor
  const checkInteractive = useCallback((target) => {
    if (!target) return { interactive: false, label: 'CLICK' };

    // Check closest interactive tags or attributes
    const interactiveEl = target.closest(
      'button, a, input, textarea, select, [role="button"], [role="link"], [role="checkbox"], [role="switch"], [role="tab"], .cursor-pointer, summary'
    );

    if (!interactiveEl) {
      return { interactive: false, label: 'CLICK' };
    }

    const tagName = interactiveEl.tagName.toLowerCase();
    const type = interactiveEl.getAttribute('type')?.toLowerCase();

    if (tagName === 'input') {
      if (type === 'checkbox' || type === 'radio') {
        return { interactive: true, label: 'SELECT' };
      }
      if (type === 'submit' || type === 'button') {
        return { interactive: true, label: 'SUBMIT' };
      }
      return { interactive: true, label: 'TYPE' };
    }

    if (tagName === 'textarea') {
      return { interactive: true, label: 'TYPE' };
    }

    if (tagName === 'select') {
      return { interactive: true, label: 'SELECT' };
    }

    if (tagName === 'a') {
      const isExternal = interactiveEl.getAttribute('target') === '_blank';
      return { interactive: true, label: isExternal ? 'VISIT ↗' : 'NAVIGATE' };
    }

    const text = interactiveEl.innerText || interactiveEl.getAttribute('aria-label') || '';
    if (text.toLowerCase().includes('run') || text.toLowerCase().includes('solve') || text.toLowerCase().includes('submit')) {
      return { interactive: true, label: 'EXECUTE' };
    }

    return { interactive: true, label: 'CLICK' };
  }, []);

  // Smooth lerp loop for the trailing reticle
  const animateReticle = useCallback(() => {
    // Reticle follows cursor with snappy easing
    const factor = 0.35;
    const dx = mousePosRef.current.x - reticlePosRef.current.x;
    const dy = mousePosRef.current.y - reticlePosRef.current.y;

    reticlePosRef.current.x += dx * factor;
    reticlePosRef.current.y += dy * factor;

    setReticlePos({
      x: Math.round(reticlePosRef.current.x),
      y: Math.round(reticlePosRef.current.y),
    });

    requestRef.current = requestAnimationFrame(animateReticle);
  }, []);

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad, not touch)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    const handleMediaChange = (e) => {
      setIsFinePointer(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    if (!mediaQuery.matches) {
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }

    // Enable custom cursor class on html
    document.documentElement.classList.add('custom-cursor-active');

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      mousePosRef.current = { x, y };
      setPos({ x, y });
      setIsVisible(true);

      const { interactive, label } = checkInteractive(e.target);
      setIsInteractive(interactive);
      setHoverLabel(label);
    };

    const onMouseDown = (e) => {
      setIsDown(true);
      playTactileClick(false);

      // Spawn a brutalist click spark/ripple
      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        label: hoverLabel,
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 350);
    };

    const onMouseUp = () => {
      setIsDown(false);
      playTactileClick(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      document.documentElement.classList.remove('custom-cursor-active');
    };

    const onMouseEnter = () => {
      setIsVisible(true);
      document.documentElement.classList.add('custom-cursor-active');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    requestRef.current = requestAnimationFrame(animateReticle);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.documentElement.classList.remove('custom-cursor-active');
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [checkInteractive, animateReticle, hoverLabel]);

  const handleToggleSound = (e) => {
    e.stopPropagation();
    const newState = toggleSound();
    setSoundOn(newState);
  };

  if (!isFinePointer || !isVisible) {
    return null;
  }

  return (
    <>
      {/* ═══ 1. CLICK RIPPLES (Tactile Expanding Brutalist Squares) ═══ */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[999997] -translate-x-1/2 -translate-y-1/2"
          style={{ left: ripple.x, top: ripple.y }}
        >
          <div className="w-6 h-6 border-2 border-black bg-[#CCFF00]/40 shadow-[2px_2px_0px_#000] animate-brutalist-ripple" />
        </div>
      ))}

      {/* ═══ 2. TRAILING HUD RETICLE & TACTICAL CONTEXT BADGE ═══ */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[999998]"
        style={{
          transform: `translate3d(${reticlePos.x}px, ${reticlePos.y}px, 0)`,
          willChange: 'transform',
        }}
      >
        {/* Reticle Corner Brackets */}
        <div
          className={`relative transition-all duration-150 -translate-x-3 -translate-y-3 ${
            isDown ? 'scale-75' : isInteractive ? 'scale-125' : 'scale-100'
          }`}
        >
          <div className="w-6 h-6 relative">
            <span
              className={`absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 ${
                isInteractive ? 'border-[#00F0FF]' : 'border-black'
              }`}
            />
            <span
              className={`absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 ${
                isInteractive ? 'border-[#00F0FF]' : 'border-black'
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 ${
                isInteractive ? 'border-[#00F0FF]' : 'border-black'
              }`}
            />
            <span
              className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 ${
                isInteractive ? 'border-[#00F0FF]' : 'border-black'
              }`}
            />
          </div>
        </div>

        {/* Dynamic Context HUD Tag */}
        {isInteractive && (
          <div className="absolute left-6 top-3 bg-black text-[#CCFF00] border-2 border-black shadow-[2px_2px_0px_#000] px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-wider whitespace-nowrap animate-fadeIn select-none">
            [ {hoverLabel} ]
          </div>
        )}
      </div>

      {/* ═══ 3. PRIMARY BRUTALIST POINTER ARROW ═══ */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[999999]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) ${
            isDown ? 'translate(2px, 2px) scale(0.88)' : 'scale(1)'
          }`,
          willChange: 'transform',
          transition: isDown ? 'transform 0.05s ease' : 'none',
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          className="overflow-visible pointer-events-none"
        >
          {/* Hard Offset Drop Shadow for Neo-Brutalist look */}
          <polygon
            points="0,0 0,21 5.5,16 11,24 14.5,21.5 9,14 17,14"
            fill="#000000"
            transform="translate(2, 2)"
          />
          {/* Main Pointer Shape */}
          <polygon
            points="0,0 0,21 5.5,16 11,24 14.5,21.5 9,14 17,14"
            fill={isDown ? '#FF52D9' : isInteractive ? '#00F0FF' : '#CCFF00'}
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
          {/* Subtle inner geometric cross / accent dot */}
          <circle cx="5" cy="5" r="1.2" fill="#000000" />
        </svg>
      </div>

      {/* ═══ 4. AUDIO SFX CONTROL PILL (Bottom Right Corner) ═══ */}
      <button
        onClick={handleToggleSound}
        title="Toggle Brutalist Mechanical Click Sound"
        className="fixed bottom-3 right-3 z-[999990] bg-white hover:bg-[#FFDE59] border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 px-3 py-1 text-[10px] font-mono font-black uppercase flex items-center gap-2 cursor-pointer select-none transition-colors"
      >
        <span
          className={`w-2.5 h-2.5 border border-black ${
            soundOn ? 'bg-[#CCFF00] animate-pulse' : 'bg-[#FF0033]'
          }`}
        />
        <span>{soundOn ? '[ SFX: ON ]' : '[ SFX: MUTED ]'}</span>
      </button>
    </>
  );
}
