import axios from 'axios';

export default{    
    login(user) {
        return axios({url: '/api/login', data: user, method: 'POST' });
    }
}