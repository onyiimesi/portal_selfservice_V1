import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InvoiceView from '../views/InvoiceView.vue'
import ViewInvoiceView from '../views/ViewInvoiceView.vue'
import PaymentsView from '../views/PaymentsView.vue'
import CreateCustomerView from '../views/CreateCustomerView.vue'
import PaymentVerifyView from '../views/PaymentVerifyView.vue'
import PaymentReceiptView from '../views/PaymentReceiptView.vue'
import SelfAssementView from '../views/SelfAssementView.vue'
import SelfAssementsView from '../views/SelfAssementsView.vue'
import ProfileView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/invoice/:customerCode',
      name: 'invoice',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: InvoiceView
    },
    {
      path: '/viewinvoice/:invoiceCode',
      name: 'viewinvoice',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ViewInvoiceView
    },
    {
      path: '/payments/:invoiceCode',
      name: 'payments',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: PaymentsView
    },
    {
      path: '/self-assessment/:invoiceCode',
      name: 'selfassesment',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CreateCustomerView
    },
    {
      path: '/selfassessment/:organizationCode',
      name: 'selfassement',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SelfAssementView
    },
    {
      path: '/selfassessment/:organizationCode/:subOrganizationCode',
      name: 'selfassements',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SelfAssementsView
    },
    {
      path: '/payment-verify/:invoiceCode',
      name: 'paymentverify',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: PaymentVerifyView
    },
    {
      path: '/payment-receipt/:invoiceCode',
      name: 'paymentreceipt',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: PaymentReceiptView
    },
    {
      path: '/profile/:customerCode',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: ProfileView
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginView
    },
    
  ]
})

export default router
