<template>
<div class="row mr-0">
  <div class="col-md-3 col-sm-6">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Search" @input="getsug" aria-describedby="basic-addon1" v-model="name">
    </div>
    <div class="list-group" v-if="dispsug">
      <a class="list-group-item list-group-item-action" v-for="(match, index) in bestmatches"  :key="index" @click="getdesc(match['1. symbol'])">{{ match['1. symbol'] }}</a>
    </div>
  </div>
  <div class="col-md-6 col-sm-0"></div>
  <div class="col-md-3 col-sm-6">
    <div class="input-group mb-3">
  <input type="number" class="form-control" placeholder="Quantity" aria-describedby="button-addon2" v-model="stock.Quantity">
  <button v-if="(stock.Quantity*stock.avgPrice)<=amount" class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addtowallet">Add</button>
</div>
  </div>
</div>
<div class="container col-11">
<div >
  <h1>{{stock.key}}</h1>
  <p>{{ this.$store.state.desc }}</p>
  <h3 v-if="stock.avgPrice">Price : {{stock.avgPrice}}</h3>
  <!-- <apexchart v-if="dispgraph" width="800" type="line" :options="options" :series="series" ></apexchart> -->
</div>
 <div>
  <apexchart v-if="dispgraph" width="800" type="line" :options="options" :series="series" ></apexchart>
</div> 
</div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios'
import {mapState} from 'vuex'
export default {
  components:{
    VueApexCharts
  },
  data(){
    return{
      dispgraph:false,
      dispsug:true,
      stock:{
        key:"",
        Quantity:'',
        avgPrice:0
      },
      name:"",
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: 'series-1',
        data: []
      }]
    }
  },
  computed:{
   ...mapState([
      'bestmatches',
      'amount'
   ])
  },
  methods:{
     async add(e) {
          let {data}=await axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=' + e + '&apikey=1L0K210ONUBKP1KR')
              this.options.xaxis.categories = []
              this.options.xaxis.categories.push(Object.keys(data["Monthly Time Series"]))
              this.series[0].data = []
               for (let a of (Object.keys(data["Monthly Time Series"]) ))
                {
                   this.series[0].data.push(data["Monthly Time Series"][a]["1. open"])
                }
                this.stock.avgPrice=data["Monthly Time Series"][Object.keys(data["Monthly Time Series"])[0]]["4. close"]
},
getsug(){
  this.dispgraph=false
   this.dispsug=true
  this.$store.dispatch('getSuggestion',this.name)
  console.log(this.bestmatches,"harsht");
},
getdesc(e){
  this.stock.key=e;
  this.$store.dispatch('adddesc',this.stock)
  this.add(e)
   this.dispgraph=true
   this.dispsug=false
},
addtowallet(){
  //console.log();
  this.$store.dispatch('addtowallet',this.stock)
}
  },
}
</script>

