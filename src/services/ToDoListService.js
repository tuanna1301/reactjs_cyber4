import axios from "axios"
import { DOMAIN } from "../util/constans/settingSystem";

export class ToDoListService {
    constructor() {

    }
    getTaskApi = () => {

        return axios({
            url: `${DOMAIN}/ToDoList/GetAllTask`,
            method: 'GET'
        })

    }

    addTaskApi = (taskName) => {
        return axios({
            url: `${DOMAIN}/ToDoList/addTask`,
            method: 'POST',
            data: {
                taskName: taskName
            }
        })
    }
}
export const toDoListService = new ToDoListService();