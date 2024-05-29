<template>
    <div class="relative">
      <button @click="prevImage" class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded">
        &lt;
      </button>

      <button @click="nextImage" class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded">
        &gt;
      </button>

      <transition-group name="slide" tag="div" class="flex">
        <img v-for="(image, index) in images" :key="index" :src="image" class="w-screen" :class="{ 'opacity-100': currentIndex === index, 'opacity-0': currentIndex !== index }">
      </transition-group>
    </div>
  </template>
  
  <script>
    export default {
        name: 'CoffretCarousel',
        data() {
        return {
            currentIndex: 0,
            images: [
            '../assets/coffret/hibiscus.jpg',
            'https://i.pinimg.com/564x/bf/ba/a7/bfbaa7ffa890f7a8c3e191df5e6dcce4.jpg' 
        ]
        };
        },
        methods: {
        prevImage() {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        },
        nextImage() {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        },
        
        },
    };
  </script>
  
  <style scoped>
    .slide-enter-active, .slide-leave-active {
        transition: opacity 0.5s;
    }
    .slide-enter, .slide-leave-to {
        opacity: 0;
    }
  </style>
  