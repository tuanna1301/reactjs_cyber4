import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import style from './TodoList.css'
import { GET_TASK_API } from '../../redux/constans/TodoListConstans';
import { addTaskApi, checkTaskApi, delTaskApi, getTaskListApi, undoTaskApi } from '../../redux/actions/TodoListActions';
export default function TodoListRedux() {

    const { taskList } = useSelector(state => state.TodoListReducer)
    const dispatch = useDispatch()

    const [state, setState] = useState({
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    })


    const getTaskList = () => {
        dispatch(getTaskListApi())
    }
    useEffect(() => {
        getTaskList()
    }, [])

    const renderTaskToDo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type="button" onClick={() => {
                        checkTask(item.taskName)
                    }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }
    const renderTaskDone = () => {
        return taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type="button" onClick={() => {
                        undoTask(item.taskName)
                    }}>
                        <i className="far fa-undo" />
                        <i className="fas fa-undo" />
                    </button>
                </div>
            </li>
        })
    }
    //hàm xử lí xóa task
    const delTask = (taskName) => {
        dispatch(delTaskApi(taskName))
    }

    const addTask = (e) => {
        e.preventDefault()
        console.log(state.values.taskName)
        //Xử lý nhận dữ liệu từ người dùng => gọi action addTaskApi
        dispatch(addTaskApi(state.values.taskName))
    }

    const checkTask = (taskName) => {
        dispatch(checkTaskApi(taskName))
    }
    const undoTask = (taskName) => {
        dispatch(undoTaskApi(taskName))
    }
    const handleChange = (e) => {
        let { value, name } = e.target;

        let newValues = { ...state.values }
        newValues = { ...newValues, [name]: value }

        let newErrors = { ...state.errors }
        let regexString = /^[a-z A-Z]+$/
        if (!regexString.test(value) || value.trim() === "") {
            newErrors[name] = name + 'invalid !'
        } else {
            newErrors[name] = ''
        }

        setState({
            ...state,
            values: newValues,
            errors: newErrors
        })
    }
    return (

        <div className="card">
            <div className="card__header">
                <img src="./img/X2oObC4.png" />
            </div>
            {/* <h2>hello!</h2> */}
            <form className="card__body" onSubmit={addTask}>
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>September 9,2020</p>
                    </div>
                    <div className="card__add">
                        <input name="taskName" onChange={handleChange} id="newTask" type="text" placeholder="Enter an activity..." />
                        <button id="addItem" onClick={addTask}>
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <div className="card__todo">
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {renderTaskToDo()}
                        </ul>
                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                            {renderTaskDone()}
                        </ul>
                    </div>
                </div>
            </form>
        </div>

    )
}
