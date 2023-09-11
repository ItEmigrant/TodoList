import axios, {AxiosResponse} from "axios";
import {FormValuesType} from "../../features/Login/Login";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const auth = {
    postLogin(data: FormValuesType) {
        return instance.post<null, AxiosResponse<LoginResponseType<{ userID: number }>>, FormValuesType>(`/auth/login`, data)
    },
}

//types
export type LoginResponseType<T = {}> = {
    resultCode: number,
    messages: string[],
    data: { item: T }
};
