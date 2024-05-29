<template>
    <div>
      <form @submit.prevent="handlePayment">
        <div id="card-element"><!-- Stripe Card Element will be inserted here --></div>
        <button type="submit">Pay</button>
      </form>
    </div>
  </template>
  
  <script>
  import { loadStripe } from '@stripe/stripe-js';
  
  export default {
    data() {
      return {
        stripe: null,
        elements: null,
        cardElement: null,
        clientSecret: '',
      };
    },
    async mounted() {
      this.stripe = await loadStripe('pk_test_51PKo3M097Htwic2gsYxWjstwmQXm1pUolUJTWvOHvBIrMofrSuRjg97XvWQW24AWrscL7m1tEGIiarQaDOXRadix00VQxQUJaz'); // Remplacez par votre clé publique Stripe
      this.elements = this.stripe.elements();
      this.cardElement = this.elements.create('card');
      this.cardElement.mount('#card-element');
  
      // Obtenez le client secret depuis votre backend
      const response = await fetch('/api/checkout/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000 }), // Montant en cents
      });
  
      const data = await response.json();
      this.clientSecret = data.clientSecret;
    },
    methods: {
      async handlePayment() {
        const { error, paymentIntent } = await this.stripe.confirmCardPayment(this.clientSecret, {
          payment_method: {
            card: this.cardElement,
          },
        });
  
        if (error) {
          console.error(error);
        } else if (paymentIntent.status === 'succeeded') {
          console.log('Payment succeeded!');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Stylez votre élément de carte ici */
  </style>
  