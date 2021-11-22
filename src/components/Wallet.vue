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
      <td>{{stock.name}}</td>
      <td>{{stock.Quantity}}</td>
      <td>  <input type="number" @change="mainlist" >
        <a class="pl-5" @click="sell(stock.name)">Sell</a> </td>
    </tr>
  </tbody>
</table>
</template>
<script>
     export default {
  data() {
    return {
      stocklist:[],
      qty:""
  }
  },
  mounted(){
     if(localStorage.wallet)
     {
       this.stocklist=JSON.parse(localStorage.wallet)
     }
  },
  watch:{
     stocklist:
     { deep:true,
     handler(st){
       localStorage.wallet=JSON.stringify(st)
       console.log('j');
       }
     }
  },
  methods:{
    sell(e){
       const a = this.stocklist.filter((stock)=>stock.name==e)
       console.log(a)
       a.forEach(stock => {
         if(stock.name==e)
         {
           stock.Quantity-=this.qty
         }
       if(stock.Quantity<=0)
       { 
         let a = this.stocklist.findIndex((stock => {
           return stock.name == e;
         }))
         this.stocklist.splice(a,1)
        localStorage.wallet=JSON.stringify(this.stocklist)
        }
       })
      //  console.log(e);
      //  console.log(this.stocklist)
      //localStorage.wallet=JSON.stringify(this.stocklist)
      // if(this.stocklist[e].Quantity<=0)
      //  { delete this.stocklist[e]
      //   localStorage.wallet=JSON.stringify(this.stocklist)
      //   localStorage.removeItem('wallet')
      //   }

        // if(localStorage.wallet == "{}") {
        //   localStorage.removeItem('wallet')
        // }
    },
    mainlist(event){
      this.qty=event.target.value
    }
  }
  }
</script>
