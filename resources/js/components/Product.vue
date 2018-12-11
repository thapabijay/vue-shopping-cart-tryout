<template>
    <div class="products">
        <div v-if="error" class="error">
            <p>{{ error }}</p>
        </div>
        <div class="product-wrapper">
            <div class="product-container">
                <div class="itm-container" v-for="item in items" v-bind:key="item.id" @click="goToDetail(item.id)">
                    <div class="itm-name">{{item.name}}</div>
                    <div class="itm-price">{{item.amount}}</div>
                    <a class="btn btn-sm btn-success" @click="addToCart(item.id,$event)">Add to cart</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        data() {
            return {
                meta: null,
                links: {
                    first: null,
                    last: null,
                    next: null,
                    prev: null,
                },
                error: null,
            };
        },
        mounted() {
            this.$store.dispatch('productModule/getAllProducts');
        },
        computed: {
            ...mapGetters({
                items:'productModule/allItems'
            }),
            nextPage() {
                if (! this.meta || this.meta.current_page === this.meta.last_page) {
                    return;
                }

                return this.meta.current_page + 1;
            },
            nextPageClass(){
                if (! this.meta || this.meta.current_page === this.meta.last_page) {
                    return "disabled";
                }

                return "";
            },
            prevPage() {
                if (! this.meta || this.meta.current_page === 1) {
                    return;
                }

                return this.meta.current_page - 1;
            },
            prevPageClass() {
                if (! this.meta || this.meta.current_page === 1) {
                    return "disabled";
                }

                return "";
            },
            paginatonCount() {
                if (! this.meta) {
                    return;
                }

                const { current_page, last_page } = this.meta;

                return `${current_page} of ${last_page}`;
            },
        },
        beforeRouteEnter (to, from, next) {
            getUsers(to.query.page, (err, data) => {
                next(vm => vm.setData(err, data));
            });
        },
        // when route changes and this component is already rendered,
        // the logic will be slightly different.
        beforeRouteUpdate (to, from, next) {
            this.users = this.links = this.meta = null
            getUsers(to.query.page, (err, data) => {
                this.setData(err, data);
                next();
            });
        },
        methods: {
            addToCart(p_id,ev){
                ev.stopPropagation();
                let newItem=this.items.find(x=>x.id==p_id);
                newItem.quantity=1;
                this.$store.dispatch('cartModule/addToCart',newItem);
            },
            goToDetail(p_id){
                this.$router.push({
                    name:'product-detail',
                    params:{id:p_id}
                });
            },
            goToNext() {
                this.$router.push({
                    query: {
                        page: this.nextPage,
                    },
                });
            },
            goToPrev() {
                this.$router.push({
                    name: 'users.index',
                    query: {
                        page: this.prevPage,
                    }
                });
            },
            setData(err, { data: users, links, meta }) {
                if (err) {
                    this.error = err.toString();
                } else {
                    this.users = users;
                    this.links = links;
                    this.meta = meta;
                }
            },
        }
    }
</script>