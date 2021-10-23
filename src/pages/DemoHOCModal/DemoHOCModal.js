import React from 'react'
import { useDispatch } from 'react-redux'
import Login from '../Login/Login';
import Register from '../Register/Register';
export default function DemoHOCModal() {

    const dispatch = useDispatch();

    return (
        <div>
            {/* Button trigger modal */}
            <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId" onClick={() => {
                dispatch({
                    type: 'OPEN_FORM',
                    Component: <Login />
                })
            }}>
                Đăng nhập
            </button>
            <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId" onClick={() => {
                dispatch({
                    type: 'OPEN_FORM',
                    Component: <Register />
                })
            }}>
                Đăng ký
            </button>
        </div>
    )
}
