<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid text-centre">
    <div class="collapse navbar-collapse" id="navbarNav" style="place-content: center;">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">
            <router-link to="/">Stocks</router-link> |
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <router-link to="/wallet">Wallet</router-link> 
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    <router-view />
  </div>
</template>

<script>


import Wallet from './components/Wallet.vue'
import HelloWorld from './components/HelloWorld.vue'


export default {
    name: "App",
    components: {
      HelloWorld,
        Wallet
    }
  }
</script>

