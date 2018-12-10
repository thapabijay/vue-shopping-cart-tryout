import * as MutationTypes from './mutation-types'

export default {
    [MutationTypes.ALL_PRODUCTS] (state,items) {
        state.all = items;
    },
    [MutationTypes.PRODUCT_DETAILS] (state,item) {
        state.product_detail=item;
    }
}