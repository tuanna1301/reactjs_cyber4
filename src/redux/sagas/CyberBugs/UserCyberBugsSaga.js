
import { delay, put, takeLatest, call } from "@redux-saga/core/effects";
import { cyberbugsService } from "../../../services/CyberBugsService";
import { TOKEN, USER_LOGIN } from "../../../util/constans/settingSystem";
import { USER_SIGNIN_API } from "../../constans/CyberBugs/CyberBug";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constans/LoadingConstans";

function* signInSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);
    //goi api
    try {
        const { data, status } = yield call(() => cyberbugsService.signinCyberBugs(action.userLogin))

        localStorage.setItem(TOKEN, data.content.accessToken)
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))

        console.log(data)
    } catch (err) {
        console.log(err.response.data)
    }
    yield put({
        type: HIDE_LOADING
    })

}

export function* theodoiSignIn() {
    yield takeLatest(USER_SIGNIN_API, signInSaga)
}