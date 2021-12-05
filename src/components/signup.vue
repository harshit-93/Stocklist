<template>
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

        if(this.user){
          this.$router.push({ name: 'Helloworld' })
        }
    }
    }
}
</script>
