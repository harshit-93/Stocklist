<template>
  <div id="app">
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link to="/"><a class="navbar-brand" href="#">Stocks</a></router-link> 

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link to="/wallet"><a class="navbar-brand" href="#">Wallet ₹{{amount}}</a></router-link> 
      </li>
    </ul>
    <div class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="number" placeholder="Quantity" v-model="this.stock.Quantity" >
      <button class="btn btn-outline-success my-2 my-sm-0"  @click="addtowallet">Add</button>
    </div>
  </div>
</nav>
<router-view />

<!-- <div class="router">
<router-link to="/">Stocks</router-link> 
 | 
<router-link to="/wallet">Wallet ₹[{{amount}}]</router-link> 
</div>
<router-view /> -->
  </div>
</template>

<script>


import Wallet from './components/Wallet.vue'
import HelloWorld from './components/HelloWorld.vue'
import {mapState} from 'vuex'

export default {
    name: "App",
    components: {
      HelloWorld,
        Wallet
    },
    watch: {
    amount() {
      localStorage.setItem('amount', parseInt(this.$store.state.amount).toFixed(2))
    }
  },
    computed:{
    amount(){
      return parseInt(this.$store.state.amount)
    },
    ...mapState([
     'stock'
   ])
  },
  mounted(){
     if(localStorage.amount)
     {
       this.$store.state.amount = localStorage.amount
     }
  },
  methods:{
    addtowallet(){
        this.$store.dispatch('addtowallet',stock)
     }
  }
  }
</script>

