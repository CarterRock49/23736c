import { useState, useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';
import './App.css';
import { fetchGraphData } from './services/api';
import Graph from './components/Graph/Graph';
import { Node, Edge } from './types';

function App() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadGraph = async () => {
      try {
        setLoading(true);
        const data = await fetchGraphData();
        
        // Process nodes to add field information from forms
        const processedNodes = data.nodes.map((node: Node) => {
          if (node.type === 'form') {
            // Find the corresponding form
            const form = data.forms.find(f => f.id === node.data.component_id);
            
            if (form) {
              // Extract fields from the form's schema
              const fields = Object.entries(form.field_schema.properties).map(
                ([key, value]) => ({
                  id: key,
                  name: value.title || key,
                  type: value.type,
                  avantos_type: value.avantos_type
                })
              );
              
              // Add fields to node data
              return {
                ...node,
                data: {
                  ...node.data,
                  fields
                }
              };
            }
          }
          return node;
        });
        
        setNodes(processedNodes);
        setEdges(data.edges);
      } catch (err) {
        console.error('Error loading graph data:', err);
        setError('Failed to load graph data. Make sure the mock server is running.');
      } finally {
        setLoading(false);
      }
    };
    
    loadGraph();
  }, []);
  
  const handleUpdatePrefill = (nodeId: string, fieldId: string, prefill: any) => {
    setNodes(prevNodes => 
      prevNodes.map(node => {
        if (node.id !== nodeId) return node;
        
        // Update the specific field's prefill configuration
        const updatedFields = node.data.fields?.map(field => {
          if (field.id !== fieldId) return field;
          return { ...field, prefill };
        });
        
        return {
          ...node,
          data: {
            ...node.data,
            fields: updatedFields
          }
        };
      })
    );
  };

  return (
    <div className="app">
      <header>
        <h1>Journey Builder</h1>
      </header>
      
      {loading && <div className="loading">Loading graph data...</div>}
      {error && <div className="error">{error}</div>}
      
      {!loading && !error && (
        <ReactFlowProvider>
          <Graph 
            nodes={nodes} 
            edges={edges} 
            onUpdatePrefill={handleUpdatePrefill} 
          />
        </ReactFlowProvider>
      )}
    </div>
  );
}

export default App;