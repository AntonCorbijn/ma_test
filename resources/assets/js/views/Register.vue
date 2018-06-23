<template>
    <form class="my-5 px-3">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" class="form-control" id="name" v-model="form.name">
                </div>

                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" class="form-control" id="email" v-model="form.email">
                </div>

                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" id="pwd" v-model="form.password">
                </div>

                <div class="form-group">
                    <label for="confirm">Confirm Password:</label>
                    <input type="password" class="form-control" id="confirm" v-model="form.password_confirmation">
                </div>

                <div class="d-flex flex-column">
                    <div class="text-red">
                        <ul>
                            <li v-for="error in errors">{{Array.isArray(error) ? error[0] : error}}</li>
                        </ul>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <button class="btn btn-primary btn-block" @click="signUp">Sign Up</button>
                        <a class="btn btn-light btn-block my-3" @click="signIn">Sign In</a>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: 'register',
        data() {
            return {
                form: {
                    name: null,
                    email: null,
                    password: null,
                    password_confirmation: null
                },
                errors: null
            }
        },
        methods: {
            signUp(e) {
                e.preventDefault();

                this.$store.dispatch('signUp', this.form)
                    .then(response => {
                        if (response.data.status === 'success') {
                            localStorage.removeItem('accessToken');
                            this.$router.push({path: '/login'});
                        } else {
                            this.errors = response.data.errors;
                        }
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors;
                    })
            },
            signIn() {
                this.$router.push('/login');
            }
        }
    }
</script>