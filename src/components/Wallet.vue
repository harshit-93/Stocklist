<template>
     <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Stock</th>
      <th scope="col">Quantity</th>
      <th scope="col">Sell</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(stock,index) in stocklist" v-bind:key="index">
      <td>{{index}}</td>
      <td>{{stock.Quantity}}</td>
      <td>  <input type="number" v-model="qty">
        <a class="pl-5" @click="sell(index)">Sell</a> </td>
    </tr>
  </tbody>
</table>
</template>
<script>
     export default {
  data() {
    return {
      stocklist:{},
      qty:""
  }
  },
  mounted(){
     if(localStorage.wallet)
     {
       this.stocklist=JSON.parse(localStorage.wallet)
     }
  },
  // watch:{
  //    stocklist(stocklist)
  //    {
  //      localStorage.wallet=JSON.stringify(stocklist)
  //      console.log('j');
  //    }
  // },
  methods:{
    sell(e){
       this.stocklist[e].Quantity-=this.qty
      //  console.log(e);
      //  console.log(this.stocklist)
     // localStorage.wallet=JSON.stringify(this.stocklist)
      if(this.stocklist[e].Quantity<=0)
        delete this.stocklist[e]
        localStorage.wallet=JSON.stringify(this.stocklist)
        localStorage.removeItem('wallet');
    }
  }
  }
</script>
