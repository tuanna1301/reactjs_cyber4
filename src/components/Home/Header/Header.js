import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
            <NavLink className="navbar-brand" to="/home">Cyberlearn</NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/home">Home <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink className="nav-link" to="/contact">Contact</NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink className="nav-link" to="/profile">Profile</NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink className="nav-link" to="/demohocmodal">DemoHOC</NavLink>
                    </li>
                    {/* <li className="nav-item ">
                        <NavLink className="nav-link" to="/todolist">TodoListRCC</NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink className="nav-link" to="/todolistrfc">TodoListRFC</NavLink>
                    </li> */}
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Bài tập</a>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <NavLink className="dropdown-item" to="/todolist">TodoListRCC</NavLink>
                            <NavLink className="dropdown-item" to="/todolistrfc">TodoListRFC</NavLink>
                            <NavLink className="dropdown-item" to="/todolistredux">TodoListRedux</NavLink>
                            <NavLink className="dropdown-item" to="/todolistsaga">TodoListSaga</NavLink>
                        </div>
                    </li>

                    <li className="nav-item ">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>

    )
}

