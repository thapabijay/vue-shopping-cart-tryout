<template>
    <div class="">        
        <nav-bar/>

        <div class=" section">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar";

    export default {        
        components:{
            NavBar
        }
    }
</script>