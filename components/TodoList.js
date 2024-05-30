// components/TodoList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, toggleTodo, deleteTodo, editTodo } from '../store/reducers/todos/todoSlice';

const TodoList = () => {
    const todos = useSelector((state) => state.todo.items);
    const dispatch = useDispatch();
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleEdit = (id, text) => {
        setEditId(id);
        setEditText(text);
    };

    const handleEditSubmit = (e, id) => {
        e.preventDefault();
        dispatch(editTodo({ id, text: editText }));
        setEditId(null);
        setEditText('');
    };

    return (
        <>
            {todos?.map((todo,index) => (
                <div key={index} className='p-2  sm:p-3 border flex  border-white border-solid'>

                    {editId === todo.id ? (
                        <div className='flex-1 flex '>
                            <form onSubmit={(e) => handleEditSubmit(e, todo.id)}>
                                <input
                                    type="text"
                                    className='bg-inherit flex-1 text-white outline-none'
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button type="submit">Save</button>
                            </form>
                        </div>
                    ) : (
                        <>
                            <div className='flex items-center justify-between'>
                                <div
                                    onClick={() => dispatch(toggleTodo(todo.id))}
                                    style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {todo.text}
                                </div>
                                <div>
                                {(editId === todo.id) ? <i onClick={null} className="fa-solid fa-check px-2 duration-300 hover:scale-125 cursor-pointer"></i> : <i onClick={() => handleEdit(todo.id, todo.text)} className="fa-solid fa-pencil px-2 duration-300 hover:rotate-45 cursor-pointer"></i>}
                                <i onClick={() => dispatch(deleteTodo(todo.id))} className="fa-solid fa-trash-can px-2 duration-300 hover:scale-125 cursor-pointer"></i>
                                </div>
                            </div>
                        </>
                    )}
                </div>

            ))}
        </>
    );
};

export default TodoList;
