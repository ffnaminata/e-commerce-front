<template>
    <NavbarComponent></NavbarComponent>
    <div class="container mx-auto mt-10">
      <h2 class="text-2xl font-bold mb-4">Checkout</h2>
      <form @submit.prevent="submitForm" class="max-w-md">
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium text-gray-700">Prénom:</label>
          <input type="text" id="firstName" v-model="firstName" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
          <label for="lastName" class="block text-sm font-medium text-gray-700">Nom:</label>
          <input type="text" id="lastName" v-model="lastName" required class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
        </div>
        <div class="mb-4">
            <h1 for="address" class="block text-sm font-medium text-gray-700">Adresse:</h1>
            <div v-if="address.length != 0">
                <button>{{address}}</button>
            </div>
            <div v-else> Vous n'avez pas d'adresse enregistrer</div>
        </div>
        <button @click="addAdress = true">Ajouter/Modifier une adresse</button>
        <div class="mb-4" v-if="addAdress">
          <label for="address" class="block text-sm font-medium text-gray-700">New adress:</label>
          <AddressComponent @selected="updateUser" ></AddressComponent>

        </div>
        <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Valider la commande</button>
      </form>
    </div>
  </template>
  
<script>
import axios from 'axios';
import AddressComponent from './AddressComponent.vue';
import NavbarComponent from '@/components/NavbarComponent.vue';

export default {
    name: 'CheckoutPage',
    components: { 
        AddressComponent,
        NavbarComponent
     },
    data() {
        return {
        firstName: '',
        lastName: '',
        address: '',
        addAdress: false
        };
    },
    async created() {
        this.fetchAddress();
    },
    methods: {
        async fetchAddress() {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('accessToken');
                const response = await axios.get(`http://localhost:5000/api/users/find/${userId}`, {
                    headers: {
                        token: `Bearer ${token}`
                    }
                });
                if (response.data.address) {
                    this.address = response.data.address;
                }
                
            } catch (error) {
                console.error('Error fetching user address:', error);
            }
        },

        async submitForm() {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('accessToken');
            const payload = {
                firstName: this.firstName,
                lastName: this.lastName,
                addressId: this.address
            };
            try {
                await axios.post(`http://localhost:5000/api/checkout/${userId}`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                alert('Commande validée avec succès !');
                // Redirection vers une autre page après validation de la commande
            } catch (error) {
                console.error('Error submitting checkout form:', error);
                alert('Erreur lors de la validation de la commande.');
            }
        },

        async updateUser() {
                try {
                    const userId = localStorage.getItem('userId');
                    const token = localStorage.getItem('accessToken');
                    const update = {
                        address: this.address
                    }
                    await axios.put("http://localhost:5000/api/users/" + userId, update, {
                        headers: {
                            token: `Bearer ${token}`
                        }
                    });
                    
                    this.fetchAddress();
                    alert('Adresse modifier !');
                    console.log(this.address);

                } catch (error) {
                    console.error('Error updating user', error);
                    alert('Erreur lors de la modification.');
                }
        },
    },
};
</script>
