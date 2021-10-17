import { Login } from '@/utils/loginInterface';
import { LOGIN } from '@/utils/routes.json';
import axios from 'axios';

export const state = () => ({
    jwt: String,
    error: String,
})

export const getters = {
    getJWT(state: any): string {
        return state.jwt;
    },
    getError(state: any): string {
        return state.error;
    }
}

export const mutations = {
    setJWT(state: any, jwt: string) {
        state.jwt = jwt;
        localStorage.setItem("jwt", jwt);
    },
    setError(state: any, error: string) {
        state.error = error;
    }
}

export const actions = {
    async login(context: any, payload: Login) {
        const response = await axios.post(LOGIN, 
            {
                email: payload.email,
                password: payload.password
            },
        )

        console.log("RESPOMSE: ")
        console.log(response)

        if(response.data.error) {
            context.commit("setError", response.data.message)
        } else {
            context.commit('setJWT', response.data.data.jwt)
        }
    }
}