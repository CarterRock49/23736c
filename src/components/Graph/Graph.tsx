import { useState } from 'react';
import ReactFlow, { 
  Background, 
  Controls,
  MiniMap,
  Node as FlowNode,
  Edge as FlowEdge 
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Node, Edge } from '../../types';
import PrefillPanel from '../PrefillPanel/PrefillPanel';

interface GraphProps {
  nodes: Node[];
  edges: Edge[];
  onUpdatePrefill: (nodeId: string, fieldId: string, prefill: any) => void;
}

const Graph: React.FC<GraphProps> = ({ nodes, edges, onUpdatePrefill }) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  
  // Convert to ReactFlow format
  const flowNodes: FlowNode[] = nodes.map(node => ({
    id: node.id,
    position: node.position,
    data: { label: node.data.name, originalNode: node },
    type: 'default'
  }));
  
  const flowEdges: FlowEdge[] = edges.map((edge, index) => ({
    id: `edge-${index}`,
    source: edge.source,
    target: edge.target,
    type: 'default'
  }));
  
  const handleNodeClick = (_: any, node: FlowNode) => {
    const originalNode = node.data.originalNode;
    setSelectedNode(originalNode);
  };

  return (
    <div style={{ height: '80vh', width: '100%', display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={flowNodes}
          edges={flowEdges}
          onNodeClick={handleNodeClick}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      
      {selectedNode && (
        <div style={{ width: '350px', borderLeft: '1px solid #ccc', padding: '10px' }}>
          <PrefillPanel 
            node={selectedNode}
            nodes={nodes}
            edges={edges}
            onUpdatePrefill={onUpdatePrefill}
            onClose={() => setSelectedNode(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Graph;