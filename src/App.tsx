import React, { useState } from 'react';
import './App.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');

  // Add a new task
  const addTask = () => {
    if (newTask.trim() !== '') {
      const task: Task = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);

  const renderTasks = () => {
    let displayedTasks;
    if (activeTab === 'all') {
      displayedTasks = tasks;
    } else if (activeTab === 'incomplete') {
      displayedTasks = incompleteTasks;
    } else {
      displayedTasks = completedTasks;
    }

    return (
      <ul>
        {displayedTasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            {task.text}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="App">
      <h1>ToDo Application</h1>

      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="tabs">
        <button
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('all')}
        >
          All Tasks
        </button>
        <button
          className={activeTab === 'incomplete' ? 'active' : ''}
          onClick={() => setActiveTab('incomplete')}
        >
          Incomplete Tasks
        </button>
        <button
          className={activeTab === 'completed' ? 'active' : ''}
          onClick={() => setActiveTab('completed')}
        >
          Completed Tasks
        </button>
      </div>

      <div className="task-list">
        {renderTasks()}
      </div>
    </div>
  );
};

export default App;