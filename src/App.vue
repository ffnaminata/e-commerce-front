<template>
  <div class="bg-[#FAF4EE] p-0">
    <BannerComponent></BannerComponent>
    <HeaderComponent></HeaderComponent>
    <DefinitionsComponent></DefinitionsComponent>
    <NewsletterComponent></NewsletterComponent>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
  import BannerComponent from './components/BannerComponent.vue';
  import HeaderComponent from './components/HeaderComponent.vue';
  import DefinitionsComponent from './components/DefinitionsComponent.vue';
  import NewsletterComponent from './components/NewletterComponent.vue';
  import FooterComponent from './components/FooterComponent.vue';
  
  export default {
    name: 'App',
    components: {
      BannerComponent,
      HeaderComponent,
      DefinitionsComponent,
      NewsletterComponent,
      FooterComponent
    }
  }
</script>

<!-- <template>
  <div>
    <PaymentComponent />
  </div>
</template>

<script>
import PaymentComponent from './components/PaymentComponent.vue';

export default {
  components: {
    PaymentComponent,
  },
};
</script> -->

