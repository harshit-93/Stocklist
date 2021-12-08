<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
       <h1>
         Stocks
       </h1> 
    </nav>
<div class="container col-5">
    <h2>Sign Up</h2>
<form @submit.prevent="login">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <button @click="signup" class="btn btn-primary">Sign Up</button>
  <br>
  <br>
  <a>
       <router-link to="/login">Already have an account? Signin</router-link>
  </a> 
</form> 
</div>
<br>
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
    methods:{
      async signup () {
       await this.$store.dispatch('signup', {
          email: this.email,
          password: this.password
        })
        if(this.user=="already present"){
          alert("User already exists ! Signin")
        }
        else if(this.user=="invalid")
         alert("Invalid email or password !")
         else
         { console.log(this.user);
           this.$router.push({ name: 'Helloworld' })
         }
    }
    }
}
</script>
