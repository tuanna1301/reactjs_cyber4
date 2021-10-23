import { USER_SIGNIN_API } from "../constans/CyberBugs/CyberBug";

export const signinCyberbugAction = (email, password) => {
    return {
        type: USER_SIGNIN_API,
        userLogin: {
            email: email,
            password: password
        }
    }
}


