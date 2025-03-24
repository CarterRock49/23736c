import { useState } from 'react';
import { Node, Edge, Field } from '../../types';
import DataSourceModal from '../DataSourceModal/DataSourceModal';

interface PrefillPanelProps {
  node: Node;
  nodes: Node[];
  edges: Edge[];
  onUpdatePrefill: (nodeId: string, fieldId: string, prefill: any) => void;
  onClose: () => void;
}

const PrefillPanel = ({ node, nodes, edges, onUpdatePrefill, onClose }: PrefillPanelProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedField, setSelectedField] = useState<Field | null>(null);

  const handleConfigureClick = (field: Field) => {
    setSelectedField(field);
    setShowModal(true);
  };

  const handleClearPrefill = (fieldId: string) => {
    onUpdatePrefill(node.id, fieldId, null);
  };

  const handleSelectDataSource = (sourceFormId: string, sourceFieldId: string) => {
    if (selectedField) {
      onUpdatePrefill(node.id, selectedField.id, {
        source: sourceFormId,
        sourceField: sourceFieldId,
      });
      setShowModal(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{node.data.name} - Field Prefill Configuration</h3>
        <button onClick={onClose}>×</button>
      </div>
      
      {node.data.fields?.map((field) => (
        <div 
          key={field.id} 
          style={{ 
            padding: '10px', 
            marginBottom: '10px', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <div><strong>{field.name || field.id}</strong></div>
            <div style={{ fontSize: '0.8em', color: '#666' }}>{field.type}</div>
          </div>
          
          {field.prefill ? (
            <div>
              <div>
                Prefilled from: {
                  nodes.find(n => n.id === field.prefill?.source)?.data.name || field.prefill.source
                } - {field.prefill.sourceField}
              </div>
              <button onClick={() => handleClearPrefill(field.id)}>×</button>
            </div>
          ) : (
            <button onClick={() => handleConfigureClick(field)}>Configure</button>
          )}
        </div>
      ))}
      
      {showModal && selectedField && (
        <DataSourceModal
          nodeId={node.id}
          field={selectedField}
          nodes={nodes}
          edges={edges}
          onClose={() => setShowModal(false)}
          onSelect={handleSelectDataSource}
        />
      )}
    </div>
  );
};

export default PrefillPanel;