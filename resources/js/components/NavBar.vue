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
                    <a class="nav-item nav-link dropdown-toggle mr-md-2" href="#" id="bd-versions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-shopping-cart"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="bd-versions">
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item">No Item</a>
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
            this.$store.dispatch('getUser');
        },
        computed: mapGetters({
            isLoggedIn:'isLoggedIn',
            user:'user'
        }),
        methods: {
            logout() {
                this.$store.dispatch('logout');
            }
        }
    }
</script>