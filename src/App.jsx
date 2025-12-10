// src/App.jsx
import TaskEditor from './features/tasks/components/TaskEditor';
import TaskFilters from './features/tasks/components/TaskFilters';
import TaskList from './features/tasks/components/TaskList';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Task Tracker</h1>
          <p className="text-sm text-gray-600">Manage your daily tasks — simple CRUD, filters, and persistence.</p>
        </header>

        <section className="mb-4">
          <TaskEditor />
        </section>

        <section className="mb-4">
          <TaskFilters />
        </section>

        <section>
          <TaskList />
        </section>
      </div>
    </div>
  );
}
