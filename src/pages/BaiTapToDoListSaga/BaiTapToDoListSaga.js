import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GET_TASKLIST_API } from '../../redux/constans/TodoListConstans';
import { ADD_TASK_API } from '../../redux/constans/TodoListConstans'
export default function BaiTapToDoListSaga() {

    const dispatch = useDispatch()
    const { taskList } = useSelector(state => state.TodoListReducer)

    const [state, setState] = useState({
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    })


    const getTaskList = () => {
        dispatch({
            type: GET_TASKLIST_API
        })
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

    }

    const addTask = (e) => {
        e.preventDefault();
        dispatch({
            type: ADD_TASK_API,
            taskName: state.values.taskName
        })
    }
    const undoTask = (taskName) => {

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
    const checkTask = (taskName) => {

    }
    return (

        <div className="card">
            <button className="btn btn-success" onClick={() => {
                dispatch({
                    type: 'getTaskApiAction'
                })
            }}>Dispatch action saga getTaskApi</button>
            <div className="card__header">
                <img src={require('./bg.png').default} alt="hinhAnh" />
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
