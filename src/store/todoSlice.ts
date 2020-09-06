import { createSlice, SerializedError, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import Axios from '../../node_modules/axios';

export type Todo = {
  userId: number;
  id: number;
  completed: boolean;
  title: string;
};

export type TodoStore = {
  isLoading: boolean;
  todos: Todo[];
  error?: Error | SerializedError;
};

export const fetchTodos = createAsyncThunk<Todo[]>('todo/fetchTodos', async () => {
  const response = await Axios.get('https://jsonplaceholder.typicode.com/todos?q=20');
  return response.data;
});

type Check = {
  id: number;
  completed: boolean;
};

export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: {
    isLoading: false,
    todos: [
      { userId: 1, id: 1, title: 'hello', completed: false },
      { userId: 1, id: 2, title: 'mem', completed: true },
    ],
    error: undefined,
  } as TodoStore,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => ({
      ...state,
      todos: [...state.todos, action.payload],
    }),
    delTodo: (state, action: PayloadAction<number>) => ({
      ...state,
      todos: [...state.todos.filter((t) => t.id !== action.payload)],
    }),
    checkUpdate: (state, action: PayloadAction<number>) => ({
      ...state,
      todos: [
        ...state.todos.map((t: Todo) => {
          if (t.id === action.payload) {
            return { ...t, completed: !t.completed };
          } else {
            return { ...t };
          }
        }),
      ],
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchTodos.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        todos: [...state.todos, ...payload],
      }))
      .addCase(fetchTodos.rejected, (state, { error }) => ({ ...state, isLoading: false, error }));
  },
});

export const { addTodo, delTodo, checkUpdate } = todoSlice.actions;
