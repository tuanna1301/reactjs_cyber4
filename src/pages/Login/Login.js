import React, { useState } from 'react'
import { Prompt } from 'react-router';

export default function Login(props) {

    const [login, setLogin] = useState({
        userName: '',
        passWord: ''
    })
    console.log(login);

    const handleChange = (e) => {
        let { name, value } = e.target
        setLogin({
            ...login,
            [name]: value
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (login.userName === 'cyberlearn' && login.passWord === 'cyberlearn') {
            //thành công chuyển đến trang trước đó
            // props.history.goBack();
            //thành công chuyển đến trang chỉ định
            props.history.push('/home');
            localStorage.setItem("login", JSON.stringify(login))

        } else {
            alert('Login fail')
            return;
        }
    }

    return (
        <form className="container" onSubmit={handleLogin}>
            <h3 className="display-4">Login</h3>
            <div className="form-group">
                <p>Username</p>
                <input name="userName" className="form-control" onChange={handleChange} />
            </div>
            <div className="form-group">
                <p>Password</p>
                <input name="passWord" className="form-control" onChange={handleChange} />
            </div>
            <div className="form-group">
                <button className="btn btn-success">Đăng nhập</button>
            </div>
            <Prompt when={true} message={(location) => {
                return 'Bạn có chắc muốn rời khỏi trang này!';
            }} />
        </form>
    )
}
