Journey Builder React Coding Challenge
A React application that visualizes a Directed Acyclic Graph (DAG) of forms and implements a prefill mapping UI for form fields.
How to Run This Locally
Prerequisites

Node.js (v14 or newer)
npm or yarn

Setup

Clone the repository, then navigate into the project directory.
Install the project dependencies using npm install.
Navigate to the frontendchallengeserver directory, install its dependencies, and start the mock server with npm start. This will run on http://localhost:3000.
In another terminal window, from the project root, start the React application with npm run dev. This will run on http://localhost:5173.

How to Extend with New Data Sources

The application is designed with extensibility in mind, allowing you to easily add new data sources:

Define new data source types in the types file to maintain type safety.
Create provider functions that return your new data sources in the graph traversal utility file.
Add a new tab in the DataSourceModal component to display and select from your new data sources.

This approach lets you add new data sources without modifying the core application logic.
Key Patterns to Pay Attention To

Component Architecture

The application follows a clean component hierarchy with clear separation of concerns:

App.tsx: Main component managing application state
Graph.tsx: Visualizes the DAG using ReactFlow
PrefillPanel.tsx: Shows and manages form field prefill configurations
DataSourceModal.tsx: Provides UI for selecting data sources
graphTraversal.ts: Contains utility functions for traversing the DAG

Data Management

Immutable State Updates: All state changes use immutable update patterns
One-Way Data Flow: Data flows down from the App component
Functional Components: All components are functional with hooks for state management

Extensibility Patterns

Provider Pattern: Data sources are abstracted through provider functions
Component Composition: UI is composed of reusable components
Utility Function Separation: Business logic is separated from UI components

Technology Stack

React: UI library
TypeScript: Type safety and better developer experience
ReactFlow: Graph visualization
Vite: Build tool