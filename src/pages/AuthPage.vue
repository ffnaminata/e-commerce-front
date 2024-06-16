<template>
  <div class="authentification">
    <NavbarComponent></NavbarComponent>
    <div v-if="formType === 'register'" class="register"> 
        <div class="flex justify-center items-center h-screen">
            <div class="w-full max-w-md">
                <form @submit.prevent="register" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 class="text-2xl mb-4">Register</h2>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username:</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="usernameRegister" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email:</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" v-model="emailRegister" required>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password:</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" v-model="passwordRegister" required>
                    </div>
                    <span >Already register ? Click <a href="http://localhost:8080/authentification/login" class="text-blue-500">here</a></span>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div v-if="formType === 'login'" class="login"> 
        <div class="flex justify-center items-center h-screen">
            <div class="w-full max-w-md">
                <form @submit.prevent="login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 class="text-2xl mb-4">Login</h2>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username:</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="usernameLogin" required>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password:</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" v-model="passwordLogin" required>
                    </div>
                    <span >Forgot password ? Click <a href="http://localhost:8080/authentification/forgot-password" class="text-blue-500">here</a></span> <br>
                    <span >No account ? Click <a href="http://localhost:8080/authentification/register" class="text-blue-500">here</a></span>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div v-if="formType === 'forgot-password'" class="forgot-password">
        <div class="flex justify-center items-center h-screen">
            <div class="w-full max-w-md">
                <form @submit.prevent="forgotPassword" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 class="text-2xl mb-4">Forgot Password</h2>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email:</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="emailForgotPassword" required>
                    </div>
                    <span >Return to <a href="http://localhost:8080/authentification/login" class="text-blue-500">login</a> or <a href="http://localhost:8080/authentification/register" class="text-blue-500">register</a></span>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Send email</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div v-if="formType === 'reset-password'" class="reset-password">
        <div class="flex justify-center items-center h-screen">
            <div class="w-full max-w-md">
                <form @submit.prevent="resetPassword" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 class="text-2xl mb-4">Reset Password</h2>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">New password:</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" v-model="passwordResetPassword1" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Confirm new password:</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" v-model="passwordResetPassword2" required>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Change password</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import NavbarComponent from "../components/NavbarComponent.vue";
export default {
    name: 'AuthPage',
    components: { 
        NavbarComponent,
    },
    props: ['formType'],
    data() {
        return {
            usernameRegister: '',
            emailRegister: '',
            passwordRegister: '',
            usernameLogin: '',
            passwordLogin: '',
            emailForgotPassword: '',
            passwordResetPassword1: '',
            passwordResetPassword2: ''
        };
    },
    methods: {
        async register() {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/register', {
                    username: this.usernameRegister,
                    email: this.emailRegister,
                    password: this.passwordRegister
                });
                console.log(response.data);
                alert('Check your emails to validate your account');
                this.$router.push({ name: 'Furu Diya - Authentification', params: { formType: 'login' } });
            } catch (error) {
                console.error('Error:', error.response);
                alert('Registration failed. Please try again.' + JSON.stringify(error.response.data));
            }
        },

        async login(){
            try {
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                    username: this.usernameLogin,
                    password: this.passwordLogin
                });
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('userId', response.data._id);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('isAdmin', response.data.isAdmin);
                if (response.data.isAdmin) {
                    this.$router.push({ name: 'Furu Diya - Dashboard', params: { tab: 'users'}});
                } else {
                    this.$router.push({ name: 'Furu Diya - Home'});
                }
            } catch (error) {
                console.error('Error:', error.message);
            }
        },

        async forgotPassword(){
            try{
                await axios.post('http://localhost:5000/api/auth/forgot-password', {
                    email: this.emailForgotPassword
                });
                alert('Check your emails to reset your password');
                this.$router.push({ name: 'Furu Diya - Authentification', params: { formType: 'login' } });
            } catch (error) {
                console.error('Error:', error.response);
                alert('Forgot password failed. Please try again.\n' + JSON.stringify(error.response.data));
            }
        },

        async resetPassword() {
            const token = this.$route.query.token;
            try {
                if (this.passwordResetPassword1 != this.passwordResetPassword2){
                    alert('The passwords do not match. Please try again.');
                    return;
                }
                await axios.post(`http://localhost:5000/api/auth/reset-password?token=${token}`, {
                     newPassword: this.passwordResetPassword1 
                });
                alert('Your password successfuly changed !');
                this.$router.push({ name: 'Furu Diya - Authentification', params: { formType: 'login' } });
            } catch (error) {
                console.error('Error:', error.response);
                alert('Forgot password failed. Please try again.\n' + JSON.stringify(error.response.data));
            }
        }
    },
    computed: {
        
    },
    mounted() {
        
    },
};
</script>

<style scoped>
</style>