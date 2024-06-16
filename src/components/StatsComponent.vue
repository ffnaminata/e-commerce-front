<template>
    <div class="bg-white shadow-md rounded-lg p-4 w-full md:w-1/4">
      <div class="text-gray-700 text-lg font-semibold">{{ title }}</div>
      <div class="text-2xl font-bold">{{ value }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StatsComponent',
    props: {
      title: String,
      value: Number,
    },
  };
  </script>
  