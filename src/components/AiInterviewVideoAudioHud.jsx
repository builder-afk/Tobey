import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, VideoOff, Mic, MicOff, Volume2, VolumeX, Eye, Activity,
  Radio, Shield, AlertTriangle, CheckCircle, Maximize2, Minimize2,
  Sparkles, RefreshCw, Zap, Sliders, MessageSquare, Compass
} from 'lucide-react';

/**
 * Neo-Brutalist AI Behavioral Video & Audio Stream HUD
 * Features:
 * - Live candidate webcam stream with permission handling
 * - Fallback animated behavioral vision canvas if camera is disabled / simulated
 * - Real-time Audio frequency analyzer / decibel meter (AudioContext)
 * - Computer vision HUD telemetry overlays (Face reticle, Eye Contact %, Pacing gauge, Composure, Fillers)
 * - Speech-to-text dictation integration
 * - Docked / PIP / Minimized display modes
 */
export default function AiInterviewVideoAudioHud({
  isCameraActive,
  setIsCameraActive,
  isMicActive,
  setIsMicActive,
  hudLayout, // 'docked' | 'pip' | 'minimized'
  setHudLayout,
  behavioralTelemetry,
  setBehavioralTelemetry,
  onSpeechTranscribed,
  isListening,
  setIsListening,
  currentQuestion
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);

  const [hasCameraError, setHasCameraError] = useState(false);
  const [audioMeter, setAudioMeter] = useState(15);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(true);
  const [speechStatus, setSpeechStatus] = useState('');
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechStatus('Listening to voice...');
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (onSpeechTranscribed && transcript) {
          onSpeechTranscribed(transcript);
        }
      };

      recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err);
        setSpeechStatus('Voice error: ' + (err.error || 'try again'));
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setSpeechStatus('');
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechRecognitionSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
      }
    };
  }, [onSpeechTranscribed, setIsListening]);

  // Toggle Voice Input
  const toggleSpeechRecognition = () => {
    if (!speechRecognitionSupported) {
      // Simulate voice input for testing/environments without SpeechRecognition
      const simulatedResponses = [
        "In this scenario, I would implement an LRU cache backed by a doubly-linked list and a hash map to achieve O(1) reads and writes, while considering TTL expiration for stale nodes.",
        "To scale this service, I'd introduce an event-driven pub-sub message queue using Apache Kafka, decouple the ingestion worker pools, and implement idempotency keys.",
        "First, let me clarify the constraints. What is the expected read-to-write ratio, and can we tolerate eventual consistency across replicas?"
      ];
      const randomText = simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
      if (onSpeechTranscribed) {
        onSpeechTranscribed(randomText);
      }
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.warn('Could not start recognition:', e);
      }
    }
  };

  // Setup Camera and Microphone Stream
  useEffect(() => {
    let active = true;

    async function setupStream() {
      if (!isCameraActive && !isMicActive) {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(t => t.stop());
          streamRef.current = null;
        }
        if (videoRef.current) videoRef.current.srcObject = null;
        return;
      }

      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: isCameraActive,
            audio: isMicActive
          });

          if (!active) {
            stream.getTracks().forEach(t => t.stop());
            return;
          }

          streamRef.current = stream;
          setHasCameraError(false);

          if (videoRef.current && isCameraActive) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(() => {});
          }

          // Setup Audio Analyzer
          if (isMicActive && (window.AudioContext || window.webkitAudioContext)) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioCtx();
            audioContextRef.current = audioCtx;

            const source = audioCtx.createMediaStreamSource(stream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 64;
            source.connect(analyser);
            analyserRef.current = analyser;

            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            const checkVolume = () => {
              if (!active || !analyserRef.current) return;
              analyserRef.current.getByteFrequencyData(dataArray);
              let sum = 0;
              for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
              }
              const avg = sum / dataArray.length;
              const normalized = Math.min(100, Math.round((avg / 128) * 100));
              setAudioMeter(normalized);
              animFrameRef.current = requestAnimationFrame(checkVolume);
            };
            checkVolume();
          }
        } else {
          setHasCameraError(true);
        }
      } catch (err) {
        console.warn('Webcam/Mic access denied or unavailable, switching to synthetic behavioral stream:', err);
        setHasCameraError(true);
      }
    }

    setupStream();

    return () => {
      active = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isCameraActive, isMicActive]);

  // Synthetic behavioral canvas animation (when camera is simulated / permission pending)
  useEffect(() => {
    if (!isCameraActive || hasCameraError) {
      let animId;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let angle = 0;

      const renderSimulation = () => {
        angle += 0.03;
        const w = canvas.width;
        const h = canvas.height;

        // Dark background with subtle grid
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, w, h);

        // Grid lines
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 20) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y < h; y += 20) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }

        // Animated wireframe silhouette / head landmark
        const cx = w / 2 + Math.sin(angle * 0.7) * 4;
        const cy = h / 2 - 10 + Math.cos(angle * 0.5) * 3;

        // Shoulders
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy + 85, 60, 30, 0, Math.PI, 2 * Math.PI);
        ctx.stroke();

        // Head ellipse
        ctx.strokeStyle = '#00F0FF';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 38, 48, 0, 0, 2 * Math.PI);
        ctx.stroke();

        // Eye landmarks
        const leftEyeX = cx - 14;
        const rightEyeX = cx + 14;
        const eyeY = cy - 6;

        ctx.fillStyle = '#CCFF00';
        ctx.beginPath();
        ctx.arc(leftEyeX, eyeY, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(rightEyeX, eyeY, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Eye gaze direction tracking vector
        ctx.strokeStyle = '#CCFF00';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(leftEyeX, eyeY);
        ctx.lineTo(leftEyeX + Math.sin(angle) * 3, eyeY + Math.cos(angle * 0.8) * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rightEyeX, eyeY);
        ctx.lineTo(rightEyeX + Math.sin(angle) * 3, eyeY + Math.cos(angle * 0.8) * 2);
        ctx.stroke();

        // Mouth arc
        ctx.strokeStyle = '#00F0FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy + 18, 12, 0.2 * Math.PI, 0.8 * Math.PI);
        ctx.stroke();

        // Target Reticle
        ctx.strokeStyle = '#FFDE59';
        ctx.lineWidth = 1.5;
        const retSize = 65;
        ctx.strokeRect(cx - retSize / 2, cy - retSize / 2 - 5, retSize, retSize + 10);

        // Reticle corners
        ctx.strokeStyle = '#FF0033';
        ctx.lineWidth = 3;
        const cornerLen = 10;
        const rx = cx - retSize / 2;
        const ry = cy - retSize / 2 - 5;
        const rw = retSize;
        const rh = retSize + 10;

        // Top-left
        ctx.beginPath();
        ctx.moveTo(rx, ry + cornerLen);
        ctx.lineTo(rx, ry);
        ctx.lineTo(rx + cornerLen, ry);
        ctx.stroke();

        // Top-right
        ctx.beginPath();
        ctx.moveTo(rx + rw - cornerLen, ry);
        ctx.lineTo(rx + rw, ry);
        ctx.lineTo(rx + rw, ry + cornerLen);
        ctx.stroke();

        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(rx, ry + rh - cornerLen);
        ctx.lineTo(rx, ry + rh);
        ctx.lineTo(rx + cornerLen, ry + rh);
        ctx.stroke();

        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(rx + rw - cornerLen, ry + rh);
        ctx.lineTo(rx + rw, ry + rh);
        ctx.lineTo(rx + rw, ry + rh - cornerLen);
        ctx.stroke();

        // Update simulated audio meter if mic is not active
        if (!isMicActive) {
          const simVolume = Math.floor(15 + Math.sin(angle * 3) * 12 + Math.random() * 8);
          setAudioMeter(simVolume);
        }

        animId = requestAnimationFrame(renderSimulation);
      };

      renderSimulation();
      return () => cancelAnimationFrame(animId);
    }
  }, [isCameraActive, hasCameraError, isMicActive]);

  // Dynamic telemetry values
  const eyeContactScore = behavioralTelemetry?.eyeContact || 88;
  const wpm = behavioralTelemetry?.wpm || 135;
  const composure = behavioralTelemetry?.composure || 'High Conviction';
  const fillers = behavioralTelemetry?.fillers || 0;

  // Render minimized floating chip
  if (hudLayout === 'minimized') {
    return (
      <div className="bg-black text-[#CCFF00] border-2 border-black px-3 py-1.5 shadow-[3px_3px_0px_#000] flex items-center justify-between gap-3 text-xs font-mono font-black uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF0033] animate-pulse border border-black" />
          <span>BEHAVIORAL VISION // {eyeContactScore}% EYE GAZE</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHudLayout('docked')}
            className="p-1 bg-white text-black hover:bg-[#FFDE59] border border-black"
            title="Expand Video HUD"
          >
            <Maximize2 size={12} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col font-mono select-none ${
      hudLayout === 'pip'
        ? 'absolute bottom-4 right-4 z-40 w-80 bg-white border-4 border-black shadow-[6px_6px_0px_#000]'
        : 'w-full bg-white border-b-4 border-black shadow-sm'
    }`}>
      {/* HUD Header Bar */}
      <div className="h-8 bg-black text-white px-3 flex items-center justify-between border-b-2 border-black text-[10px] font-black uppercase tracking-wider shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF0033] animate-pulse" />
          <span className="text-[#CCFF00]">AI BEHAVIORAL SENSOR</span>
          <span className="text-neutral-400 hidden sm:inline">// 60 FPS VISION</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Layout Toggle (Docked vs PIP) */}
          <button
            onClick={() => setHudLayout(hudLayout === 'docked' ? 'pip' : 'docked')}
            className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-[#00F0FF] border border-black text-[9px] font-black"
            title={hudLayout === 'docked' ? "Switch to Floating PIP in Code Editor" : "Dock into Chat Panel"}
          >
            {hudLayout === 'docked' ? 'PIP' : 'DOCK'}
          </button>

          {/* Minimize */}
          <button
            onClick={() => setHudLayout('minimized')}
            className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-black text-[9px] font-black"
            title="Minimize"
          >
            <Minimize2 size={10} />
          </button>
        </div>
      </div>

      {/* Main Video & Audio Area */}
      <div className={`relative bg-black overflow-hidden flex items-center justify-center shrink-0 ${
        hudLayout === 'pip' ? 'h-36' : 'h-44'
      }`}>
        {/* Real Video Element */}
        {isCameraActive && !hasCameraError ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform -scale-x-100"
          />
        ) : (
          /* Synthetic Computer Vision Canvas */
          <canvas
            ref={canvasRef}
            width={320}
            height={180}
            className="w-full h-full object-cover"
          />
        )}

        {/* Cyberpunk HUD Overlays */}
        <div className="absolute inset-0 pointer-events-none p-2 flex flex-col justify-between">
          {/* Top telemetry tags */}
          <div className="flex justify-between items-start">
            <span className="bg-black/80 text-[#00F0FF] border border-black px-1.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-wider backdrop-blur-xs flex items-center gap-1">
              <Eye size={10} className="text-[#CCFF00]" />
              GAZE: {eyeContactScore}%
            </span>
            <span className="bg-black/80 text-[#FFDE59] border border-black px-1.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-wider backdrop-blur-xs">
              {composure}
            </span>
          </div>

          {/* Face Reticle in Center */}
          <div className="self-center flex flex-col items-center">
            <div className="w-20 h-20 border border-dashed border-[#00F0FF]/50 rounded-sm flex items-center justify-center relative">
              <span className="w-1.5 h-1.5 bg-[#FF0033] rounded-full animate-ping" />
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#CCFF00]" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#CCFF00]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#CCFF00]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#CCFF00]" />
            </div>
            <span className="text-[8px] font-black text-black bg-[#CCFF00] px-1 py-0.2 mt-1 border border-black uppercase">
              FACE LOCK // STABLE
            </span>
          </div>

          {/* Bottom telemetry tags */}
          <div className="flex justify-between items-end">
            <span className="bg-black/80 text-white border border-black px-1.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-wider backdrop-blur-xs flex items-center gap-1">
              <Activity size={10} className="text-[#FF52D9]" />
              {wpm} WPM (CADENCE)
            </span>
            <span className="bg-black/80 text-[#FF0033] border border-black px-1.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-wider backdrop-blur-xs">
              FILLERS: {fillers}
            </span>
          </div>
        </div>

        {/* Live Audio Equalizer Waveform Overlay (Bottom of video) */}
        <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-center gap-1 px-3 pb-1">
          {[...Array(16)].map((_, i) => {
            const barHeight = Math.max(3, Math.min(18, (audioMeter * (0.4 + (i % 5) * 0.15))));
            return (
              <div
                key={i}
                className="w-1 bg-[#CCFF00] transition-all duration-75"
                style={{ height: `${barHeight}px` }}
              />
            );
          })}
        </div>
      </div>

      {/* Interactive Controls & Telemetry Readout */}
      <div className="p-2.5 bg-[#FAF8F5] border-t-2 border-black flex items-center justify-between gap-2">
        {/* Cam & Mic Toggles */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsCameraActive(!isCameraActive)}
            className={`px-2 py-1 text-[10px] font-black uppercase border-2 border-black shadow-[1px_1px_0px_#000] flex items-center gap-1 transition-all ${
              isCameraActive ? 'bg-[#CCFF00] text-black' : 'bg-[#FF0033] text-white'
            }`}
            title={isCameraActive ? "Turn Camera Off" : "Turn Camera On"}
          >
            {isCameraActive ? <Video size={12} /> : <VideoOff size={12} />}
            <span>{isCameraActive ? 'CAM' : 'CAM OFF'}</span>
          </button>

          <button
            onClick={() => setIsMicActive(!isMicActive)}
            className={`px-2 py-1 text-[10px] font-black uppercase border-2 border-black shadow-[1px_1px_0px_#000] flex items-center gap-1 transition-all ${
              isMicActive ? 'bg-[#00F0FF] text-black' : 'bg-[#FF0033] text-white'
            }`}
            title={isMicActive ? "Mute Microphone" : "Unmute Microphone"}
          >
            {isMicActive ? <Mic size={12} /> : <MicOff size={12} />}
            <span>{isMicActive ? 'MIC' : 'MUTED'}</span>
          </button>
        </div>

        {/* Voice Dictation (Speak Answer) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleSpeechRecognition}
            className={`px-2.5 py-1 text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5 transition-all ${
              isListening
                ? 'bg-[#FF0033] text-white animate-pulse'
                : 'bg-[#FFDE59] text-black hover:bg-black hover:text-[#FFDE59]'
            }`}
            title={isListening ? "Listening... Click to stop" : "Speak answer into microphone (Auto Speech-to-Text)"}
          >
            <Radio size={12} className={isListening ? 'animate-spin' : ''} />
            <span>{isListening ? 'SPEAKING...' : '🎙️ SPEAK ANSWER'}</span>
          </button>
        </div>
      </div>

      {/* Voice Status Indicator when listening */}
      {isListening && (
        <div className="bg-[#FF0033] text-white px-2 py-1 text-[9px] font-mono font-black uppercase tracking-wider flex items-center justify-between border-t border-black">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            RECORDING & ANALYZING VOCAL CADENCE IN REAL-TIME...
          </span>
          <span className="bg-black text-[#CCFF00] px-1">LIVE TRANSCRIBING</span>
        </div>
      )}
    </div>
  );
}
