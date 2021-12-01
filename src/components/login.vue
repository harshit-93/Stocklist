<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
       <h1>
         Stocks
       </h1> 
    </nav>
    <div class="container col-5">
        <br>
    <h2>Sign In</h2>
<div>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input v-model="userName" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
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
  <button @click="checkPresent" class="btn btn-primary">Log In</button>
</div>
<br><br>
<!-- <h2>Sign Up</h2>
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <button type="submit" class="btn btn-primary">Sign Up</button>
</form> 
<br> -->
</div>
<router-view />
</template>
<script>

export default {
 data(){
   return{
     isPresent:true,
     userName:"",
     password:""
   }
 },
 methods:{
    checkPresent(){
      //this.isPresent=true
         if(this.isPresent){
           localStorage.setItem("isPresent",this.isPresent)
           this.$router.push({
             name: 'Helloworld'
          })
         }
    }
 }
}
</script>
