import { Axios } from "axios"
import { DOMAIN_CYBERBUGS } from "../util/constans/settingSystem"

export const cyberbugsService = {
    signinCyberBugs: (userLogin) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/users/signin`,
            method: 'POST',
            data: userLogin
        })
    }
}