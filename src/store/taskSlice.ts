import { createSlice, PayloadAction, configureStore } from "@reduxjs/toolkit";
import { Task } from "../types/task";


// Load tasks from localStorage
const loadTasks = (): Task[] => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  };
  
  // Create the Redux slice
  const tasksSlice = createSlice({
    name: "tasks",
    initialState: loadTasks(),
    reducers: {
      addTask: (state, action: PayloadAction<Task>) => {
        state.push(action.payload);
      },
      updateTask: (state, action: PayloadAction<Task>) => {
        const index = state.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      },
      deleteTask: (state, action: PayloadAction<number>) => {
        return state.filter((task) => task.id !== action.payload);
      },
    },
  });
  
  // Create the Redux store
  export const store = configureStore({
    reducer: {
      tasks: tasksSlice.reducer,
    },
  });
  
  
  // Create a custom middleware to save tasks to localStorage
  const localStorageMiddleware = (store: any) => (next: any) => (action: any) => {
      const result = next(action);
      localStorage.setItem("tasks", JSON.stringify(store.getState().tasks));
      return result;
    };
    
    // Add the middleware to the store
    store.dispatch = localStorageMiddleware(store)(store.dispatch);
    // Export the RootState type
    export type RootState = ReturnType<typeof store.getState>;
    export const { addTask, updateTask, deleteTask} = tasksSlice.actions;