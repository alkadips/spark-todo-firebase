// components/AddTodo.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/reducers/todos/todoSlice';

const AddTodo = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-stretch'>
        <input type='text' placeholder="Enter todo" value={text}
        onChange={(e) => setText(e.target.value)} className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1" />
        <button type="submit" className='w-fit px-4 sm:px-6 py-2 sm:py-3 bg-amber-400 text-white font-medium text-base duration-300 hover:opacity-40'>ADD</button>
    </form>
  );
};

export default AddTodo;
