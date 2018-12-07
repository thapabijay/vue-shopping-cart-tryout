import * as MutationTypes from './mutation-types'

export default {
    [MutationTypes.AUTH_REQUEST] (state) {
        state.pending = true;
        state.isLoggedIn = false;        
    },
    [MutationTypes.AUTH_SUCCESS] (state,obj) {
        state.isLoggedIn = true;
        state.pending = false;
        state.token=obj.token;
        state.user=obj.user;
    },
    [MutationTypes.AUTH_ERROR] (state) {
        state.isLoggedIn = true;
        state.pending = false;
        state.user=obj.user;
    },
    [MutationTypes.LOGOUT](state) {
        state.isLoggedIn = false;
        state.user=null;
        state.token=null;
    },
    [MutationTypes.GET_USER](state,user) {
        state.user = user;
    },
    [MutationTypes.GET_TOKEN](state,token) {
        state.token = token;
    }
}