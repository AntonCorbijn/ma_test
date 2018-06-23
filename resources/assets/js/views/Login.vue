<template>
    <form class="my-5 px-3">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="email" class="form-control" id="username" v-model="form.username">
                </div>

                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" id="pwd" v-model="form.password">
                </div>

                <div class="d-flex flex-column">
                    <div class="text-red">
                        <ul>
                            <li v-for="error in errors">{{Array.isArray(error) ? error[0] : error}}</li>
                        </ul>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <button class="btn btn-primary btn-block" @click="signIn">Sign In</button>
                        <a class="btn btn-light btn-block my-3" @click="signUp">Sign Up</a>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                form: {
                    username: null,
                    password: null
                },
                errors: null
            }
        },
        mounted() {
            const accessToken = localStorage.getItem('accessToken');

            if (accessToken !== null) {
                this.$router.push('/');
            }
        },
        methods: {
            signIn(e) {
                e.preventDefault();

                this.$store.dispatch('signIn', this.form)
                    .then(response => {
                        if (response.data.status === 'success') {
                            localStorage.setItem('accessToken', response.data.content.access_token);
                            this.$router.replace({path: '/curators-pick'});
                        } else {
                            this.errors = response.data.errors;
                        }
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors;
                    })
            },
            signUp() {
                this.$router.replace({path: '/register'});
            }
        }
    }
</script>