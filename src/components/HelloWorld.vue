<template>
        <section class="main">
            <form class="search" method="post" action="index.html" >
                <input id="search" type="text" name="q" @input="getSuggestion" placeholder="Search..." autocomplete="off" />
                <ul class="results">
                    <li v-for="(match, index) in bestMatches" :key="index" @click="getDesc"> {{ match['1. symbol'] }} <br /></li>
                </ul>
            </form>
        </section>
        <p>{{ description }}</p>
    
</template>

<script>
/* eslint-disable eslint-disable-next-line */
import axios from 'axios';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      bestMatches: [],
      description: ""
    }
  },
  methods: {
        getSuggestion(event) {
            // const results = document.querySelector('.results');
            // while (results.firstChild) {
            //     results.removeChild(results.firstChild);
            // }

            axios.get('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + event.target.value + '&apikey=1L0K210ONUBKP1KR')
            .then((data) => {
                console.log(data);
                this.bestMatches = data.data['bestMatches'];
                console.log(this.bestMatches);
                // data.bestMatches.forEach(element => {
                //     console.log(element['1. symbol']);
                //     let li = document.createElement('li');
                //     let a = document.createElement('a');
                //     a.innerText = element['1. symbol'];
                //     li.appendChild(a);

                //     document.querySelector('.results').appendChild(li);
                // });
            });
        },
        getDesc(event){
          console.log(event.target.innerText);
          axios.get('https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + event.target.innerText + '&apikey=1L0K210ONUBKP1KR')
            .then((data) => {
                console.log(data);
                this.description = data.data['Description'];
                console.log(this.description);
                
            });
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
