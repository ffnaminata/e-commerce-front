<template>
    <nav class="z-50 sticky top-0 w-full shadow-xl bg-[#2C1911]">
        <div class="flex justify-between items-center w-[92%] mx-auto py-3" >  
            <div>
                <ul class="flex items-center gap-10">
                    <li>
                        <a class="text-white hover:text-red-300" href="http://localhost:8080/">Home</a>
                    </li>
                    <li>
                        <a class="text-white hover:text-red-300" href="http://localhost:8080/shop">Shop</a>
                    </li>
                    <li>
                        <a class="text-white hover:text-red-300" href="http://localhost:8080/about">About</a>
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
                    <img class="w-8" src="../assets/icons/search_white.svg" alt="search">
                </a>
                <a href="http://localhost:8080/account"> <!-- Si localStorage token /account, sinon /authentification/login-->
                    <img class="w-8" src="../assets/icons/account_white.svg" alt="account">
                </a>
                <a href="#">
                    <img class="w-8" src="../assets/icons/likechecked_white.svg" alt="likechecked">
                </a>
                <a href="http://localhost:8080/cart">
                    <img class="w-8" src="../assets/icons/shoppingbag_white.svg" alt="shoppingbag">
                </a>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'NavbarComponent'
    };
</script>