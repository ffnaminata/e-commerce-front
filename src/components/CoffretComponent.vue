<template>
    <div class="coffret flex h-[650px] shadow-2xl">
        <div class="w-2/5">
            <ul> 
                <li v-for="(image, index) in images" :key="index" v-on:click="currentIndex = index" class="hover:text-red-800">{{image}}</li>
            </ul>
        </div>
        <div class="relative w-3/5 bg-slate-200">
            <img v-for="(image, index) in images" :key="index" :src="require(`../assets/coffret/${image}.jpg`)" :class="{'opacity-100': currentIndex === index, 'opacity-0': currentIndex !== index}" class="absolute">
        </div>
    </div>
</template>

<script>
export default {
  name: 'CoffretComponent',
  data() {
    return {
        currentIndex: 0,
        // images: [
        //     require("../assets/coffret/hibiscus.jpg"),
        //     require("../assets/coffret/khamare.jpg"),
        //     require("../assets/coffret/moringa.jpg"),
        //     require("../assets/coffret/karite.jpg"),
        //     require("../assets/coffret/wussulan.jpg")
        // ]
        images: [
            "hibiscus",
            "khamare",
            "moringa",
            "karite",
            "wussulan"
        ]
    };
  },
  methods: {
    
  },
  computed: {
    
  },
  mounted() {
    
  },
};
</script>

<!-- <style scoped>
    .coffret {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .images-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .images-wrapper img {
        width: 100%;
        height: auto;
    }
</style> -->