import { createStore } from 'vuex'

export default createStore({
  state: {
    //stock:{},
    wallet:[]
  },
  mutations: {
  },
  actions: {
    addtowallet(context,st){
      let wallet= context.state.wallet
       let updateStatus = wallet.filter((stock) => {
         if(stock.name == st.key) {
           stock.avgPrice = ((stock.avgPrice*stock.Quantity)+(st.Quantity*st.avgPrice))/(st.Quantity+stock.Quantity)
           stock.Quantity += st.Quantity;
           console.log("VALUE UPDATED");
           return true;
         }
       })
       if(updateStatus.length == 0) {
         console.log(updateStatus);
         wallet.push({
          name: st.key,
          Quantity: st.Quantity,
          avgPrice: st.avgPrice
        });
       }
        console.log(wallet);
        context.state.wallet=wallet
        localStorage.wallet=JSON.stringify(context.state.wallet)
    },
    sell(context,st){
      const a = context.state.wallet.filter((stock)=>stock.name==st.name)
      console.log(a)
      a.forEach(stock => {
        if(stock.name==st.name)
        {
          stock.Quantity-=st.qty
        }
      if(stock.Quantity<=0)
      { 
        let a = context.state.wallet.findIndex((stock => {
          return stock.name == st.name;
        }))
        context.state.wallet.splice(a,1)
        localStorage.wallet=JSON.stringify(context.state.wallet)
       }
      })
   }
  },
  modules: {}
})