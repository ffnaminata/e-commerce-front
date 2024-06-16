<template>
    <div class="bg-[#FAF4EE] p-0">
      <BannerComponent></BannerComponent>
      <NavbarComponent></NavbarComponent>
      <HeaderComponent></HeaderComponent>
      <DefinitionsComponent></DefinitionsComponent>
      <NewsletterComponent></NewsletterComponent>
      <FooterComponent></FooterComponent>
    </div>
  </template>
  
  <script>
    import NavbarComponent from '../components/NavbarComponent.vue';
    import BannerComponent from '../components/BannerComponent.vue';
    import HeaderComponent from '../components/HeaderComponent.vue';
    import DefinitionsComponent from '../components/DefinitionsComponent.vue';
    import NewsletterComponent from '../components/NewletterComponent.vue';
    import FooterComponent from '../components/FooterComponent.vue';
    
    export default {
      name: 'HomePage',
      components: {
        NavbarComponent,
        BannerComponent,
        HeaderComponent,
        DefinitionsComponent,
        NewsletterComponent,
        FooterComponent
      }
    }
  </script>