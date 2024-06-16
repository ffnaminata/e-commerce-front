<template>
    <div class="h-screen bg-gray-800 text-white w-64 p-6">
      <div class="text-center font-bold mb-6">
        <img src="@/assets/logo.png" alt="Logo" class="mx-auto w-12 h-12 mb-2">
        <h1>Admin Dashboard</h1>
      </div>
      <nav>
        <ul>
          <li class="mb-4">
            <router-link to="/dashboard/users" class="block py-2 px-4 hover:bg-gray-700 rounded">
              Customers
            </router-link>
          </li>
          <li class="mb-4">
            <router-link to="/dashboard/products" class="block py-2 px-4 hover:bg-gray-700 rounded">
              Products
            </router-link>
          </li>
          <li class="mb-4">
            <router-link to="/dashboard/orders" class="block py-2 px-4 hover:bg-gray-700 rounded">
              Orders
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SidebarComponent',
  };
  </script>
  