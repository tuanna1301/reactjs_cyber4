import React from 'react'
import { Redirect } from 'react-router-dom'
export default function Profile(props) {

    if (localStorage.getItem("login")) {
        return (
            <div>
                123
            </div>
        )
    } else {
        alert("Vui lòng đăng nhập")
        return <Redirect to="/login" />
    }

}
