export interface Node {
    id: string;
    type: string;
    position: {
      x: number;
      y: number;
    };
    data: {
      id: string;
      component_key: string;
      component_type: string;
      component_id: string;
      name: string;
      prerequisites: string[];
      permitted_roles: any[];
      input_mapping: Record<string, any>;
      sla_duration: {
        number: number;
        unit: string;
      };
      approval_required: boolean;
      approval_roles: any[];
      fields?: Field[];
    };
  }
  
  export interface Edge {
    source: string;
    target: string;
    id?: string;
  }
  
  export interface Field {
    id: string;
    name?: string;
    type: string;
    avantos_type?: string;
    title?: string;
    prefill?: {
      source: string;
      sourceField: string;
    };
  }
  
  export interface Form {
    id: string;
    name: string;
    description: string;
    is_reusable: boolean;
    field_schema: {
      type: string;
      properties: Record<string, any>;
      required: string[];
    };
    ui_schema: any;
    dynamic_field_config?: any;
  }
  
  export interface GraphData {
    id: string;
    tenant_id: string;
    name: string;
    description: string;
    category: string;
    nodes: Node[];
    edges: Edge[];
    forms: Form[];
    branches: any[];
    triggers: any[];
  }
  
  export interface GlobalDataSource {
    id: string;
    name: string;
    type: string;
    // Add any additional properties your data source needs
  }