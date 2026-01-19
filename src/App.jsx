import { useMemo, useState } from 'react';

const initialTodos = [
  { id: 1, text: 'Сверстать основу приложения', completed: true },
  { id: 2, text: 'Добавить Tailwind стили', completed: false },
  { id: 3, text: 'Проверить интерактивность списка', completed: false },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState('');

  const remainingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
    setText('');
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-3xl bg-white p-8 shadow-lg">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            TODO LIST
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Планируйте день и отмечайте прогресс
          </h1>
          <p className="text-sm text-slate-500">
            Осталось задач: <span className="font-semibold">{remainingCount}</span>
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center"
        >
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Добавьте новую задачу"
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 active:scale-[0.98]"
          >
            Добавить
          </button>
        </form>

        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
              Список пуст — добавьте задачу выше.
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
                >
                  <label className="flex flex-1 items-center gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="h-5 w-5 rounded border-slate-300 text-sky-500 focus:ring-sky-200"
                    />
                    <span
                      className={`text-sm font-medium transition ${
                        todo.completed
                          ? 'text-slate-400 line-through'
                          : 'text-slate-700'
                      }`}
                    >
                      {todo.text}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => removeTodo(todo.id)}
                    className="rounded-lg border border-transparent px-3 py-2 text-xs font-semibold uppercase tracking-wide text-rose-500 transition hover:border-rose-100 hover:bg-rose-50 active:scale-95"
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
