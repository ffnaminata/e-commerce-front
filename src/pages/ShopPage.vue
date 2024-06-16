<template>
  <div class="shop">
    <NavbarComponent></NavbarComponent>

    <h1 class="text-3xl font-bold mb-6">Shop</h1>

    <!-- Liste des articles -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-48">
      <router-link v-for="product in products" :key="product.id" :to="{ name: 'Furu Diya - Product', params: { productId: product._id } }" class="border p-4">
        <img src="https://i.pinimg.com/736x/c9/91/01/c9910165879d9c3ca99c012dd4dff8c9.jpg" :alt="product.title" class="w-full h-auto mb-2">
        <h2 class="text-xl font-bold">{{ product.title }}</h2>
        <p class="text-gray-700">{{ product.desc }}</p>
        <p class="text-gray-600">Price: {{ product.price }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavbarComponent from '@/components/NavbarComponent.vue';
export default {
  name: 'ShopPage',
  components: {
    NavbarComponent
  },
  data() {
    return {
      products: [], 
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
          const response = await axios.get('http://localhost:5000/api/products/');
          this.products = response.data;
          console.log(this.products);
      } catch (error) {
          this.error = 'Failed to fetch products.';
      }
    },
  },
};
</script>