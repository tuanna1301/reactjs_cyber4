import axios from "axios";
import { GET_TASK_API } from "../constans/TodoListConstans";

//action có 2 loại
//action 1 thực thi ngay làm thay đổi reducer()
//action 2 phải thực hiện xử lí rồi mới gọi action thực thi(async action)
export const getTaskListApi = () => {

    // tiền xử lí dữ liệu, tiền xử lí function

    return async dispatch => {
        try {
            let { data, status, ...res } = await axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
                method: 'GET'
            });
            if (status === 200) {
                dispatch({
                    type: GET_TASK_API,
                    taskList: data
                })
            }
        } catch (err) {
            console.log(err.respone.data)
        }


        // promise.then((result) => {
        //     console.log(result)
        //     dispatch({
        //         type: GET_TASK_API,
        //         taskList: result.data
        //     })
        // });
        // promise.catch((err) => {
        //     console.log(err.respone.data)
        // })
    }
}

export const addTaskApi = (taskName) => {
    return async dispatch => {
        //xử lý trước khi dispatch
        try {
            let { data, status } = await axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'POST',
                data: { taskName: taskName }
            })
            if (status === 200) {
                dispatch(getTaskListApi())
            }
        } catch (err) {
            console.log(err.respone.data)
        }
        // promise.then((result) => {
        //     console.log(result.data)
        //     dispatch(getTaskListApi())
        // });
        // promise.catch((errors) => {
        //     console.log(errors.response.data)
        // });
    }
}
export const delTaskApi = (taskName) => {
    return async dispatch => {
        try {
            let { data, status } = await axios({
                url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
                method: 'DELETE'
            })
            if (status === 200) {
                dispatch(getTaskListApi())
            }
        } catch (err) {
            console.log(err.respone.data)
        }
        // promise.then(result => {
        //     dispatch(getTaskListApi())
        // });
        // promise.catch(errors => {
        //     alert(errors.response.data)
        // })
    }
}
export const checkTaskApi = (taskName) => {
    return async dispatch => {
        try {

            let { data, status } = await axios({
                url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
                method: 'PUT'
            })
            if (status === 200) {
                dispatch(getTaskListApi())
            }
        } catch (err) {
            console.log(err.respone.data)
        }
        // promise.then(result => {
        //     console.log(result.data)
        //     dispatch(getTaskListApi())
        // });
        // promise.catch(errors => {
        //     console.log(errors.response.data)
        // })
    }
}

export const undoTaskApi = (taskName) => {
    return async dispatch => {
        try {
            let { data, status } = await axios({
                url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
                method: 'PUT'
            })
            if (status === 200) {
                dispatch(getTaskListApi())
            }
        } catch (err) {
            console.log(err.respone.data)
        }
        // promise.then(result => {
        //     console.log(result.data)
        //     dispatch(getTaskListApi())
        // });
        // promise.catch(errors => {
        //     console.log(errors.response.data)
        // })
    }
}

