// src/App.jsx
import React from 'react';
import TaskList from './components/TaskList';

export default function App() {
  return (
    <div className="container">
      <h1>My Tasks</h1>
      <TaskList />
    </div>
  );
}
