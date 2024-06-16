<template>
  <div class="account">
    <NavbarComponent></NavbarComponent>
    <h2> Bienvenue {{username}} ! </h2>
    <span @click="logout" class="hover:text-red-400">Logout</span>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
export default {
  name: 'AccounPage',
  components: {
    NavbarComponent
  },
  data() {
    return {
      username: localStorage.getItem('username')
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      this.$router.push({ name: 'Furu Diya - Authentification', params: { formType: 'login' } });
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