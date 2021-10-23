/* redux 2 loại action
    Loại 1: action => object (action thường)
    Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác)
*/
import * as TodoListSaga from './TodoListSaga'
import { all, put, takeLatest } from "@redux-saga/core/effects"
import * as CyberBugs from './CyberBugs/UserCyberBugsSaga'

export function* rootSaga() {
    yield all([
        //nghiep vu theo doi cac action saga todolist
        TodoListSaga.theoDoiActionGetTaskApi(),
        TodoListSaga.theoDoiActionAddTaskApi(),

        //nghiep vu CyberBugs
        CyberBugs.theodoiSignIn(),
    ])
}