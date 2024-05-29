<template>
  <div class="bg-white rounded-2xl w-[400px] h-[500px] shadow-xl">
    <img class="rounded-2xl rounded-b-none h-2/3" src="../assets/5.jpg" alt="bogolan">
    <div class="px-8 py-8">
        <slot name="vocabulary"></slot>
        <slot name="kind"></slot>
        <slot name="translate"></slot>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'DefinitionCard'
    };
</script>