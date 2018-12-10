import * as MutationTypes from './mutation-types'

export default {
    [MutationTypes.INIT] (state,products) {
        if(!products){
            state.itemCount= 0,
            state.cartItems=[],
            state.totalAmount=0
        }
        else{
            state.itemCount= products.reduce((total, p) => {
                return total + p.quantity;
            }, 0);
            state.cartItems=products;
            state.totalAmount=products.reduce((total, p) => {
                return total + (p.price * p.quantity);
            }, 0);
        }
    }
}