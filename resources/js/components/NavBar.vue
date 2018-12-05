<template>
    <nav class="navbar sticky-top navbar-expand-md navbar-dark">
        <a class="navbar-brand" href="/">
            My Vue Page
        </a>
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
        </div>        
    </nav>
</template>

<script>
    export default {        
        
    }
</script>