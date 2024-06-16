import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ShopPage from '../pages/ShopPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import AuthPage from '../pages/AuthPage.vue';
import AccountPage from '../pages/AccountPage.vue'; //restreint
import FavsPage from '../pages/FavsPage.vue'; //restreint
import CartPage from '../pages/CartPage.vue'; //restreint
import OrderPage from '../pages/OrderPage.vue'; //restreint
import DashPage from '../pages/DashPage.vue';  //restreint
import CustomersPage from '../pages/CustomersPage.vue'; //restreint
import OrdersPage from '../pages/OrdersPage.vue'; //restreint
import ProductsPage from '../pages/ProductsPage.vue'; //restreint
import AddressComponent from '../pages/AddressComponent.vue';
import CheckoutPage from '../pages/CheckoutPage.vue';
import SuccessPage from '../pages/SuccessPage.vue';


const routes = [
  {
    path: '/',
    name: 'Furu Diya - Home',
    component: HomePage,
  },
  {
    path: '/shop',
    name: 'Furu Diya - Shop',
    component: ShopPage,
  },
  {
    path: '/product/:productId',
    name: 'Furu Diya - Product',
    component: ProductPage,
    props: true
  },
  {
    path: '/about',
    name: 'Furu Diya - About',
    component: AboutPage,
  },
  {
    path: '/authentification/:formType',
    name: 'Furu Diya - Authentification',
    component: AuthPage,
    props: true
  },
  {
    path: '/account',
    name: 'Furu Diya - Account',
    component: AccountPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/favorites',
    name: 'Furu Diya - Favorites',
    component: FavsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/cart',
    name: 'Furu Diya - Cart',
    component: CartPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/order',
    name: 'Furu Diya - Order',
    component: OrderPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/:tab',
    name: 'Furu Diya - Dashboard',
    component: DashPage,
    props: true,
    meta: { requiresAdmin: true } 
  },
  {
    path: '/customers',
    name: 'Furu Diya - Customers',
    component: CustomersPage,
    meta: { requiresAdmin: true } 
  },
  {
    path: '/orders',
    name: 'Furu Diya - Orders',
    component: OrdersPage,
    meta: { requiresAdmin: true } 
  },
  {
    path: '/products',
    name: 'Furu Diya - Products',
    component: ProductsPage,
    meta: { requiresAdmin: true } 
  },
  {
    path: '/adresscomponent',
    name: 'Furu Diya - AddressComponent',
    component: AddressComponent,
  },
  {
    path: '/checkout',
    name: 'Furu Diya - CheckoutPage',
    component: CheckoutPage
  },
  {
    path: '/success',
    name: 'Furu Diya - SuccessPage',
    component: SuccessPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('accessToken');
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Furu Diya - Authentification', params: { formType: 'login' } });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!isAuthenticated || !isAdmin) {
      next({ name: 'Furu Diya - Authentification', params: { formType: 'login' } });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;
