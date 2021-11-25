<template>
        <section class="main">
          <div class="d-flex justify-content-around">
            <div>
              <form class="search" method="post" action="index.html" >
                <input v-model="name" id="search" type="text" name="q" @input="getSuggestion" placeholder="Search..." autocomplete="off" />
                <ul class="results">
                    <li v-for="(match, index) in bestMatches" :key="index" @click="getDesc(match['1. symbol'])"> {{ match['1. symbol'] }} <br /></li>
                </ul>
            </form>
            </div>
            <div><input type="number" min="1" v-model="stock.Quantity"></div> 
            <div>
                 <button type="button" class="btn btn-secondary" @click="addtowallet">Add</button>
            </div>
          </div>
        </section>
        <h1>{{stock.key}}</h1>
        <p>{{ description }}</p>
        <h3 v-if="stock.avgPrice">Price : {{stock.avgPrice}}</h3>
      
    <!-- <Chart :id="name" v-if="b" /> -->
<div>
  <apexchart width="800" type="line" :options="options" :series="series" v-if="b"></apexchart>
</div>
</template>

<script>
/* eslint-disable eslint-disable-next-line */
import axios from 'axios';
// import Chart from './Chart.vue'
// import { ref } from 'vue'
// import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'HelloWorld',
  components: {
      VueApexCharts
    },
  props: {
   // msg: String
  },
  data() {
    return {
      bestMatches: [],
      description: "",
      name: "",
      b: false,
      stock:
      {
        key:'',
        Quantity:'',
        avgPrice: ''
      },
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
  
  methods: {
        getSuggestion() {
          if(this.name.length>2){
            axios.get('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + this.name + '&apikey=1L0K210ONUBKP1KR')
            .then((data) => {
                console.log(data);
                this.bestMatches = data.data['bestMatches'];
                console.log(this.bestMatches);
            })
            .catch((error)=>{
                console.log(error);
            });
            }
        },
        getDesc(e){
          axios.get('https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + e + '&apikey=1L0K210ONUBKP1KR')
            .then((data) => {
                console.log(data);
                this.description = data.data['Description'];
                console.log(this.description);
                 this.b=true
                this.add(e);
                this.stock.key=e

            })
            .catch((error)=>{
                console.log(error);
            });
        },
        add(e) {
           axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=' + e + '&apikey=1L0K210ONUBKP1KR')
           .then((data) => {
              this.options.xaxis.categories = []
              //let keys=(Object.keys(data.data["Monthly Time Series"]))
              // keys.forEach(Element =>
              // {
              //   console.log(Element)
              // })
              this.stock.key=e
              this.options.xaxis.categories.push(Object.keys(data.data["Monthly Time Series"]))
              this.series[0].data = []
               for (let a of (Object.keys(data.data["Monthly Time Series"]) ))
                {
                   this.series[0].data.push(data.data["Monthly Time Series"][a]["1. open"])
                }
                this.stock.avgPrice=data.data["Monthly Time Series"][Object.keys(data.data["Monthly Time Series"])[0]]["4. close"]
            })
            .catch((error)=>{
                console.log("API limit");
            });
},
     addtowallet(){
        this.$store.dispatch('addtowallet',this.stock)
     }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
