<template>
  <div style="height:600px;width: 600px; display: flex;flex-direction:column;">
    <vue3-chart-js 
        :id="doughnutChart.id"
        :type="doughnutChart.type"
        :data="doughnutChart.data"
        @before-render="beforeRenderLogic"
    ></vue3-chart-js>
  </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import axios from 'axios'

export default {
  name: 'Chart',
  components: {
    Vue3ChartJs,
  },
  props: {
    id: String
  },
  data(){
    
  },
  setup () {
   // const chartRef = ref(null)
    const doughnutChart = {
      id: 'doughnut',
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            backgroundColor: [
              '#41B883'
            ],
            data: []
          }
        ]
      }
    }
    const beforeRenderLogic = (event) => {
        // resp = []
        /*array.forEach((element, index) => {
            this.resp.push(element);
        });*/
      //...
      //if(a === b) {
      //  event.preventDefault()
      //}
    }
     
    return {
      doughnutChart,
      beforeRenderLogic
    }
  },
  methods:{
       add() {
           axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=' +id+ '&apikey=1L0K210ONUBKP1KR')
           .then((data) => {
              doughnutChart.data.labels = []
              doughnutChart.data.labels.push(Object.keys(obj["Weekly Time Series"]))
              doughnutChart.data.datatsets.data = []
               for (let a of (Object.keys(obj["Weekly Time Series"]) ))
                {
                   doughnutChart.data.datatsets.data.push(obj["Weekly Time Series"][a]["1. open"])
                }
            });
    doughnutChart.update();
}
  }
}
</script>
