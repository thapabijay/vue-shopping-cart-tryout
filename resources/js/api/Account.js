import axios from 'axios';

export default{    
    login(user) {
        return new Promise((resolve, reject) => {
            if(user.username=='admin' && user.password=='admin'){
                resolve({data:{token:'jkhlkjHJKGHYUGY35KL+h',user:{name:'Admin'}}})
            }
            else{
                reject(new Error('invalid username/password'));
            }
        });
        //return axios({url: '/api/login', data: user, method: 'POST' });
    }
}