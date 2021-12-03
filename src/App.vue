<template>
   <div id="app">
      <nav v-if="user=='present'" class="navbar navbar-expand-lg navbar-light bg-light">
       <a class="btn">
         <router-link to="/">Stocks</router-link>
       </a> 
       <a class="btn">
       <router-link to="/wallet">Wallet ₹{{amount}}</router-link>
       </a> 
    </nav>
    <router-view /> 
     <!-- <login />  -->
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
      'amount',
      'user'
   ])
  },
  data(){
    return{
      islogin:false
    }
  },
  mounted() {
    this.$store.state.amount = localStorage.getItem('amount') ? JSON.parse(localStorage.getItem('amount')) : this.amount
    if(localStorage.getItem('user') == null) {
      this.$router.push({
        name: 'login'
      })
    }
   // this.islogin=localStorage.getItem("isPresent")
  },
  // beforeRouteEnter(routeTo, routeFrom, next) {
  //   console.log("jhgfd");
  //   next('login');
  // },
}
</script>

