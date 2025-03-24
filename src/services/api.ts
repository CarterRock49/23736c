import axios from 'axios';
import { GraphData } from '../types';

export const fetchGraphData = async (): Promise<GraphData> => {
    try {
      // Update to match the exact URL pattern the server expects
      const response = await axios.get('http://localhost:3000/api/v1/tenant/actions/blueprints/blueprint_id/graph');
      return response.data;
    } catch (error) {
      console.error('Error fetching graph data:', error);
      throw error;
    }
  };