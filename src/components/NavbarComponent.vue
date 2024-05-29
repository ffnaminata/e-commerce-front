<template class>
    <div id="trigger"></div>
    <nav :class="navbarClass" class="z-50 sticky top-0 w-full shadow-xl">
        <div class="flex justify-between items-center w-[92%] mx-auto py-3 transition-colors duration-300" >  
            <div>
                <ul class="flex items-center gap-10">
                    <li>
                        <a class="text-white hover:text-red-300" href="#">Home</a>
                    </li>
                    <li>
                        <a class="text-white hover:text-red-300" href="#">Shop</a>
                    </li>
                    <li>
                        <a class="text-white hover:text-red-300" href="#">About</a>
                    </li>
                </ul>
            </div>
            <div>
                <a href="#">
                    <img class="w-56" src="../assets/logo.png" alt="logo">
                </a>
            </div>
            <div class="flex justify-between gap-5">
                <a href="#">
                    <img class="w-8" src="../assets/icons/search_white.svg" alt="account">
                </a>
                <a href="#">
                    <img class="w-8" src="../assets/icons/account_white.svg" alt="account">
                </a>
                <a href="#">
                    <img class="w-8" src="../assets/icons/likechecked_white.svg" alt="account">
                </a>
                <a href="#">
                    <img class="w-8" src="../assets/icons/shoppingbag_white.svg" alt="account">
                </a>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'NavbarComponent',
        data() {
            return {
            isScrolled: false,
            };
        },
        computed: {
            navbarClass() {
            return this.isScrolled ? 'bg-[#2C1911]' : '';
            },
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
        },
        beforeUnmount() {
            window.removeEventListener('scroll', this.handleScroll);
        },
        methods: {
            handleScroll() {
            const trigger = document.getElementById('trigger');
            const triggerPosition = trigger.getBoundingClientRect().bottom;
            this.isScrolled = triggerPosition <= 0;
            },
        },
    };
</script>

<style scoped>
    .sticky-navbar {
        transition: background-color 0.3s;
    }
</style>