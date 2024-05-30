// pages/index.js
import React from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

const Home = () => {
  return (
    <div className='w-full max-w-[65ch] text-xs sm:text-sm mx-auto flex flex-col flex-1 gap-3 sm:gap-5'>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default Home;
