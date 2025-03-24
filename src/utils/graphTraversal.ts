import { Node, Edge, GlobalDataSource } from '../types';

// Find direct dependencies (forms that directly feed into this form)
export const findDirectDependencies = (
  nodes: Node[], 
  edges: Edge[], 
  nodeId: string
): Node[] => {
  // Find all incoming edges to this node
  const incomingEdges = edges.filter(edge => edge.target === nodeId);
  
  // Get the source nodes
  return incomingEdges
    .map(edge => nodes.find(node => node.id === edge.source))
    .filter(Boolean) as Node[];
};

// Find transitive dependencies (forms that indirectly feed into this form)
export const findTransitiveDependencies = (
  nodes: Node[], 
  edges: Edge[], 
  nodeId: string
): Node[] => {
  const direct = findDirectDependencies(nodes, edges, nodeId);
  const directIds = new Set(direct.map(node => node.id));
  
  // Use BFS to find all ancestors
  const allDependencies = new Set<string>(directIds);
  const queue = [...direct.map(node => node.id)];
  
  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const currentDependencies = findDirectDependencies(nodes, edges, currentId);
    
    for (const dep of currentDependencies) {
      if (!allDependencies.has(dep.id)) {
        allDependencies.add(dep.id);
        queue.push(dep.id);
      }
    }
  }
  
  // Filter out direct dependencies to get only transitive ones
  return nodes.filter(node => 
    allDependencies.has(node.id) && !directIds.has(node.id)
  );
};

// Mock global data sources
export const getGlobalDataSources = (): GlobalDataSource[] => {
  return [
    { id: 'client_name', name: 'Client Name', type: 'string' },
    { id: 'client_id', name: 'Client ID', type: 'string' },
    { id: 'client_email', name: 'Client Email', type: 'string' }
  ];
};