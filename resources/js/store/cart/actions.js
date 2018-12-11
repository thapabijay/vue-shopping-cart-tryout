import * as MutationTypes from './mutation-types'

export default {
    initCart({commit}){
        return new Promise((resolve, reject) => {
            let cartObj=localStorage.getItem("laravuecart");
            if(cartObj){
                cartObj=JSON.parse(cartObj);
                commit(MutationTypes.INIT,cartObj);
            }
            else{
                commit(MutationTypes.INIT,null);
            }
            resolve();
        });
    },
    addToCart({commit,dispatch},product){
        return new Promise((resolve, reject) => {
            let cartObj=localStorage.getItem("laravuecart");
            product.is_active=true;
            product.total_amount=product.amount;
            if(cartObj){
                cartObj=JSON.parse(cartObj);
                let sameItem=cartObj.find(x=>x.id==product.id);
                if(sameItem){
                    product.quantity=product.quantity+sameItem.quantity;
                    product.total_amount=product.quantity*product.amount;
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
            
            if(product.quantity>product.available_qty){
                reject({msg:'Item qty exceeded'});
            }
            else if(product.quantity<1){
                dispatch('removeCartItem',product.id);
                resolve();
            }
            else{
                localStorage.setItem("laravuecart",JSON.stringify(cartObj));
                commit(MutationTypes.INIT,cartObj);
                resolve();
            }            
        })
    },
    updateCartItem({ commit,dispatch },product) {
        return new Promise((resolve, reject) => {
            let cartObj=localStorage.getItem("laravuecart");
            product.total_amount=product.quantity*product.amount;
            if(cartObj){
                cartObj=JSON.parse(cartObj);
                cartObj.splice(cartObj.findIndex(function(i){
                    return i.id === product.id;
                }), 1,product);
                localStorage.setItem("laravuecart",JSON.stringify(cartObj));
                commit(MutationTypes.INIT,cartObj);
            }
            resolve();
        })
    },
    removeCartItem({commit},p_id){
        return new Promise((resolve, reject) => {
            let cartObj=localStorage.getItem("laravuecart");
            if(cartObj){
                cartObj=JSON.parse(cartObj);
                let indexToRemove=cartObj.findIndex(function(i){
                    return i.id === p_id;
                });
                cartObj.splice(indexToRemove, 1);
                localStorage.setItem("laravuecart",JSON.stringify(cartObj));
                commit(MutationTypes.INIT,cartObj);
            }            
            resolve();
        })
    },
    clearCart({commit}){
        return new Promise((resolve, reject) => {
            localStorage.removeItem("laravuecart");
            commit(MutationTypes.INIT,null);
            resolve();
        })
    }
}