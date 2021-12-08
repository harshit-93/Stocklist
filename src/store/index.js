import { createStore } from 'vuex'
import axios from 'axios';
export default createStore({
  state: {
    bestmatches:[],
    desc:"",
    amount: 10000,
    wallet:[],
    user:"no"
  },
  mutations: {
    SET_USER_DATA(state, status) {
      state.user = status
      localStorage.setItem('user', JSON.stringify(status))
      //axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
    }
  },
  actions: {
    mountwallet(context,wa){
         context.state.wallet=JSON.parse(wa)
         console.log(wa,"hghgh");
    },
    async getSuggestion(context,match) {
     // console.log(match);
      if(match.length>2){
       let {data}=await axios.get('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + match + '&apikey=1L0K210ONUBKP1KR')
            console.log(data);
            context.state.bestmatches = data['bestMatches'];
           // console.log(context.state.bestmatches,"harshit");
        }
    },
   async adddesc(context,stock){
     let {data} = await axios.get('https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + stock.key + '&apikey=1L0K210ONUBKP1KR')
          console.log(data);
          context.state.desc = data['Description'];
          console.log(context.state.desc);
    },
    addtowallet(context,st){
      let wa= context.state.wallet
     // console.log('add');
       let updateStatus = wa.filter((stock) => {
         if(stock.name == st.key) {
          console.log('add');
          st.Quantity = parseInt(st.Quantity)
           stock.avgPrice = ((stock.avgPrice*stock.Quantity)+(st.Quantity*st.avgPrice))/(st.Quantity+stock.Quantity)
           stock.avgPrice=stock.avgPrice.toFixed(2)
          // st.Quantity = parseInt(st.Quantity)
           stock.Quantity += st.Quantity;
           console.log("VALUE UPDATED");
           context.state.amount-=(st.avgPrice*st.Quantity)
           return true;
         }
       })
       if(st.key!=''){
         console.log('sell');
       if(updateStatus.length == 0) {
         console.log(updateStatus);
         st.Quantity = parseInt(st.Quantity)
         st.avgPrice=parseFloat(st.avgPrice).toFixed(2)
         wa.push({
          name: st.key,
          Quantity: st.Quantity,
          avgPrice: st.avgPrice
        });
        context.state.amount-=(st.avgPrice*st.Quantity)
       }}
        console.log(wa);
        context.state.wallet=wa        
        context.state.amount = parseFloat(parseFloat(context.state.amount).toFixed(2))
        localStorage.setItem('amount', context.state.amount)
        localStorage.setItem('wallet', JSON.stringify(context.state.wallet))
    },
    sell(context,st){
      const a = context.state.wallet.filter((stock)=>stock.name==st.name)
      console.log(a)
      a.forEach(stock => {
        if(stock.name==st.name)
        {
          stock.Quantity-=st.qty
          context.state.amount+=(stock.avgPrice*st.qty)
        }
      if(stock.Quantity<=0)
      { 
        let a = context.state.wallet.findIndex((stock => {
          return stock.name == st.name;
        }))
        context.state.wallet.splice(a,1)
       }
       context.state.amount = parseFloat(parseFloat(context.state.amount).toFixed(2))
       localStorage.setItem('amount', context.state.amount)
       localStorage.setItem('wallet', JSON.stringify(context.state.wallet))
      })
   },
  async login({ commit }, credentials) {
    console.log(" LOGIN ");
    let { data } = await axios.post('https://2281-117-240-176-98.ngrok.io/login', credentials)
    if (data.status == "present") {
      commit('SET_USER_DATA', data.status)
    } else {
      return data.status;
    }
  },
  async signup({ commit }, credentials) {
    console.log("signup");
     let { data } = await axios.post('https://2281-117-240-176-98.ngrok.io/signup', credentials)
      if(data.status=="present")
        commit('SET_USER_DATA',data.status)
      else
        return data.status
  },
  },
  modules: {}
})