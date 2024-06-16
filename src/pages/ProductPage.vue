<template>
    <div class="product">
      <NavbarComponent></NavbarComponent>
      <div v-if="product">
        <h1>Product</h1>
        <div class="product-details-container">
          <div class="product-image">
            <img src="https://i.pinimg.com/736x/c9/91/01/c9910165879d9c3ca99c012dd4dff8c9.jpg" :alt="product.title" class="w-full h-auto">
          </div>
          <div class="product-info">
            <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>
            <p class="text-gray-700 mb-4">{{ product.desc }}</p>
            <p class="text-gray-800 font-bold mb-2">Prix: {{ product.price }} €</p>
            <div class="quantity-selector mb-4">
              <label for="quantity" class="font-bold">Quantité:</label>
              <input type="number" id="quantity" v-model="quantity" min="1" class="w-16 h-10 border border-gray-400 rounded-md px-2">
            </div>
            <button @click="addToCart" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Ajouter au Panier</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Chargement...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import NavbarComponent from '@/components/NavbarComponent.vue';
  
  export default {
    name: 'ProductPage',
    components: { NavbarComponent },
    props: ['productId'],
    data() {
      return {
        product: null,
        quantity: 1,
      };
    },
    methods: {
      async fetchProduct() {
          try {
              const response = await axios.get('http://localhost:5000/api/products/find/' + this.productId);
              this.product = response.data;
          } catch (error) {
              console.error('Erreur lors de la récupération du produit:', error);
          }
      },

      async addToCart() {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('accessToken');
        if (!userId || !token){
          this.$router.push({ name: 'Furu Diya - Authentification', params: { formType: 'login' } });
        }
        try {
          await axios.put('http://localhost:5000/api/carts/' + userId, {
              productId: this.product._id,
              quantity: parseInt(this.quantity, 10),
            },
            {
              headers: {
                token: `bearer ${token}`,
              },
            }
          );

          alert('Produit ajouté au panier avec succès !');
        } catch (error) {
          console.error('Error adding to cart:', error.response);
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            this.$router.push({ name: 'Furu Diya - Authentification', params: { formType: 'login' } });
          } else {
            this.message = 'Erreur lors de l\'ajout au panier : ' + (error.response.data.error || error.message);
          }
        }
      }
    },
    mounted() {
        this.fetchProduct();
    },
  };
  </script>
  
  <style scoped>
  .product-details-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40px;
  }
  
  .product-image {
    flex: 1;
  }
  
  .product-info {
    flex: 1;
  }
  
  .quantity-selector label {
    display: block;
    margin-bottom: 6px;
  }
  </style>
  