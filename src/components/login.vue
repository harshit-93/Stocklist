<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
       <h1>
         Stocks
       </h1> 
    </nav>
    <div class="container col-5">
        <br>
    <h2>Sign In</h2>
<form @submit.prevent="signin">  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input v-model="email" type="email" required class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input v-model="password" type="password" required class="form-control" id="exampleInputPassword1">
  </div>
  <button class="btn btn-primary">Log In</button>
  <br>
  <br>
  <a>
       <router-link to="/signup">Don't have an account? Signup</router-link>
       </a> 
</form>
<br><br>
</div>
<router-view />
</template>
<script>
import {mapState} from 'vuex'

export default {
 data(){
   return{
     email:"",
     password:""
   }
 },
 computed:{
   ...mapState([
      'user'
   ])
  },
 methods: {
      async signin () {
      let data = await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        if(data == "not present") {
          alert("Invalid email or password")
        } 
        if(this.user) {
          this.$router.push({ name: 'Helloworld' })
        }
    }
    },
    mounted() {
    
  },
}
</script>
