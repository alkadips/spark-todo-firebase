// features/todos/todoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, deleteDoc, doc,updateDoc, getDoc,where, query } from "firebase/firestore";
import { db } from "../../../firebase";
import {wrapper} from '../../store'

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async (_, { getState }) => {
  const state = getState()
  const q=query(collection(db, "todos"), where('userId', '==', state.auth.user.uid))
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const addTodo = createAsyncThunk("todos/addTodo", async (text, {getState}) => {
 const state = getState()
  const docRef = await addDoc(collection(db, "todos"),{text,userId: state.auth.user.uid});
  return { id: docRef.id, text };
});
export const editTodo = createAsyncThunk("todos/editTodo", async ({ id, text }) => {
  console.log("data in edit todo",text)
  const docRef = doc(db, "todos", id);
  await updateDoc(docRef, { text });
  return { id, text };
});
export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (id) => {
  const docRef = doc(db, "todos", id);
  const docSnap = await getDoc(docRef);
  const completed = !docSnap.data().completed;
  await updateDoc(docRef, { completed });
  return { id, completed };
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await deleteDoc(doc(db, "todos", id));
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index].text = action.payload.text;
        }
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index].completed = action.payload.completed;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
