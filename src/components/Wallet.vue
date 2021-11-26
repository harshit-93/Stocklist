<template>
     <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Stock</th>
      <th scope="col">Quantity</th>
      <th scope="col">AvgPrice</th>
      <th scope="col">Sell</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(stock,index) in wallet" v-bind:key="index">
      <td>{{stock.name}}</td>
      <td>{{stock.Quantity}}</td>
      <td>{{stock.avgPrice}}</td>
      <td>  <input type="number" @change="mainlist" >
        <a class="pl-5"  @click="sell(stock.name)">Sell</a> </td>
    </tr>
  </tbody>
</table>
</template>
<script>
import {mapState} from 'vuex'
     export default {
  data() {
    return {
      stock:{}
  }
  },
  // watch:{
  //    stocklist:
  //    { deep:true,
  //      handler(st){
  //      localStorage.wallet=JSON.stringify(st)
  //      console.log('j');
  //      }
  //    }
  // },
   mounted(){
     if(localStorage.wallet)
     {
       this.$store.state.wallet = JSON.parse(localStorage.wallet)
     }
  },
  computed:{
   ...mapState([
      'wallet'
   ])
  },
  methods:{
    sell(e){
          this.stock.name=e
          this.$store.dispatch('sell',this.stock)
    },
    mainlist(event){
      this.stock.qty=event.target.value
    }
  }
  }
</script>
