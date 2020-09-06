import React, { useEffect, useState } from 'react';
import './App.css';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, TodoStore, Todo, addTodo, delTodo, checkUpdate } from './store/todoSlice';
import { SerializedError } from '@reduxjs/toolkit';

type SelectorType = {
  isLoading: boolean;
  todos: Todo[];
  error?: SerializedError | Error;
};

function App() {
  const [todoTitle, setTodoTitle] = useState('');
  const dispatch = useDispatch();

  const { isLoading, todos, error } = useSelector<TodoStore, SelectorType>((state) => ({
    isLoading: state.isLoading,
    todos: state.todos,
    error: state.error,
  }));

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  if (error) {
    return <h3>Error {error.message}</h3>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.info(todos);

  const handleAddTodo = (e: any, text: string) => {
    e.preventDefault();
    dispatch(addTodo({ userId: 1, id: Date.now(), title: text, completed: false }));
    setTodoTitle('');
  };

  return (
    <div>
      <form action="" onSubmit={(e) => handleAddTodo(e, todoTitle)}>
        <input onChange={(e) => setTodoTitle(e.target.value)} value={todoTitle} type="text" />
        <button type="submit">Click</button>
      </form>
      <ul>
        {todos.map((t, index) => {
          return (
            <li key={t.id}>
              <input
                type="checkbox"
                onChange={() => dispatch(checkUpdate(t.id))}
                checked={t.completed}
              />
              {t.title}
              <button onClick={() => dispatch(delTodo(t.id))}>DEL</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
