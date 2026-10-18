import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Server, Play, CheckCircle2, ArrowLeft, LayoutTemplate, Network, Box, RefreshCw } from 'lucide-react';

export default function KubernetesArena() {
  const navigate = useNavigate();
  const [code, setCode] = useState(`apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-deployment\n  labels:\n    app: nginx\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.14.2\n        ports:\n        - containerPort: 80`);
  const [isApplying, setIsApplying] = useState(false);
  const [pods, setPods] = useState([
    { id: 1, status: 'Running', phase: 'active' },
    { id: 2, status: 'Running', phase: 'active' },
  ]);

  const handleApply = () => {
    setIsApplying(true);
    setPods([
      { id: 1, status: 'Terminating', phase: 'dying' },
      { id: 2, status: 'Terminating', phase: 'dying' },
    ]);
    
    setTimeout(() => {
      setPods([
        { id: 3, status: 'ContainerCreating', phase: 'creating' },
        { id: 4, status: 'ContainerCreating', phase: 'creating' },
        { id: 5, status: 'ContainerCreating', phase: 'creating' },
      ]);
      
      setTimeout(() => {
        setPods([
          { id: 3, status: 'Running', phase: 'active' },
          { id: 4, status: 'Running', phase: 'active' },
          { id: 5, status: 'Running', phase: 'active' },
        ]);
        setIsApplying(false);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF8F5] text-black font-mono">
      {/* Header */}
      <div className="h-16 border-b-4 border-black flex items-center justify-between px-6 bg-white shadow-[0px_4px_0px_#000] z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/royale')} 
            className="p-2 bg-white hover:bg-[#FFDE59] border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-black"
          >
            <ArrowLeft size={18} className="stroke-[3]" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border-2 border-black bg-[#00F0FF] flex items-center justify-center shadow-[2px_2px_0px_#000]">
              <Server size={18} className="stroke-[2.5] text-black" />
            </div>
            <div>
              <h1 className="font-black text-sm uppercase tracking-tight text-black">KUBERNETES CLUSTER</h1>
              <p className="text-[11px] font-bold text-gray-600 uppercase">DECLARATIVE MANIFEST DEPLOYMENT</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleApply}
            disabled={isApplying}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FFDE59] hover:bg-[#ffe57e] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
          >
            {isApplying ? <RefreshCw size={14} className="animate-spin stroke-[3]" /> : <Play size={14} className="stroke-[3]" />}
            {isApplying ? 'APPLYING CONFIG...' : 'KUBECTL APPLY -F'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#CCFF00] hover:bg-[#d8ff33] text-black border-3 border-black font-black uppercase text-xs shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <CheckCircle2 size={14} className="stroke-[3]" /> SUBMIT
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
        
        {/* Left Panel: YAML Editor */}
        <div className="flex flex-col border-r-4 border-black bg-[#18181b] relative overflow-hidden">
          <div className="h-10 bg-[#FAF8F5] border-b-3 border-black flex items-center px-4 justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-black uppercase text-black">
              <LayoutTemplate size={14} className="stroke-[3]" /> deployment.yaml
            </div>
            <span className="text-[10px] font-black uppercase bg-[#00F0FF] px-2 py-0.5 border border-black text-black">
              K8S MANIFEST
            </span>
          </div>
          <div className="flex-1 flex relative overflow-hidden">
            <div className="w-12 bg-[#18181b] border-r border-zinc-700 py-6 text-zinc-500 font-mono text-xs select-none flex flex-col items-center">
              {Array.from({length: 18}).map((_, i) => <span key={i} className="leading-relaxed">{i + 1}</span>)}
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-emerald-400 p-6 font-mono text-xs md:text-sm focus:outline-none resize-none leading-relaxed selection:bg-[#CCFF00] selection:text-black"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Right Panel: Cluster Visualizer */}
        <div className="flex flex-col bg-[#FAF8F5] p-6 overflow-y-auto">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F0FF] border-2 border-black font-black text-black text-xs uppercase shadow-[2px_2px_0px_#000] mb-6 w-fit">
            <Network size={14} className="stroke-[2.5]" />
            <span>[ POD RECONCILIATION TOPOLOGY ]</span>
          </div>

          <div className="flex flex-col gap-6 flex-1">
            
            {/* Ingress / LoadBalancer */}
            <div className="border-3 border-black bg-white p-4 shadow-[4px_4px_0px_#000] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFDE59] border-2 border-black flex items-center justify-center text-black shadow-[2px_2px_0px_#000]">
                  <Network size={20} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase text-black">NGINX-SERVICE</h3>
                  <p className="text-[11px] font-bold text-gray-600 uppercase">LOADBALANCER (PORT 80)</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-[#CCFF00] border-2 border-black text-black text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                ACTIVE
              </div>
            </div>

            {/* Connecting lines */}
            <div className="flex justify-center -my-3 z-0">
              <div className="w-1.5 h-6 bg-black" />
            </div>

            {/* Deployment / Pods */}
            <div className="border-3 border-black bg-white p-6 shadow-[5px_5px_0px_#000] flex flex-col gap-4">
              <div className="flex justify-between items-center mb-1">
                <div>
                  <h3 className="font-black text-sm uppercase text-black">NGINX-DEPLOYMENT</h3>
                  <p className="text-[11px] font-bold text-gray-600 uppercase">REPLICASET CONTROLLER</p>
                </div>
                <div className="text-xs font-black uppercase bg-[#FAF8F5] border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_#000]">
                  DESIRED: 3 | CURRENT: {pods.length}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {pods.map(pod => (
                  <div key={pod.id} className={`flex flex-col items-center gap-2 p-3 border-2 border-black transition-all shadow-[3px_3px_0px_#000]
                    ${pod.phase === 'active' ? 'bg-[#CCFF00]' : 
                      pod.phase === 'creating' ? 'bg-[#FFDE59] animate-pulse' : 
                      'bg-[#FF0033] text-white opacity-80'}
                  `}>
                    <Box size={22} className="stroke-[2.5]" />
                    <div className="text-center font-black">
                      <div className="text-xs uppercase">pod-{pod.id.toString().padStart(4, '0')}</div>
                      <div className="text-[10px] uppercase mt-0.5 tracking-wider">{pod.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kubectl Terminal Output */}
            <div className="mt-auto p-4 bg-black text-[#CCFF00] border-3 border-black font-mono text-xs shadow-[4px_4px_0px_#000]">
              <div className="text-white font-black uppercase mb-2 border-b border-zinc-700 pb-1">$ kubectl get pods -o wide</div>
              {pods.map(pod => (
                <div key={pod.id} className="flex justify-between hover:bg-zinc-900 px-1 py-0.5">
                  <span>nginx-deploy-5c689d-{pod.id}</span>
                  <span>1/1</span>
                  <span className={pod.phase === 'active' ? 'text-[#CCFF00]' : pod.phase === 'creating' ? 'text-amber-400' : 'text-red-400'}>{pod.status}</span>
                  <span>10.244.0.{pod.id}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
