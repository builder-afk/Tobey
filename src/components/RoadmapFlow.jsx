import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';
import { Sparkles, CheckCircle2 } from 'lucide-react';

// Custom Nodes in Neo-Brutalist Style
const MainNode = ({ data }) => {
  return (
    <div className="px-5 py-3 border-3 border-black shadow-[4px_4px_0px_#000] bg-[#FFDE59] text-black font-mono font-black text-base whitespace-nowrap min-w-[240px] text-center uppercase tracking-tight">
      <Handle type="target" position={Position.Top} className="!bg-black !border-black !w-2 !h-2" />
      {data.label}
      <Handle type="source" position={Position.Bottom} className="!bg-black !border-black !w-2 !h-2" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-black !border-black !w-2 !h-2" />
      <Handle type="source" id="right" position={Position.Right} className="!bg-black !border-black !w-2 !h-2" />
    </div>
  );
};

const SubNode = ({ data }) => {
  return (
    <div className="px-3.5 py-2 border-2 border-black bg-white text-black font-mono font-bold text-xs uppercase flex items-center gap-2 whitespace-nowrap shadow-[3px_3px_0px_#000] hover:bg-[#00F0FF] transition-colors cursor-pointer">
      <Handle type="target" position={Position.Left} className="!bg-black !border-black !w-1.5 !h-1.5" />
      <CheckCircle2 size={13} className="text-black stroke-[2.5]" />
      {data.label}
    </div>
  );
};

const nodeTypes = {
  mainNode: MainNode,
  subNode: SubNode,
};

// Layout Engine
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction, align: 'DL', ranksep: 80, nodesep: 50 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: node.data.isMain ? 280 : 180, height: node.data.isMain ? 70 : 38 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - (node.data.isMain ? 280 : 180) / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - (node.data.isMain ? 70 : 38) / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

export default function RoadmapFlow({ roadmapData }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!roadmapData || !roadmapData.timeline) return;

    const initialNodes = [];
    const initialEdges = [];

    // Root Node
    initialNodes.push({
      id: 'root',
      type: 'mainNode',
      data: { label: roadmapData.title, isMain: true },
      position: { x: 0, y: 0 },
    });

    let previousMainId = 'root';

    roadmapData.timeline.forEach((step, index) => {
      const mainId = `main-${index}`;
      
      // Main Timeline Node
      initialNodes.push({
        id: mainId,
        type: 'mainNode',
        data: { label: step.title, isMain: true },
        position: { x: 0, y: 0 },
      });

      // Edge from previous main node to current main node
      initialEdges.push({
        id: `edge-${previousMainId}-${mainId}`,
        source: previousMainId,
        target: mainId,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#000', strokeWidth: 3 },
      });

      // Topics branching off the main node
      if (step.topics && step.topics.length > 0) {
        step.topics.forEach((topic, topicIndex) => {
          const subId = `sub-${index}-${topicIndex}`;
          const isLeft = topicIndex % 2 === 0;

          initialNodes.push({
            id: subId,
            type: 'subNode',
            data: { label: topic, isLeft, isMain: false },
            position: { x: 0, y: 0 },
          });

          initialEdges.push({
            id: `edge-${mainId}-${subId}`,
            source: mainId,
            target: subId,
            sourceHandle: isLeft ? 'left' : 'right',
            type: 'step',
            style: { stroke: '#000', strokeWidth: 2, strokeDasharray: '4,4' },
          });
        });
      }

      previousMainId = mainId;
    });

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges, 'TB');

    // Make side branches spread sideways
    const finalNodes = layoutedNodes.map(node => {
        if (node.type === 'subNode') {
            const parentId = initialEdges.find(e => e.target === node.id)?.source;
            const parentNode = layoutedNodes.find(n => n.id === parentId);
            if (parentNode) {
                const xOffset = node.data.isLeft ? -280 : 280;
                const subNodesOfParent = layoutedNodes.filter(n => n.type === 'subNode' && initialEdges.find(e => e.target === n.id)?.source === parentId);
                const subIndex = subNodesOfParent.findIndex(n => n.id === node.id);
                
                return {
                    ...node,
                    position: {
                        x: parentNode.position.x + xOffset,
                        y: parentNode.position.y + (subIndex * 46) - ((subNodesOfParent.length * 46)/2) + 23
                    }
                }
            }
        }
        return node;
    });

    setNodes(finalNodes);
    setEdges(layoutedEdges);
  }, [roadmapData]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-[78vh] border-4 border-black bg-[#F8F6F0] relative shadow-[6px_6px_0px_#000] overflow-hidden">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-[#CCFF00] border-2 border-black text-black font-mono font-black text-xs uppercase shadow-[3px_3px_0px_#000]">
        <Sparkles size={14} className="stroke-[2.5]" /> Interactive Map
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
      >
        <Background color="#000" gap={20} size={1} />
        <Controls className="!bg-white !border-2 !border-black !shadow-[3px_3px_0px_#000] [&>button]:!border-b-2 [&>button]:!border-black [&>button]:!text-black hover:[&>button]:!bg-[#FFDE59]" />
        <MiniMap 
            nodeColor={(node) => {
              if (node.type === 'mainNode') return '#FFDE59';
              return '#00F0FF';
            }}
            nodeStrokeWidth={2}
            nodeStrokeColor="#000"
            zoomable panning 
            className="!bg-white !border-2 !border-black !shadow-[3px_3px_0px_#000]"
            maskColor="rgba(0, 0, 0, 0.15)"
        />
      </ReactFlow>
    </div>
  );
}
