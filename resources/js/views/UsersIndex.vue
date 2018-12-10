<template>
    <div class="users">
        <div v-if="error" class="error">
            <p>{{ error }}</p>
        </div>

        <table class="table table-bordered" v-if="users">
            <tr>
                <td>Name</td>
                <td>Email</td>    
            </tr>
            <tr v-for="{ id, name, email } in users">
                <td>{{ name }}</td>
                <td>{{ email }}</td>
            </tr>
        </table>

        <div class="pagination">
            <router-link :class="prevPageClass" :to="{ name: 'users.index',query : { page: prevPage }  }">Previous</router-link>
            <button :disabled="! prevPage" @click.prevent="goToPrev"><< Previous</button>
            {{ paginatonCount }}
            <button :disabled="! nextPage" @click.prevent="goToNext">Next >></button>
            <router-link :class="nextPageClass" :to="{ name: 'users.index',query : { page: nextPage }  }">Next</router-link>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

const getUsers = (page, callback) => {
    const params = { page };
    axios
        .get('/api/users', { params })
        .then(response => {
            callback(null, response.data);
        }).catch(error => {
            callback(error, error);
        });
};

export default {
    data() {
        return {
            users: null,
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
    computed: {
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