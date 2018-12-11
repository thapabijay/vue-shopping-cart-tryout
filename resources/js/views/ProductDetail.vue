<template>
  <div class="container">
    <p>{{product_detail.name}}</p>
    <p>{{product_detail.description}}</p>
    <p>$ {{product_detail.amount}}</p>
    <p><a class="btn btn-sm btn-success" @click="addToCart">Add to cart</a></p>
  </div>
</template>

<script>
    import productService from '../api/Product';

    export default {
        data() {
            return {
                product_detail:{}
            };
        },
        mounted() {
            productService.getProductDetail(this.$route.params.id)
                .then(resp=>{                
                    this.product_detail=resp
                });
        },
        methods: {
            addToCart(){
                let newItem=this.product_detail;
                newItem.quantity=1;
                this.$store.dispatch('cartModule/addToCart',newItem);
            },
        }
    }
</script>