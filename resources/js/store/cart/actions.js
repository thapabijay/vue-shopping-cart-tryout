import * as MutationTypes from './mutation-types'

export default {
    initCart({commit}){
        return new Promise((resolve, reject) => {
            let cartObj=localStorage.getItem("laravuecart");
            if(cartObj){
                cartObj=JSON.parse(cartObj);
                commit('INIT',cartObj);
            }
            else{
                commit('INIT',null);
            }
            resolve();
        });
    },
    addToCart({commit},product){
        return new Promise((resolve, reject) => {
            let cartObj=localStorage.getItem("laravuecart");
            if(cartObj){
                cartObj=JSON.parse(cartObj);
                let sameItem=cartObj.find(x=>x.id==product.id);
                if(sameItem){
                    product.quantity=product.quantity+sameItem.quantity;
                    cartObj.splice(cartObj.findIndex(function(i){
                        return i.id === product.id;
                    }), 1,product);
                }
                else{
                    cartObj.push(product);
                }                
            }
            else{
                cartObj=[product];
            }
            localStorage.setItem("laravuecart",JSON.stringify(cartObj));
            commit('INIT',cartObj);
            resolve();
        })
    },
    updateCartItem({ commit },product) {
        return new Promise((resolve, reject) => {
            let cartObj=localStorage.getItem("laravuecart");
            if(cartObj){
                cartObj=JSON.parse(cartObj);
                cartObj.splice(cartObj.findIndex(function(i){
                    return i.id === product.id;
                }), 1,product);
                localStorage.setItem("laravuecart",JSON.stringify(cartObj));
                commit('INIT',cartObj);
            }            
            resolve();
        })
    },
    removeCartItem({commit},p_id){
        p_id=1;
        return new Promise((resolve, reject) => {
            let cartObj=localStorage.getItem("laravuecart");
            if(cartObj){
                cartObj=JSON.parse(cartObj);
                cartObj.splice(cartObj.findIndex(function(i){
                    return i.id === p_id;
                }), 1);
                localStorage.setItem("laravuecart",JSON.stringify(cartObj));
                commit('INIT',cartObj);
            }            
            resolve();
        })
    },
    clearCart({commit}){
        return new Promise((resolve, reject) => {
            localStorage.removeItem("laravuecart");
            commit('INIT',null);
            resolve();
        })
    }
}