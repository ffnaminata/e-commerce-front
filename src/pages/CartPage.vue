<template>
  <div class="cart">
    <NavbarComponent></NavbarComponent>
    <h1 class="text-3xl font-bold mb-6">Votre Panier</h1>
    <div v-if="cart.products.length === 0" class="text-center text-gray-600"> 
      Votre panier est vide.
    </div>
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="(item, index) in cart.products" :key="index" class="border p-4">
          <img src="https://i.pinimg.com/736x/c9/91/01/c9910165879d9c3ca99c012dd4dff8c9.jpg" :alt="item.productId.title" class="w-full h-auto mb-2"> 
          <h2 class="text-xl font-bold">{{ item.productId.title }}</h2>
          <p class="text-gray-700">{{ item.productId.desc }}</p>
          <p class="text-gray-600">Prix: {{ item.productId.price }} €</p>

          <div class="quantity-selector mb-4">
            <label for="quantity" class="font-bold">Quantité:</label>
            <div class="flex items-center">
              <button @click="decrement(item.productId._id)" class="bg-gray-300 text-gray-700 py-1 px-3 rounded-l">-</button>
              <span class="w-16 h-10 border-t border-b border-gray-400 text-center">{{ item.quantity }}</span>
              <button @click="increment(item.productId._id)" class="bg-gray-300 text-gray-700 py-1 px-3 rounded-r">+</button>
            </div>
          </div>
          <button @click="removeFromCart(item.productId._id)" class="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Supprimer</button>
        </div>
      </div>
      <div class="mt-6 text-right">
        <h2 class="text-2xl font-bold">Total: {{ cartSummary.total_price }} €</h2>
        <p class="text-gray-600">Nombre d'articles: {{ cartSummary.nbr_product }}</p>
        <button @click="checkout" class="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mt-4">Passer à la caisse</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import axios from 'axios';

export default {
  name: 'CartPage',
  components: { NavbarComponent },
  data() {
    return {
      cart: {
        products: []
      },
      cartSummary: {
        nbr_product: 0,
        total_price: 0
      }
    };
  },
  methods: {
    async fetchCart() {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('accessToken');

        const response = await axios.get('http://localhost:5000/api/carts/find/' + userId, {
          headers: {
            token: `bearer ${token}`,
          },
        });

        console.log(response.data);

        this.cart = response.data
        this.updateCartData();
        
      } catch (error) {
        console.error('Error fetching cart:', error);
        alert('Une erreur est survenue lors de la récupération du panier.');
      }
    },

    async increment(productId) {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('accessToken');

        const response = await axios.patch("http://localhost:5000/api/carts/" + userId + '/' + productId + '/increment' , {
          headers: {
            token: `bearer ${token}`,
          },
        });

        console.log(response);
        
        this.updateCartData();
        this.fetchCart();

      } catch (error) {
        console.error('Error incrementing product of cart:', error);
        alert('Une erreur est survenue lors de la maj du panier.');
      }
    },
    
    async increment1(productId) {
      try {
        const userId = localStorage.getItem('userId');
        console.log(userId);
        const token = localStorage.getItem('accessToken');
        console.log(token);

        const response = await axios.patch(`http://localhost:5000/api/carts/${userId}/${productId}/increment`, {
          headers: {
            token: `bearer ${token}`,
          },
        });

        console.log(response.data)

        this.updateCartData();
        this.fetchCart();

      } catch (error) {
        console.error('Error incrementing product quantity:', error);
        alert('Une erreur est survenue lors de la mise à jour de la quantité.');
      }
    },

    async decrement(productId) {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('accessToken');

        const response = await axios.patch(`http://localhost:5000/api/carts/${userId}/${productId}/decrement`, {
          headers: {
            token: `bearer ${token}`,
          },
        });
        console.log(response.data)
        
        this.updateCartData();
        this.fetchCart();

      } catch (error) {
        console.error('Error incrementing product quantity:', error);
        alert('Une erreur est survenue lors de la mise à jour de la quantité.');
      }
    },

    async removeFromCart(productId) {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('accessToken');

        const response = await axios.delete(`http://localhost:5000/api/carts/${userId}/${productId}`, {
          headers: {
            token: `bearer ${token}`,
          },
        });

        console.log(response.data);
        
        this.updateCartData();
        this.fetchCart();

      } catch (error) {
        console.error('Error removing product from cart:', error);
        alert('Une erreur est survenue lors de la suppression du produit.');
      }
    },

    async updateCartData(){
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('accessToken');
      try{
        const response = await axios.get('http://localhost:5000/api/carts/' + userId, {
          headers: {
            token: `bearer ${token}`,
          },
        });
        this.cartSummary = response.data ;
      } catch(error) {
        console.error(error);
      }
    },

    async checkout() {
      try {
        const orderId = await this.createOrder();
        console.log(orderId);
        const price = parseFloat(this.cartSummary.total_price) * 100;
        const response = await axios.post('http://localhost:5000/api/checkout/create-checkout-session', {
          price_data_amount: price,
          userId: localStorage.getItem('userId'),
          accessToken: localStorage.getItem('accessToken'),
          order: orderId
        },{
              headers: {
                Authorization: 'Bearer pk_test_51PKo3M097Htwic2gsYxWjstwmQXm1pUolUJTWvOHvBIrMofrSuRjg97XvWQW24AWrscL7m1tEGIiarQaDOXRadix00VQxQUJaz',
              },
            });
        window.location.href = response.data.url; 
      } catch (error) {
        console.error('Error during checkout:', error);
        alert('Une erreur est survenue lors de la redirection vers le paiement.');
      }
    },

    async createOrder(){
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post('http://localhost:5000/api/orders/', {
          userId: localStorage.getItem('userId'),
          products: this.cart.products,
          amount: this.cartSummary.total_price
        }, {
          headers: {
            token: `bearer ${token}`,
          }
        });
        return response.data._id;
      } catch (error) {
        console.error('Error during creating order:', error);
        alert('Une erreur est survenue lors de la création de la commande.');
      }
    }
  

  },
  mounted() {
    this.fetchCart();
  }
};
</script>

<style scoped>
.quantity-selector label {
  display: block;
  margin-bottom: 6px;
}

.quantity-selector {
  display: flex;
  align-items: center;
}

.quantity-selector span {
  margin: 0 0.5rem;
  text-align: center;
}
</style>