<template>
  <div class="header mb-12 shadow-2xl">
    <NavbarComponent></NavbarComponent>
  </div>
</template>

<script>
    import NavbarComponent from './NavbarComponent.vue';

    export default {
        name: 'HeaderComponent',
        components: {
            NavbarComponent,
        }
    };
</script>

<style scoped>
    .header{
        background-image: url('../assets/1.jpg');
        background-repeat: no-repeat;
        background-size: cover; 
        background-position: center;
        height: 700px;
        width: 100%;
    }
</style>
