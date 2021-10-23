import React, { Component } from 'react';
import style from './TodoList.css'
import axios from 'axios';

class TodoList extends Component {
    state = {
        taskList: [],
        values: {
            taskName: ''
        },
        errors: {
            taskName: ''
        }
    }

    getTaskList = () => {
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        });
        promise.then((result) => {
            console.log(result)
            //nếu gọi api thành công set state lại của component
            this.setState({
                taskList: result.data
            })
        });
        promise.catch((err) => {
            console.log(err.respone.data)
        })
    }
    componentDidMount = () => {
        this.getTaskList()
    }
    renderTaskToDo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        this.delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type="button" onClick={() => {
                        this.checkTask(item.taskName)
                    }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }
    renderTaskDone = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type="button" onClick={() => {
                        this.delTask(item.taskName)
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type="button" onClick={() => {
                        this.undoTask(item.taskName)
                    }}>
                        <i className="far fa-undo" />
                        <i className="fas fa-undo" />
                    </button>
                </div>
            </li>
        })
    }
    //hàm xử lí xóa task
    delTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
        promise.then(result => {
            this.getTaskList()
        });
        promise.catch(errors => {
            alert(errors.response.data)
        })
    }

    addTask = (e) => {
        e.preventDefault()
        console.log(this.state.values.taskName)
        let promise = axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: this.state.values.taskName }
        })
        promise.then((result) => {
            console.log(result.data)
            this.getTaskList();
        });
        promise.catch((errors) => {
            console.log(errors.response.data)
        });
    }

    checkTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(result => {
            console.log(result.data)
            this.getTaskList()
        });
        promise.catch(errors => {
            console.log(errors.response.data)
        })
    }
    undoTask = (taskName) => {
        let promise = axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(result => {
            console.log(result.data)
            this.getTaskList()
        });
        promise.catch(errors => {
            console.log(errors.response.data)
        })
    }
    handleChange = (e) => {
        let { value, name } = e.target;

        let newValues = { ...this.state.values }
        newValues = { ...newValues, [name]: value }

        let newErrors = { ...this.state.errors }
        let regexString = /^[a-z A-Z]+$/
        if (!regexString.test(value) || value.trim() === "") {
            newErrors[name] = name + 'invalid !'
        } else {
            newErrors[name] = ''
        }

        this.setState({
            ...this.state,
            values: newValues,
            errors: newErrors
        })
    }

    render() {
        return (
            <form onClick={this.addTask}>
                <div className="card">
                    <div className="card__header">
                        <img src={require('./bg.png')} alt="anh" />
                    </div>
                    {/* <h2>hello!</h2> */}
                    <div className="card__body">
                        <div className="card__content">
                            <div className="card__title">
                                <h2>My Tasks</h2>
                                <p>September 9,2020</p>
                            </div>
                            <div className="card__add">
                                <input onChange={this.handleChange} name="taskName" id="newTask" type="text" placeholder="Enter an activity..." />

                                <button id="addItem" onClick={this.addTask}>
                                    <i className="fa fa-plus" />
                                </button>
                            </div>
                            <p className="text text-danger">{this.state.errors.taskName}</p>
                            <div className="card__todo">
                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">
                                    {this.renderTaskToDo()}
                                </ul>
                                {/* Completed tasks */}
                                <ul className="todo" id="completed">
                                    {this.renderTaskDone()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default TodoList;