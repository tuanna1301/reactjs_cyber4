import axios from 'axios';
import React, { useState, useEffect } from 'react'
import style from './TodoList.css'
export default function TodoListRFC() {
    const [state, setState] = useState({
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    })


    const getTaskList = () => {
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        });
        promise.then((result) => {
            console.log(result)
            //nếu gọi api thành công set state lại của component
            setState({
                ...state,
                taskList: result.data
            })
        });
        promise.catch((err) => {
            console.log(err.respone.data)
        })
    }
    useEffect(() => {
        getTaskList()
    }, [])

    const renderTaskToDo = () => {
        return state.taskList.filter(item => !item.status).map((item, index) => {
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
        return state.taskList.filter(item => item.status).map((item, index) => {
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
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
        promise.then(result => {
            getTaskList()
        });
        promise.catch(errors => {
            alert(errors.response.data)
        })
    }

    const addTask = (e) => {
        e.preventDefault()
        console.log(state.values.taskName)
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: state.values.taskName }
        })
        promise.then((result) => {
            console.log(result.data)
            getTaskList();
        });
        promise.catch((errors) => {
            console.log(errors.response.data)
        });
    }

    const checkTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(result => {
            console.log(result.data)
            getTaskList()
        });
        promise.catch(errors => {
            console.log(errors.response.data)
        })
    }
    const undoTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(result => {
            console.log(result.data)
            getTaskList()
        });
        promise.catch(errors => {
            console.log(errors.response.data)
        })
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
