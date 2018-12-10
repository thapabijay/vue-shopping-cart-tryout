import * as MutationTypes from './mutation-types';
import productService from '../../api/Product';

export default {
    getAllProducts({commit},params){
        return new Promise((resolve, reject) => {
            productService.getProducts(null)
            .then(resp => {
              commit(MutationTypes.ALL_PRODUCTS, resp.data)
              resolve(resp)
            })
            .catch(err => {
              commit(MutationTypes.ALL_PRODUCTS,null)
              reject(err)
            })
          })
    },
    getProductDetail({ commit },id) {
        productService.getProductDetail(id)
            .then(resp => {
              commit(MutationTypes.PRODUCT_DETAILS, resp.data)
              resolve(resp)
            })
            .catch(err => {
              reject(err)
            })
    }
}