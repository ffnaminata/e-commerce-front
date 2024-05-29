<template>
  <div class="footer flex bg-[#744836] p-6 text-white font-extralight">
    <div class="furudiya w-1/2 p-6">
        <img class="w-64 mb-5" src="../assets/logo.png" alt="log">
        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
    </div>
    <div class="nav w-1/4 p-6">
        <h1 class="font-bold text-2xl mb-12">Useful Links</h1>
        <ul class="h-full ml-5">
            <li class="text-lg mb-2">
                <a href="#">Home</a>
            </li>
            <li class="text-lg mb-2">
                <a href="#">Shop</a>
            </li>
            <li class="text-lg mb-2">
                <a href="#">About</a>
            </li>
        </ul>
    </div>
    <div class="contact w-1/4 p-6">
        <h1 class="font-bold text-2xl mb-5">Contact</h1>
        <ul class="gap-6">
            <li class="flex gap-4 mb-2">
                <img src="../assets/icons/location_white.svg" alt="location">
                <p>République,94800 Villejuif</p>
            </li>
            <li class="flex gap-4 mb-2">
                <img src="../assets/icons/phone_white.svg" alt="phone">
                <p>06 60 63 86 90</p>
            </li>
            <li class="flex gap-4 mb-4">
                <img src="../assets/icons/mail_white.svg" alt="mail">
                <p>aminata.fofana.20230362@efrei.net</p>
            </li>
            <li class="flex w-full gap-4 ml-10">
                <div class="bg-[#F1DDC9] rounded-full">
                    <img src="../assets/icons/instagram.svg" alt="instagram">
                </div>
                <div class="bg-[#F1DDC9] rounded-full">
                    <img src="../assets/icons/snapchat.svg" alt="snapchat">
                </div>
                <div class="bg-[#F1DDC9] rounded-full">
                    <img src="../assets/icons/tiktok.svg" alt="tiktok">
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'FooterComponent'
    };
</script>
