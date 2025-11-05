// src/components/TaskList.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';
import NewTaskForm from './NewTaskForm';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        if (mounted) setTasks(res.data);
      } catch (err) {
        setError('Could not fetch tasks');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchTasks();
    return () => { mounted = false; };
  }, []);

  const handleCreated = (newTask) => {
    // add to top for instant UI update
    setTasks(prev => [newTask, ...prev]);
  };

  const handleDelete = async (id) => {
    // optimistic delete: remove from UI immediately, then call backend
    const prev = tasks;
    setTasks(prev.filter(t => t.id !== id));
    try {
      await api.delete(`/tasks/${id}`);
      // success: nothing more
    } catch (err) {
      // rollback on failure
      setTasks(prev);
      alert('Delete failed');
    }
  };

  if (loading) return <div>Loading tasks…</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div>
      <h2>Tasks</h2>
      <NewTaskForm onCreated={handleCreated} />
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            <strong>{t.title}</strong>
            {t.description && <p>{t.description}</p>}
            <button onClick={() => {
              if (!confirm('Delete this task?')) return;
              handleDelete(t.id);
            }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
