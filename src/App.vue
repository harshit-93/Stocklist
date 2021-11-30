<template>
   <div id="app">
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
       <a class="btn">
         <router-link to="/">Stocks</router-link>
       </a> 
       <a class="btn">
       <router-link to="/Wallet">Wallet ₹{{amount}}</router-link>
       </a> 
    </nav>
    <router-view />
    <!-- <login /> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import wallet from './components/wallet.vue'
import {mapState} from 'vuex'
import login from './components/login.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    wallet,
    login
  },
  computed:{
   ...mapState([
      'amount'
   ])
  },
  mounted(){
    //  if()
    //  {
    //    this.$store.state.amount = JSON.parse(localStorage.amount)
    //  }
    this.$store.state.amount = localStorage.getItem('amount') ? JSON.parse(localStorage.getItem('amount')) : this.amount
  }
}
</script>

