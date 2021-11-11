<template>
        <section class="main">
            <form class="search" method="post" action="index.html" >
                <input id="search" type="text" name="q" @input="getSuggestion" placeholder="Search..." />
                <ul class="results" >
                    <li><a href="index.html">Search Result #1<br /></a></li>
                </ul>
            </form>
        </section>
    
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
        getSuggestion(event) {
            const results = document.querySelector('.results');
            while (results.firstChild) {
                results.removeChild(results.firstChild);
            }

            fetch('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + event.target.value + '&apikey=1L0K210ONUBKP1KR')
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                data.bestMatches.forEach(element => {
                    console.log(element['1. symbol']);
                    let li = document.createElement('li');
                    let a = document.createElement('a');
                    a.innerText = element['1. symbol'];
                    li.appendChild(a);

                    document.querySelector('.results').appendChild(li);
                });
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
