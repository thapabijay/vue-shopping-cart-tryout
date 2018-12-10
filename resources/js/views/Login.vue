<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form class="form" autocomplete="off" @submit.prevent="login">
                            <div class="form-group row">
                                <label for="username" class="col-md-4 col-form-label text-md-right">Id</label>
                                <div class="col-md-6">
                                    <input type="text"  name="username" v-model="username" class="form-control" v-validate="'required'" :class="{ 'is-invalid': errors.has('username') }">
                                    <div v-if="errors.has('username')" class="invalid-feedback">{{ errors.first('username') }}</div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input type="password" name="password" v-model="password" class="form-control" v-validate="'required|min:4'" :class="{ 'is-invalid': errors.has('password') }">
                                    <div v-if="errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-6 offset-md-4">                                
                                    <button class="btn btn-sm btn-success">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data:()=>({
            username: '',
            password: ''
    }),

    methods: {
        login(e) {
            this.$validator.validate().then(valid => {
                if (valid) {
                    let data = {
                        username: this.username,
                        password: this.password
                    };

                    this.$store.dispatch('login',data)
                        .then(({data}) => {
                            this.$router.push('/');
                        })
                        .catch(({error}) => {
                            console.log(error);
                        }
                    );
                }
            });
        }
    }
}
</script>