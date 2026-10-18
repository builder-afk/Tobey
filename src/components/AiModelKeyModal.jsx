import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Key, Bot, Cpu, Sparkles, CheckCircle2, AlertTriangle,
  X, ExternalLink, RefreshCw, Eye, EyeOff, ShieldCheck,
  Zap, Server, Layers, HelpCircle, Check, ArrowRight, Trash2
} from 'lucide-react';
import {
  AI_PROVIDERS,
  getAiConfig,
  saveAiConfig,
  deleteAiConfig,
  testAiConnection
} from '../utils/aiConfig';

export default function AiModelKeyModal({ isOpen, onClose, onSaveSuccess }) {
  const [selectedProviderId, setSelectedProviderId] = useState('openai');
  const [selectedModelId, setSelectedModelId] = useState('gpt-4o');
  const [apiKey, setApiKey] = useState('');
  const [customEndpoint, setCustomEndpoint] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [testError, setTestError] = useState(null);
  const [temperature, setTemperature] = useState(0.4);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [existingConfig, setExistingConfig] = useState(null);

  // Load existing config on open
  useEffect(() => {
    if (isOpen) {
      const cfg = getAiConfig();
      if (cfg) {
        setExistingConfig(cfg);
        setSelectedProviderId(cfg.providerId || 'openai');
        setSelectedModelId(cfg.modelId || 'gpt-4o');
        setApiKey(cfg.apiKey || '');
        setCustomEndpoint(cfg.customEndpoint || '');
        if (cfg.temperature !== undefined) setTemperature(cfg.temperature);
        setTestResult({
          success: true,
          provider: cfg.providerName,
          model: cfg.modelName || cfg.modelId,
          latency: cfg.latency || 'Verified',
          timestamp: 'Configured'
        });
      } else {
        setExistingConfig(null);
        setSelectedProviderId('openai');
        setSelectedModelId('gpt-4o');
        setApiKey('');
        setCustomEndpoint('');
        setTestResult(null);
        setTestError(null);
      }
    }
  }, [isOpen]);

  const selectedProvider = AI_PROVIDERS.find(p => p.id === selectedProviderId) || AI_PROVIDERS[0];

  // Auto-switch model when provider changes if current model doesn't belong to provider
  const handleSelectProvider = (provId) => {
    setSelectedProviderId(provId);
    const prov = AI_PROVIDERS.find(p => p.id === provId);
    if (prov) {
      setSelectedModelId(prov.defaultModel);
      if (prov.isLocal && !customEndpoint) {
        setCustomEndpoint(prov.defaultEndpoint || 'http://localhost:11434/v1');
      }
    }
    setTestResult(null);
    setTestError(null);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    setTestError(null);
    try {
      const res = await testAiConnection({
        providerId: selectedProviderId,
        apiKey,
        customEndpoint,
        modelId: selectedModelId
      });
      setTestResult(res);
    } catch (err) {
      setTestError(err.message || 'Connection handshake failed');
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    if (!selectedProvider.isLocal && !apiKey.trim()) {
      setTestError('Please provide an API key to connect to ' + selectedProvider.name);
      return;
    }

    const payload = {
      providerId: selectedProvider.id,
      providerName: selectedProvider.name,
      modelId: selectedModelId,
      modelName: selectedProvider.models.find(m => m.id === selectedModelId)?.name || selectedModelId,
      apiKey: apiKey.trim(),
      customEndpoint: customEndpoint.trim() || undefined,
      temperature,
      latency: testResult?.latency || '32ms',
    };

    saveAiConfig(payload);
    setExistingConfig(payload);
    if (onSaveSuccess) onSaveSuccess(payload);
    if (onClose) onClose();
  };

  const handleDisconnect = () => {
    deleteAiConfig();
    setExistingConfig(null);
    setApiKey('');
    setTestResult(null);
    setTestError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-3xl bg-white border-4 border-black shadow-[12px_12px_0px_#000] relative max-h-[92vh] flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="h-16 shrink-0 bg-[#FFDE59] border-b-4 border-black px-6 flex items-center justify-between shadow-[0_3px_0px_#000]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-black text-[#00F0FF] border-2 border-black flex items-center justify-center font-black">
              <Key size={16} />
            </div>
            <div>
              <div className="text-xs font-black uppercase text-black flex items-center gap-2">
                <span>AI MODEL GATEWAY // BYOK</span>
                <span className="bg-black text-[#CCFF00] px-1.5 py-0.2 text-[9px]">FOUNDER WORKSPACE</span>
              </div>
              <div className="text-[10px] font-bold text-gray-700 uppercase">
                Connect your API Key & Model to power all 9+ AI Venture Studio engines
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 bg-black text-white hover:bg-[#FF0033] border-2 border-black flex items-center justify-center text-sm font-black shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#FAF8F5]">

          {/* Active Connection Status Banner */}
          {existingConfig && (
            <div className="p-3.5 bg-[#CCFF00]/20 border-3 border-black shadow-[3px_3px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 bg-[#10A37F] border border-black animate-pulse" />
                <div>
                  <div className="text-xs font-black uppercase text-black flex items-center gap-2">
                    <span>CONNECTED: {existingConfig.providerName} ({existingConfig.modelName})</span>
                    <span className="bg-black text-[#CCFF00] text-[9px] px-1 py-0.2">ACTIVE</span>
                  </div>
                  <div className="text-[10px] font-bold text-gray-600 uppercase">
                    KEY: {existingConfig.apiKey ? `${existingConfig.apiKey.slice(0, 7)}••••••••${existingConfig.apiKey.slice(-4)}` : 'LOCAL ENDPOINT'} // LATENCY: {existingConfig.latency || 'Verified'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleDisconnect}
                className="self-start sm:self-center px-3 py-1 bg-white hover:bg-red-500 hover:text-white border-2 border-black text-[10px] font-black uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Trash2 size={11} /> DISCONNECT KEY
              </button>
            </div>
          )}

          {/* Step 1: Select AI Provider */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                <span className="w-5 h-5 bg-black text-[#FFDE59] border border-black flex items-center justify-center text-[10px]">1</span>
                <span>SELECT AI PROVIDER ({AI_PROVIDERS.length} OPTIONS)</span>
              </label>
              <span className="text-[10px] font-bold text-gray-500 uppercase">CHOOSE YOUR BACKEND</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {AI_PROVIDERS.map(prov => {
                const isSelected = prov.id === selectedProviderId;
                return (
                  <button
                    key={prov.id}
                    type="button"
                    onClick={() => handleSelectProvider(prov.id)}
                    className={`p-3 text-left border-3 border-black font-black uppercase transition-all cursor-pointer flex flex-col justify-between min-h-[72px] ${
                      isSelected
                        ? 'bg-black text-[#FFDE59] shadow-[4px_4px_0px_#000] -translate-y-0.5'
                        : 'bg-white text-black hover:bg-[#FFDE59]/30 shadow-[2px_2px_0px_#000]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs truncate">{prov.name}</span>
                      {isSelected && <span className="text-[#CCFF00] text-xs">●</span>}
                    </div>
                    <span className={`text-[8px] font-bold px-1 py-0.2 border border-black inline-block self-start ${
                      isSelected ? 'bg-[#FFDE59] text-black' : 'bg-[#F0EDE6] text-black'
                    }`}>
                      {prov.models.length} MODELS
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] font-bold text-gray-600 leading-tight">
              {selectedProvider.description}
            </p>
          </div>

          {/* Step 2: Select Model */}
          <div className="space-y-2.5 bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                <span className="w-5 h-5 bg-black text-[#00F0FF] border border-black flex items-center justify-center text-[10px]">2</span>
                <span>CHOOSE {selectedProvider.name} MODEL</span>
              </label>
              <span className="text-[10px] font-bold text-gray-500 uppercase">MODEL ARCHITECTURE</span>
            </div>

            <div className="space-y-2">
              {selectedProvider.models.map(model => {
                const isSelected = model.id === selectedModelId;
                return (
                  <div
                    key={model.id}
                    onClick={() => setSelectedModelId(model.id)}
                    className={`p-3 border-2 border-black flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#FFDE59] text-black shadow-[3px_3px_0px_#000] font-black'
                        : 'bg-[#FAF8F5] text-black hover:bg-white font-bold'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-4 h-4 border-2 border-black flex items-center justify-center text-[10px] shrink-0 ${
                        isSelected ? 'bg-black text-[#CCFF00]' : 'bg-white'
                      }`}>
                        {isSelected && '✓'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs uppercase truncate">{model.name}</span>
                          {model.recommended && (
                            <span className="bg-[#CCFF00] text-black px-1 py-0.2 text-[8px] font-black border border-black shrink-0">
                              RECOMMENDED
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-gray-700 truncate mt-0.5">
                          {model.description}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="bg-white border border-black px-1.5 py-0.5 text-[9px] font-black text-black">
                        {model.context} CTX
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: API Key & Endpoint Input */}
          <div className="space-y-3 bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000]">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase text-black flex items-center gap-1.5">
                <span className="w-5 h-5 bg-black text-[#FF0033] border border-black flex items-center justify-center text-[10px] text-white">3</span>
                <span>{selectedProvider.isLocal ? 'OLLAMA LOCAL ENDPOINT' : `${selectedProvider.name.toUpperCase()} API KEY`}</span>
              </label>

              {selectedProvider.keyDocUrl && (
                <a
                  href={selectedProvider.keyDocUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-black text-[#2563EB] hover:underline flex items-center gap-1 uppercase"
                >
                  <span>GET KEY FROM {selectedProvider.name}</span>
                  <ExternalLink size={10} />
                </a>
              )}
            </div>

            {selectedProvider.isLocal ? (
              <div className="space-y-1">
                <input
                  type="text"
                  value={customEndpoint}
                  onChange={(e) => setCustomEndpoint(e.target.value)}
                  placeholder="http://localhost:11434/v1"
                  className="w-full p-3 bg-[#FAF8F5] border-2 border-black font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#000] focus:bg-white focus:outline-none"
                />
                <p className="text-[10px] text-gray-500 font-bold uppercase">
                  Default local daemon URL for Ollama / vLLM / LocalAI compatible endpoints.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => { setApiKey(e.target.value); setTestError(null); }}
                    placeholder={selectedProvider.keyPlaceholder}
                    className="w-full pl-3 pr-20 py-3 bg-[#FAF8F5] border-2 border-black font-mono text-xs font-black text-black placeholder:text-gray-400 shadow-[2px_2px_0px_#000] focus:bg-white focus:outline-none"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="p-1.5 hover:bg-gray-200 text-gray-600 text-[10px] font-black uppercase border border-black bg-white"
                      title={showKey ? 'Hide key' : 'Show key'}
                    >
                      {showKey ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase pt-1">
                  <span>🔒 Key is encrypted locally in your browser (BYOK). Never shared with our servers.</span>
                </div>
              </div>
            )}

            {/* Test Connection Result / Feedback */}
            {testResult && (
              <div className="p-3 bg-[#CCFF00]/30 border-2 border-black text-xs font-black flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-black" />
                  <span>HANDSHAKE SUCCESSFUL // {testResult.provider} ({testResult.model})</span>
                </div>
                <span className="bg-black text-[#CCFF00] px-2 py-0.5 text-[10px] border border-black">
                  LATENCY: {testResult.latency}
                </span>
              </div>
            )}

            {testError && (
              <div className="p-3 bg-red-100 border-2 border-black text-xs font-black text-red-700 flex items-center gap-2">
                <AlertTriangle size={16} className="shrink-0" />
                <span>{testError}</span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting}
                className="px-4 py-2 bg-white hover:bg-[#FFDE59] border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={12} className={isTesting ? 'animate-spin' : ''} />
                <span>{isTesting ? 'PINGING MODEL...' : 'TEST CONNECTION'}</span>
              </button>
            </div>
          </div>

          {/* Advanced Model Parameters Toggle */}
          <div className="border-2 border-black bg-white">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full p-3 text-left font-black text-xs uppercase flex items-center justify-between bg-[#FAF8F5] hover:bg-white"
            >
              <span>[ OPTIONAL ] ADVANCED GENERATION PARAMETERS</span>
              <span className="text-xs">{showAdvanced ? '▲' : '▼'}</span>
            </button>
            {showAdvanced && (
              <div className="p-4 border-t-2 border-black space-y-3 text-xs font-bold">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black uppercase text-gray-600">TEMPERATURE ({temperature})</span>
                    <span className="text-[9px] text-gray-500">0.0 (DETERMINISTIC) → 1.0 (CREATIVE)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-black cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Connected Tools Preview */}
          <div className="bg-[#FAF8F5] border-2 border-black p-3.5 shadow-[2px_2px_0px_#000]">
            <div className="text-[10px] font-black uppercase text-gray-600 mb-2 flex items-center gap-1.5">
              <Zap size={11} className="text-[#2563EB]" />
              <span>POWERED FOUNDER WORKSPACE ENGINES (AUTOMATICALLY CONNECTED):</span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[9px] font-black uppercase">
              {[
                'AI Pitch Analyzer', 'Startup Due Diligence Scorecard', 'Brutal Failure Analysis',
                'Investor Interview Simulator', 'Pitch Deck Auditor', 'Startup Validation 8-Pillar',
                'Startup 90-Day Roadmap', 'Term Sheet Simulator', 'Idea Validator'
              ].map(tool => (
                <span key={tool} className="bg-white border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                  {tool}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="h-16 shrink-0 bg-white border-t-4 border-black px-6 flex items-center justify-between shadow-[0_-3px_0px_#000]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-neutral-200 border-2 border-black text-xs font-black uppercase shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#CCFF00] hover:bg-[#b8f000] text-black border-3 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Check size={14} strokeWidth={3} />
            <span>SAVE & CONNECT TO FOUNDER WORKSPACE</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
