import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/Home.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/ui",
    name: "Ui",
    component: () => import("@/views/Ui.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: { protected: true },
  },
  {
    path: "/company/create",
    name: "Create company",
    component: () => import("@/views/CompanyCreate.vue"),
    meta: { protected: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
    meta: { protected: true },
  },
  {
    path: "/support",
    name: "Support",
    component: () => import("@/views/Support.vue"),
    meta: { protected: true },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
