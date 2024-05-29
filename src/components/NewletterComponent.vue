<template>
  <div class="newsletter flex h-96 bg-[#F1DDC9] items-center justify-center text-center">
    <div>
      <h1 class="text-6xl mb-5">Newsletter</h1>

      <p class="text-4xl font-extralight m-4"> Get timely updates from your favorite products.</p>
      
      <form class="flex items-center w-[800px] mx-auto">   
        <div class="relative w-full">
            <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 h-12" placeholder="E-mail" required />
        </div>

        <button type="submit" class="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium bg-[#744836] rounded-lg border hover:bg-[#2C1911] h-12">
            <img src="../assets/icons/send_white.svg" alt="submit">
        </button>
    </form>
      
    </div>
  </div>
</template>

<script>
    export default {
    name: 'NewsletterComponent'
    };
</script>