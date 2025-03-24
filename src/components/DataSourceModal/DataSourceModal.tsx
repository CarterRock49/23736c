import { useState } from 'react';
import { Node, Edge, Field } from '../../types';
import { findDirectDependencies, findTransitiveDependencies, getGlobalDataSources } from '../../utils/graphTraversal';

interface DataSourceModalProps {
  nodeId: string;
  field: Field;
  nodes: Node[];
  edges: Edge[];
  onClose: () => void;
  onSelect: (sourceFormId: string, sourceFieldId: string) => void;
}

const DataSourceModal: React.FC<DataSourceModalProps> = ({ 
  nodeId, 
  field, 
  nodes, 
  edges, 
  onClose, 
  onSelect 
}) => {
  const [activeTab, setActiveTab] = useState('direct');
  
  // Get direct dependencies
  const directDependencies = findDirectDependencies(nodes, edges, nodeId);
  
  // Get transitive dependencies
  const transitiveDependencies = findTransitiveDependencies(nodes, edges, nodeId);
  
  // Get global data sources
  const globalDataSources = getGlobalDataSources();
  
  const renderFieldList = (sourceNode: Node) => {
    return (
      <div key={sourceNode.id} style={{ marginBottom: '15px' }}>
        <h4>{sourceNode.data.name}</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {sourceNode.data.fields?.map(sourceField => (
            <li 
              key={sourceField.id}
              style={{ 
                padding: '5px', 
                margin: '5px 0', 
                border: '1px solid #eee', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => onSelect(sourceNode.id, sourceField.id)}
            >
              {sourceField.name || sourceField.id}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '4px',
        padding: '20px',
        width: '500px',
        maxHeight: '80vh',
        overflow: 'auto',
        color: '#333'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>Choose Data Source for {field.name || field.id}</h3>
          <button onClick={onClose}>×</button>
        </div>
        
        <div style={{ display: 'flex', borderBottom: '1px solid #ddd', marginBottom: '15px' }}>
          <button 
            style={{ 
              padding: '10px', 
              background: activeTab === 'direct' ? '#eee' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'direct' ? '2px solid blue' : 'none'
            }}
            onClick={() => setActiveTab('direct')}
          >
            Direct Dependencies
          </button>
          <button 
            style={{ 
              padding: '10px', 
              background: activeTab === 'transitive' ? '#eee' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'transitive' ? '2px solid blue' : 'none'
            }}
            onClick={() => setActiveTab('transitive')}
          >
            Transitive Dependencies
          </button>
          <button 
            style={{ 
              padding: '10px', 
              background: activeTab === 'global' ? '#eee' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'global' ? '2px solid blue' : 'none'
            }}
            onClick={() => setActiveTab('global')}
          >
            Global Data
          </button>
        </div>
        
        <div>
          {activeTab === 'direct' && (
            <div>
              {directDependencies.length > 0 ? (
                directDependencies.map(renderFieldList)
              ) : (
                <p>No direct dependencies available</p>
              )}
            </div>
          )}
          
          {activeTab === 'transitive' && (
            <div>
              {transitiveDependencies.length > 0 ? (
                transitiveDependencies.map(renderFieldList)
              ) : (
                <p>No transitive dependencies available</p>
              )}
            </div>
          )}
          
          {activeTab === 'global' && (
            <div>
              <h4>Global Properties</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {globalDataSources.map(globalField => (
                  <li 
                    key={globalField.id}
                    style={{ 
                      padding: '5px', 
                      margin: '5px 0', 
                      border: '1px solid #eee', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    onClick={() => onSelect('global', globalField.id)}
                  >
                    {globalField.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataSourceModal;