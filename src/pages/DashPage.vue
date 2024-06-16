<template>
  <div class="admin-dashboard flex">
    <SidebarComponent></SidebarComponent>

    <div class="flex-1 p-8">
      <!-- title -->
      <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <!-- users -->
      <div v-if="tab === 'users'">
        <h2 class="text-xl font-bold mb-2">Users</h2>
        <UsersComponent></UsersComponent>
      </div>

      <!-- orders -->
      <div v-if="tab === 'orders'">
        <h2 class="text-xl font-bold mb-2">Orders</h2>
        <OrdersComponent></OrdersComponent>
      </div>

      <!-- products -->
      <div v-if="tab === 'products'">
        <h2 class="text-xl font-bold mb-2">Products</h2>
        <ProductsComponent></ProductsComponent>
      </div>

    </div>
  </div>
</template>

<script>
import SidebarComponent from '@/components/SidebarComponent.vue';
import UsersComponent from '@/components/UsersComponent.vue';
import OrdersComponent from '@/components/OrdersComponent.vue';
import ProductsComponent from '@/components/ProductsComponent.vue';
import axios from 'axios';
export default {
  name: 'DashPage',
  components: {
    SidebarComponent,
    UsersComponent,
    OrdersComponent,
    ProductsComponent
  },
  props: ['tab'],
  data() {
    return {
      stats: {
        totalOrders: 50,
        totalRevenue: 5000
      }
    };
  },
  methods: {
    async fetchStats(){
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:5000/api/orders/monthly-order-count', {
          headers: {
            token: `bearer ${token}`,
          }
        })
        this.stats.totalRevenue = response.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted(){
    this.fetchStats();
  }
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
}
</style>
