<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
    const default_layout = "default";
    export default {
    computed: {
            layout() {
                return (this.$route.meta.layout || default_layout) + "-layout";
            }
        },
        created() {
            let store=this.$store;
            store.dispatch('checkLogin');
            this.$http.interceptors.response.use(undefined, function (err) {
                return new Promise(function (resolve, reject) {
                    if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                        store.dispatch('logout')
                    }
                    reject(err);
                });
            });
        },
        updated() {
            // something defined here whatever the this.$route.path
            //console.log(this.$route, this.$route.meta.layout);
        }
    };
</script>