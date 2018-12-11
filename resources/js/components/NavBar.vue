<template>
    <nav class="navbar sticky-top navbar-expand-md navbar-dark">
        <router-link class="navbar-brand" :to="{ name: 'home' }">My Vue Page</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>        
        <div class="collapse navbar-collapse" id="navbarMenu">
            <ul class="navbar-nav mr-auto">
               
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'hello' }">Hello World</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'users.index' }">Users</router-link>
                </li>
            </ul>
            <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
                <li class="nav-item dropdown" v-if="this.isLoggedIn">
                    <a class="nav-item nav-link dropdown-toggle mr-md-2" href="#" id="bd-versions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ this.user.name }}
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions">
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" v-if="isLoggedIn" @click="logout">Logout</a>                                        
                    </div>
                </li>
                <li class="nav-item" v-else>
                    <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-item nav-link dropdown-toggle mr-md-2" href="#" id="cart-list" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-shopping-cart"></i> {{cartItemCount}}
                    </a>
                    <div v-if="!cartItems || cartItems.length==0" class="dropdown-menu dropdown-menu-right" aria-labelledby="cart-list">
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item">No Item</a>
                    </div>
                    <div v-else class="dropdown-menu dropdown-menu-right cart-drp" aria-labelledby="cart-list" @click="preventClose($event)">
                        <a class="btn btn-xs btn-danger float-right" @click="clearCart"><i class="fas fa-times"></i> Clear Cart</a>
                        <div class="dropdown-divider"></div>
                        <table class="table table-sm table-condensed table-striped table-nowrap table-bordered">
                            <tr>
                                <td>Item</td>
                                <td>Qty</td>
                                <td>Amount</td>
                                <td></td>
                            </tr>
                            <tr v-for="{id,name,quantity,amount,total_amount,img_url} in cartItems">
                                <td>{{name}}</td>
                                <td><i class="fas fa-minus-circle" @click="updateItemQuantity(id,-1)"></i> {{quantity}} <i class="fas fa-plus-circle" @click="updateItemQuantity(id,1)"></i></td>
                                <td class="text-right">$ {{total_amount| money}}</td>
                                <td><i class="fas fa-trash-alt" @click="removeCartItem(id)"></i></td>
                            </tr>
                        </table>
                        <div class="dropdown-divider"></div>
                        <a class="btn btn-xs btn-success float-right">Proceed to checkout</a>                       
                    </div>
                </li>
            </ul>
        </div>        
    </nav>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {        
        data() {
            return {
            };
        },

        mounted() {
            this.$store.dispatch('authModule/getUser');
            this.$store.dispatch('cartModule/initCart');
            
        },
        computed: mapGetters({
            isLoggedIn:'authModule/isLoggedIn',
            user:'authModule/user',
            cartItems:'cartModule/cartItems',
            cartItemCount:'cartModule/itemCount',
            cartTotalAmount:'cartModule/totalAmount'
        }),
        methods: {
            ...mapActions({
                'removeCartItem':'cartModule/removeCartItem',
                'clearCart':'cartModule/clearCart'
            }),
            updateItemQuantity(p_id,qty){
                let newItem={...Object.assign(this.cartItems.find(x=>x.id==p_id),{})};
                newItem.quantity=qty;
                this.$store.dispatch('cartModule/addToCart',newItem);
            },
            preventClose(ev){
                ev.stopPropagation();
            },
            logout() {
                this.$store.dispatch('logout');
            }
        }
    }
</script>