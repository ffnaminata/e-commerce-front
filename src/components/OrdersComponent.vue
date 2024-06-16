<template>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b border-gray-200">N°</th>
            <th class="py-2 px-4 border-b border-gray-200">Créer le</th>
            <th class="py-2 px-4 border-b border-gray-200">Acheteur</th>
            <th class="py-2 px-4 border-b border-gray-200">Total</th>
            <th class="py-2 px-4 border-b border-gray-200">Etat</th>
            <th class="py-2 px-4 border-b border-gray-200">Actions</th>

          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="index">
            <td class="py-2 px-4 border-b border-gray-200">{{ index }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ order.createdAt }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ order._id }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ order.amount }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ order.status }}</td>
            <td class="py-2 px-4 border-b border-gray-200">
              <button @click="updateOrder(index)" class="bg-blue-500 text-white py-1 px-2 rounded">Edit</button>
              <button @click="deleteOrder(order._id)" class="bg-red-500 text-white py-1 px-2 rounded ml-2">Delete</button>
            </td> 
          </tr>
        </tbody>
      </table>
      <div v-if="toUpdate != -1">
        <form @submit.prevent="submitUpdate()" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 class="text-2xl mb-4"> Order n°{{ toUpdate }} : {{ orders[toUpdate]._id }} </h2>
            <label>Actualiser le status de la commande:</label>

            <select v-model="newStatus">
                <option v-for="(statu, index) in status" :key="index" :value="statu">{{ statu }}</option>
            </select>

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
    name: 'OrdersComponent',
    data() {
    return {
      orders: [],
      toUpdate: -1,
      newStatus: null,
      status: ['Pending', 'Processing', 'Delivered', 'Canceled', 'Returned', 'Refunded' ]
    };
  },
    methods: {
      async fetchOrders(){
        try {
          const token = localStorage.getItem('accessToken');
          const response = await axios.get('http://localhost:5000/api/orders/', {
            headers: {
              token: `bearer ${token}`,
            }
          });
          this.orders = response.data;
        } catch (error) {
          console.log(error.response)
        }
      },

      updateOrder(index) {
        this.toUpdate = index;
      },

      async submitUpdate(index){
        try {
          const token = localStorage.getItem('accessToken');
          const updates = {};

          if (this.newStatus) {
            updates.status = this.newStatus;
          }

          if (Object.keys(updates).length > 0) {
            await axios.put('http://localhost:5000/api/orders/' + this.orders[index]._id, updates, {
              headers: {
                token: `bearer ${token}`,
              }
            });
          }

          this.toUpdate = -1;
          this.fetchOrders();
          alert('Orders successfuly been updated !');
        } catch (error) {
          console.log(error.response)
        }
      },

      cancelUpdate(){
        this.toUpdate = -1;
        this.newStatus = null;
      },

      async deleteOrder(orderId) {
        try{
          const token = localStorage.getItem('accessToken')
          await axios.delete('http://localhost:5000/api/orders/' + orderId, {
            headers: {
              token: `bearer ${token}`,
            }
          });
          alert('Order successfuly been deleted !')
          this.fetchOrders();
        } catch (error) {
          console.log(error.response);
        }
      },
    },
    mounted(){
      this.fetchOrders();
    }
  };
  </script>
  