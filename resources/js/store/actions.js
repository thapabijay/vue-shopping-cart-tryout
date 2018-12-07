import * as MutationTypes from './mutation-types'

export default {
    login({commit},user){
        return new Promise((resolve, reject) => {
            commit(MutationTypes.AUTH_REQUEST)
            axios({url: '/api/login', data: user, method: 'POST' })
            .then(resp => {
              const token = resp.data.token
              localStorage.setItem("larvue",JSON.stringify(resp.data));
              axios.defaults.headers.common['Authorization'] = token
              commit(MutationTypes.AUTH_SUCCESS, resp.data)
              resolve(resp)
            })
            .catch(err => {
              commit(MutationTypes.AUTH_ERROR)
              localStorage.removeItem('larvue')
              reject(err)
            })
          })
        //localStorage.setItem("larvue",JSON.stringify(obj));
        //commit(MutationTypes.LOGIN,obj);
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit(MutationTypes.LOGOUT);
            localStorage.removeItem('larvue')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    },
    checkLogin({commit}){
        let loginObj=localStorage.getItem("larvue");
        if(loginObj){
            loginObj=JSON.parse(loginObj);
            axios.defaults.headers.common['Authorization'] = loginObj.token;
              commit(MutationTypes.AUTH_SUCCESS, loginObj)
        }
        else{
            commit('GET_TOKEN',null);
        }
    },
    getUser({commit}){
        let loginObj=localStorage.getItem("larvue");
        if(loginObj){
            loginObj=JSON.parse(loginObj);
            commit('GET_USER',loginObj.user);
        }
        else{
            commit('GET_USER',null);
        }
    },
    getToken({commit}){
        let loginObj=localStorage.getItem("larvue");
        if(loginObj){
            loginObj=JSON.parse(loginObj);
            commit('GET_TOKEN',loginObj.token);
        }
        else{
            commit('GET_TOKEN',null);
        }
    }
}