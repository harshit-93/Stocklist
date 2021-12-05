<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
       <h1>
         Stocks
       </h1> 
    </nav>
    <div class="container col-5">
        <br>
    <h2>Sign In</h2>
<form @submit.prevent="login">  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button @click="login" class="btn btn-primary">Log In</button>
  <!-- <a href="">Don't have an account SignUp</a> -->
</form>
<br><br>
</div>
<router-view />
</template>
<script>

export default {
 data(){
   return{
     email:"",
     password:""
   }
 },
 methods: {
      async login () {
      let status = await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })

        if(status == "not present") {
          alert("No such user exists!")
          this.$router.push({ name: 'signup' })
        } 
        else {
          this.$router.push({ name: 'Helloworld' })
        }
    }
    }
}
</script>
