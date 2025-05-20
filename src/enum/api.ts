
const baseURL:string = import.meta.env.PROD?import.meta.env.BASE_URL:import.meta.env.VITE_DEVBASEURL

export const AgentApi = {
    testAgent:`${baseURL}/routerflow`,
    pythonFlow:`${baseURL}/pythonFlow`
}

export const UserApi = {
    insertOne: `${baseURL}/api/v1/user/insertOne`,
    login: `${baseURL}/api/v1/user/login`,
    getInfo: `${baseURL}/api/v1/user/getInfo`,
}

export const SessionApi = {
    insertOne: `${baseURL}/api/v1/session/insertOne`,
    findAll:`${baseURL}/api/v1/session/findAll`,
}

