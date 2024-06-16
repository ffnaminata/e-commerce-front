<template>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b border-gray-200">N°</th>
            <th class="py-2 px-4 border-b border-gray-200">Name</th>
            <th class="py-2 px-4 border-b border-gray-200">Email</th>
            <th class="py-2 px-4 border-b border-gray-200">Validation</th>
            <th class="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td class="py-2 px-4 border-b border-gray-200">{{index}}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ user.username }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ user.email }}</td>
            <td class="py-2 px-4 border-b border-gray-200"><span v-if="user.isValidated">🟢</span> <span v-else>🔴</span></td>
            <td class="py-2 px-4 border-b border-gray-200">
              <button @click="updateUser(index)" class="bg-blue-500 text-white py-1 px-2 rounded">Edit</button>
              <button @click="deleteUser(user._id, user.username)" class="bg-red-500 text-white py-1 px-2 rounded ml-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="toUpdate != -1">
        <form @submit.prevent="submitUpdate()" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 class="text-2xl mb-4"> User : {{ users[toUpdate].username }} </h2>
          <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username:</label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" v-model="newUsername">
          </div>
          <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email:</label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" v-model="newEmail">
          </div>
          <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2">validation:</label>
              <input type="radio" name="valid" value="true" v-model="newValidation" required> true
              <input type="radio" name="valid" value="false" v-model="newValidation" required> false
          </div>
          <div class="items-center justify-between">
              <button @click="submitUpdate(toUpdate)" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Modifier</button>
              <button @click="cancelUpdate" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Annuler</button>
          </div>
      </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'UsersComponent',
    data() {
    return {
      users: [],
      toUpdate: -1,
      newUsername: null,
      newEmail: null,
      newValidation: null
    };
  },
    methods: {
      async fetchUsers(){
        try {
          const token = localStorage.getItem('accessToken');
          const response = await axios.get('http://localhost:5000/api/users/', {
            headers: {
              token: `bearer ${token}`,
            }
          })
          this.users = response.data;
        } catch (error) {
          console.log(error.response)
        }
      },

      updateUser(index) {
        this.toUpdate = index;
      },

      async submitUpdate(index){
        try {
          const token = localStorage.getItem('accessToken');
          const updates = {};

          if (this.newUsername) {
            updates.username = this.newUsername;
          }

          if (this.newEmail) {
            updates.email = this.newEmail;
          }

          if (this.newValidation) {
            updates.isValidated = this.newValidation;
          }

          if (Object.keys(updates).length > 0) {
            await axios.put('http://localhost:5000/api/users/' + this.users[index]._id, updates, {
              headers: {
                token: `bearer ${token}`,
              }
            });
          }
          this.toUpdate = -1;
          this.fetchUsers();
          alert('User successfuly been updated !');
        } catch (error) {
          console.log(error.response)
        }
      },

      cancelUpdate(){
        this.toUpdate = -1;
        this.newUsername = null;
        this.newEmail = null;
        this.newValidation = null
      },

      async deleteUser(userId, userName) {
        try{
          const token = localStorage.getItem('accessToken')
          await axios.delete('http://localhost:5000/api/users/' + userId, {
            headers: {
              token: `bearer ${token}`,
            }
          });
          alert(userName + ' successfuly been deleted !')
          this.fetchUsers();
        } catch (error) {
          console.log(error.response);
        }
      },
    },
    mounted(){
      this.fetchUsers();
    }
  };
  </script>
  