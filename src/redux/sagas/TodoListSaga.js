import { call, put, takeLatest, delay } from "@redux-saga/core/effects"
import axios from "axios"
import { ADD_TASK_API, GET_TASKLIST_API, GET_TASK_API } from "../constans/TodoListConstans"
import { toDoListService } from '../../services/ToDoListService'
import { STATUS_CODE } from "../../util/constans/settingSystem"
import { DISPLAY_LOADING, HIDE_LOADING } from "../constans/LoadingConstans"

function* getTaskApi(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    try {

        let { data, status } = yield call(toDoListService.getTaskApi)
        yield delay(1000)

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_API,
                taskList: data
            })
        }

    } catch (err) {
        console.log(err.respone.data)
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiActionGetTaskApi() {
    yield takeLatest(GET_TASKLIST_API, getTaskApi)
}

function* addTaskApiAction(action) {
    try {
        let { data, status } = yield call(() => {
            return toDoListService.addTaskApi(action.taskName)
        })
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API
            })
        }

    } catch (err) {
        console.log('err')
    }

}

export function* theoDoiActionAddTaskApi() {
    yield takeLatest(ADD_TASK_API, addTaskApiAction)
}
