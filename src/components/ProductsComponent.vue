<template>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b border-gray-200">N°</th>
            <th class="py-2 px-4 border-b border-gray-200">Titel</th>
            <th class="py-2 px-4 border-b border-gray-200">Desc</th>
            <th class="py-2 px-4 border-b border-gray-200">Size</th>
            <th class="py-2 px-4 border-b border-gray-200">Color</th>
            <th class="py-2 px-4 border-b border-gray-200">Stock</th>
            <th class="py-2 px-4 border-b border-gray-200">Price</th>

        </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td class="py-2 px-4 border-b border-gray-200">{{ index }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ product.title }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ product.desc }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ product.size }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ product.color }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ product.stock }}</td>
            <td class="py-2 px-4 border-b border-gray-200">{{ product.price }}</td>
            <td class="py-2 px-4 border-b border-gray-200">
              <button @click="updateProduct(index)" class="bg-blue-500 text-white py-1 px-2 rounded">Edit</button>
              <button @click="deleteProduct(product._id)" class="bg-red-500 text-white py-1 px-2 rounded ml-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addProduct" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Ajouter</button>
      <div v-if="toUpdate != -1 || toAdd">
        <form @submit.prevent="submitUpdate()" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <!-- <h2 class="text-2xl mb-4"> Product : {{ products[toUpdate].title }} </h2> -->
          <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Title:</label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" v-model="newTitle" :required="toAdd">
          </div>
          <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="desc">Description:</label>
              <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="desc" type="desc" v-model="newDesc" :required="toAdd">
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="size">Size:</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="size" type="size" v-model="newSize" :required="toAdd">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="color">Color:</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="color" type="couleur" v-model="newColor" :required="toAdd">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="stock">Stock:</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="stock" type="stock" v-model="newStock" :required="toAdd">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="price">Price:</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="price" v-model="newPrice" :required="toAdd">
        </div>
        <div class="items-center justify-between">
            <button v-if="toUpdate != -1" @click="submitUpdate(toUpdate)" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"> Modifier </button>
            <button v-if="toAdd" @click="submitAdd()" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"> Ajouter </button>
            <button @click="cancelUpdate" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Annuler</button>
        </div>
      </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    name: 'ProductsComponent',
    data() {
    return {
      products: [],
      toUpdate: -1,
      toAdd: false,
      newTitle: null,
      newDesc: null,
      newSize: null,
      newColor: null,
      newPrice: null,
      newStock: null,
    };
  },
    methods: {
      async fetchProducts(){
        try {
          const token = localStorage.getItem('accessToken');
          const response = await axios.get('http://localhost:5000/api/products/', {
            headers: {
              token: `bearer ${token}`,
            }
          })
          this.products = response.data;
        } catch (error) {
          console.log(error.response);
        }
      },

      addProduct(){
        this.toAdd = true;
        this.toUpdate = -1;
      },

      updateProduct(index) {
        this.toUpdate = index;
        this.toAdd = false;
      },

      async submitAdd(){
        try {
            const token = localStorage.getItem('accessToken');
            await axios.post('http://localhost:5000/api/products/', {
                title: this.newTitle,
                desc: this.newDesc,
                size: this.newSize,
                color: this.newColor,
                stock: this.newStock,
                price: this.newPrice
            }, 
            {
            headers: {
                token: `bearer ${token}`,
            }
            });
            this.toUpdate = -1;
            this.fetchProducts();
            alert('Product successfuly been added !');
        } catch (error) {
            alert('Adding failed. Please try again.\n' + JSON.stringify(error.response.data));
        }
      },

      async submitUpdate(index){
        try {
          const token = localStorage.getItem('accessToken');
          const updates = {};

          if (this.newTitle) {
            updates.title = this.newTitle;
          }

          if (this.newDesc) {
            updates.desc = this.newDesc;
          }

          if (this.newSize) {
            updates.size = this.newSize;
          }

          if (this.newColor) {
            updates.color = this.newColor;
          }

          if (this.newPrice) {
            updates.price = this.newPrice;
          }

          if (this.newStock) {
            updates.stock = this.newStock;
          }

          if (Object.keys(updates).length > 0) {
            await axios.put('http://localhost:5000/api/products/' + this.products[index]._id, updates, {
              headers: {
                token: `bearer ${token}`,
              }
            });
          }
          this.toUpdate = -1;
          this.fetchProducts();
          alert('Product successfuly been updated !');
        } catch (error) {
          console.log(error.response)
        }
      },

      cancelUpdate(){
        this.toUpdate = -1;
        this.newTitle = null;
        this.newDesc = null;
        this.newSize = null;
        this.newColor = null;
        this.newPrice = null;
        this.newStock = null;
      },

      cancelAdd(){
        this.toAdd = false;
        this.newTitle = null;
        this.newDesc = null;
        this.newSize = null;
        this.newColor = null;
        this.newPrice = null;
        this.newStock = null;
      },

      async deleteProduct(productId) {
        try{
          const token = localStorage.getItem('accessToken')
          await axios.delete('http://localhost:5000/api/products/' + productId, {
            headers: {
              token: `bearer ${token}`,
            }
          });
          alert('Product successfuly been deleted !')
          this.fetchProducts();
        } catch (error) {
          console.log(error.response);
        }
      },
    },
    mounted(){
      this.fetchProducts();
    }
  };
  </script>
  