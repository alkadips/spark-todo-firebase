import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/actions/authFunctions";

export default function Modal(props) {
    const { setOpenModal } = props
    const [_document, set_document] = useState(null)
    const dispatch = useDispatch();
    useEffect(() => {
        set_document(document)
    }, [])

    const handleLogout=()=>{
        dispatch(logoutUser());
        setOpenModal(false)
    }

    if (!_document) { return null }

    return ReactDom.createPortal(
        <div className='fixed inset-0 bg-white text-slate-900 text-lg sm:text-xl flex flex-col'>
            <div className='flex items-center justify-between border-b border-solid border-slate-900 p-4'>
                <h1 className='font-extrabold text-2xl sm:text-5xl select-none'>MENU</h1>
                <i onClick={() => setOpenModal(false)} className="fa-solid fa-xmark duration-300 hover:rotate-90 text-lg sm:text-3xl cursor-pointer"></i>
            </div>
            <div className='p-4 flex flex-col gap-3'>
                <h2 onClick={() => handleLogout()} className='select-none duration-300 hover:pl-2 cursor-pointer'>Logout</h2>
            </div>
        </div>,
        _document.getElementById('portal')
    )
}
