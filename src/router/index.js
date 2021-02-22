import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/home/Home.vue');
const Category = () => import('../views/category/Category.vue');
const ShopCart = () => import('../views/shopcart/ShopCart.vue');
const Profile = () => import('../views/profile/Profile.vue');
const Detail = () => import('../views/detail/Detail.vue');

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
