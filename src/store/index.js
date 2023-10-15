
import { createStore } from 'vuex'

export default createStore({
  state: {
    name:'Bacero44',
    wos:[],
    selected:0,
    inventory:{},
  },
  methods: {
    saludar() {
      console.log('¡Hola! ' + this.mensaje);
    }
  },
  getters: {
    getWOs(state) {
      return state.wos;
    },
    getWO:(state) => (id) => {
      if(state.wos.find(o => o.id == id)){
        const i = state.wos.findIndex(o => o.id == id);
        return state.wos[i];
      }else{
        return null;
      }
    },
    //TODO: Improve methods getVanilla y TTLA
    getVanilla(state) {
      return state.wos.filter(e => e.belongs === 'WIPTVAN');
    },
    getTtla(state) {
      return state.wos.filter(e => e.belongs === 'WIPTTLA');
    },
    getVanillaTotals(state,getters){
      return getters.getElementsTotal("WIPTVAN");
    },
    
    getTtlaTotals(state,getters){
      return getters.getElementsTotal("WIPTTLA");
    },
    getWOSelected(state){
      return state.selected;
    },
    
    getElementsTotal:(state) => (param) => {
      const sumaByGpn = {};
      state.wos.forEach(wo => {
        if (wo.belongs === param) {
        if(wo.elements && wo.show){
          wo.elements.forEach(element => {
            if(element.data){
              element.data.forEach(data =>{
                if(data.qty && data.gpn){
                  const { gpn, qty, description } = data;
                  if (sumaByGpn[gpn]) {
                    sumaByGpn[gpn].qty += qty;
                  } else {
                    sumaByGpn[gpn] = { description, qty };
                  }
                }
              });
            }
          }); 
        }
        }
      });
     
      return sumaByGpn;
    },

    getInventory(state){
      return state.inventory;
    },
    getVanillaInventory(state) {
      const filteredData = {};
      for (const key in state.inventory) {
        if (key in state.inventory && "WIPTVAN" in state.inventory[key]) {
          filteredData[key] = {
            description :state.inventory[key].description,
            quantity : state.inventory[key].WIPTVAN
          };
          
        }
      }
      return filteredData;
    },
    //TODO: super redun
    getTtlaInventory(state) {
      const filteredData = {};
      for (const key in state.inventory) {
        if (key in state.inventory && "WIPTTLA" in state.inventory[key]) {
          filteredData[key] = {
            description :state.inventory[key].description,
            quantity : state.inventory[key].WIPTTLA
          };
        }
      }
      return filteredData;
    },
  
  },
  mutations: {
    addList(state,payload){
      if(state.wos.find(o => o.id == payload.id)){
        const i = state.wos.findIndex(o => o.id == payload.id);
        state.wos[i].status= payload.status;
        state.wos[i].platform= payload.platform;
        state.wos[i].part= payload.part;
        state.wos[i].total= payload.total;
        state.wos[i].done=payload.done;
        state.wos[i].sequence=payload.sequence;
        state.wos[i].belongs=payload.belongs;
      }else{
        state.wos.push(payload)
      }
      
    },
    addWO(state,payload){
      if(state.wos.find(o => o.id == payload.id)){
        const i = state.wos.findIndex(o => o.id == payload.id);
        state.wos[i].elements = payload.elements;
      }else{
        state.wos.push(payload)
      }
    },
    setShow(state,id){
      const w = state.wos.find(obj => obj.id == id);
      if (w) {
        w.show = !w.show;
      }
    },
    selectWO(state,id){
      if(state.selected == id){
        state.selected = 0;
      }else{
        state.selected = id;
      }
    },
    addInventory(state,payload){
      state.inventory = payload;
    }
  },
  actions: {
    addToSequence({commit},payload){
      commit('addList',payload)
    },
    addToWO({commit},payload){
      commit('addWO',payload)
    },
    setShowWO({commit},id){
      commit('setShow',id)
    },
    selectWO({commit},id){
      commit('selectWO',id)
    },
    addToInventory({commit}, payload){
      commit('addInventory',payload)
    }

    

  },
  modules: {
  }
})
