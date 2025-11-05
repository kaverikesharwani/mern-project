// src/components/NewTaskForm.jsx
import React, { useState } from 'react';
import api from '../api';

export default function NewTaskForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return setError('Add a title');
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/tasks', { title: title.trim(), description });
      onCreated(res.data); // tell parent to add new item to list
      setTitle(''); setDescription('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" />
      <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Task'}</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}
