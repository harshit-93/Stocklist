<template>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Stock</th>
      <th scope="col">AvgPrice</th>
      <th scope="col">Quantity</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(stock,index) in wallet" v-bind:key="index">
      <td>{{stock.name}}</td>
      <td>{{stock.avgPrice}}</td>
      <td>{{stock.Quantity}}</td>
      <td>  <input type="number" :id="stock.name" >
        <a class="pl-5" @click="sell(stock.name)">Sell</a> </td>
    </tr>
  </tbody>
</table>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
            stock:{}
        }
    },
     mounted(){
     if(localStorage.getItem("wallet"))
     {
      this.$store.dispatch("mountwallet",localStorage.getItem("wallet"))
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
          this.stock.qty = (document.querySelector('#' + e).value == "") ? 0 : document.querySelector('#' + e).value
          this.$store.dispatch('sell',this.stock)
          document.querySelector('#' + e).value = ''
    }
  }
}
</script>
