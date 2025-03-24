Journey Builder React Coding Challenge

A React application that visualizes a Directed Acyclic Graph (DAG) of forms and implements a prefill mapping UI for form fields.

How to Run This Locally

Prerequisites

Node.js (v14 or newer)

npm or yarn

Setup

Clone the repository:

git clone https://github.com/your-username/23736c.git

cd 23736c

Install dependencies:

npm install

Start the mock server:

Navigate to the mock server directory

cd frontendchallengeserver

Install server dependencies

npm install

Start the server

npm start

The server will run on http://localhost:3000

Start the React application:

In another terminal, from the project root

cd ..

npm run dev

The application will run on http://localhost:5173


How to Extend with New Data Sources

The application is designed with extensibility in mind, allowing you to easily add new data sources:

Add a new data source type in the types file:

In src/types/index.ts, extend the GlobalDataSource interface or add a new interface:

export interface NewDataSource {

id: string;

name: string;

type: string;

// Add any additional properties needed

}

Create a provider function for the new data source:

In src/utils/graphTraversal.ts, add a new function to fetch your data source:

export const getNewDataSources = (): NewDataSource[] => {

// Return your data sources

return [

  { id: 'new_source_1', name: 'New Source 1', type: 'string' }

  { id: 'new_source_2', name: 'New Source 2', type: 'number' }

  ];

};
Add the new data source to the DataSourceModal:

In src/components/DataSourceModal/DataSourceModal.tsx:

// Add a new tab for your data source

<button
  className={tab-button ${activeTab === 'new_source' ? 'active' : ''}}
  onClick={() => setActiveTab('new_source')}

New Data Source

</button>

{/* Add the content for the new tab */}

{activeTab === 'new_source' && (

  <div>

    <h4>New Data Sources</h4>

    <ul className="field-list">

      {getNewDataSources().map(source => (

        <li 

          key={source.id}

          className="field-item"

          onClick={() => onSelect('new_source', source.id)}

        >

          {source.name}

        </li>

      ))}

    </ul>

  </div>

)}


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
