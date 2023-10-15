<template>
  <div id="board" :class="{'alone-screen': justLines, 'share-screen': !justLines}">
    
    <div>
      <div id="head">
        <div id="title">
          <h1>Bacero44</h1>
          Just keeping the line running... 
        </div>
        <div id="menu">
          <div class="meun-element">
            <button class="parts" @click="parts = !parts,selectWO(0)">
              <img src="/img/list.svg" alt="Descripción de la imagen">
              <span>Parts</span>
            </button>
          </div>
          <div class="meun-element">
            <UpExcels/>
          </div>
        </div>
        
      </div>
      <div id="main">
        
        <div class="lines">
          <div class="name">
            <h2>TVAN</h2>
          </div>
          <div>
            <div class="departments" v-for="(line, index) in getLines(getVanilla)" :key="index">
              <h2>{{ line }}</h2>
              <div class="worders" :class="{'alone-screen': justLines, 'share-screen': !justLines}">
                <WO v-for="(wo,i) in getOrderByLine(getVanilla,line)" :key="i" :ElementsBefore=" i > 0 ? getOrderByLine(getVanilla,line)[i-1].elements : wo.elements  " :wo="wo"/>
              </div>
            </div>

            <div class="inventory" v-if="Object.keys(getVanillaInventory).length > 0">
              <div class="title">
                <h3>Inventory</h3>
                <button class="parts" @click="inventory.tvan = !inventory.tvan">
                  -
                </button>
              </div>
              <LineInventory :elements = getVanillaInventory  v-if="inventory.tvan"/>
            </div>
          </div>
         
          
        </div>

        <div class="lines">
          <div class="name">
            <h2>TTLA</h2>
          </div>
          <div>
            <div class="departments" v-for="(line, index) in getLines(getTtla)" :key="index">
              <h2>{{ line }}</h2>
              <div class="worders" :class="{'alone-screen': justLines, 'share-screen': !justLines}">
                <WO v-for="(wo,i) in getOrderByLine(getTtla,line)" :key="i" :ElementsBefore=" i > 0 ? getOrderByLine(getTtla,line)[i-1].elements : wo.elements  " :wo="wo"/>
              </div>
            </div>
            <div class="inventory" v-if="Object.keys(getTtlaInventory).length > 0">
              <div class="title">
                <h3>Inventory</h3>
                <button class="parts" @click="inventory.ttla = !inventory.ttla">
                  -
                </button>
              </div>
              <LineInventory :elements = getTtlaInventory  v-if="inventory.ttla" />
            </div>
          </div>
        </div>

      </div>
    </div>
   
    <div id="ToOrder-container" v-if="parts && WOSelected ==0">
      <div class="ToOrder-title">
        <h2>USING PARTS</h2>
      </div>
      <div class="toOrder-content">
        <ToOrder :items ="getVanillaTotals" title='TVAN' wip='WIPTVAN'/>
        <ToOrder :items ="getTtlaTotals" title='TTLA' wip='WIPTTLA' />
      </div>
    </div>

    <div id="WODetails-container" v-if="WOSelected > 0">
      <WODetails :id="WOSelected" />
    </div>

    
  </div>

    <div>
     
     
    </div>
</template>

<script>
import WO from './components/WO.vue'
import ToOrder from './components/ToOrder.vue'
import UpExcels from './components/UpExcels.vue'
import WODetails from './components/WODetails.vue'
import LineInventory from './components/LineInventory.vue'
import { mapActions } from 'vuex';

export default {
  name: 'App',
  data(){
    return{
      parts: false,
      inventory:{
        ttla: false,
        tvan: false
      }
    }
  },
  components: {
      WO,
      UpExcels,
      ToOrder,
      WODetails,
      LineInventory
  },
  computed: {

    wos(){
      return this.$store.getters.getWOs;
    },
    getVanilla(){
      return this.$store.getters.getVanilla;
    },
    getTtla(){
      return this.$store.getters.getTtla;
    },

    getVanillaTotals(){
      return this.$store.getters.getVanillaTotals;
    },
    getTtlaTotals(){
      return this.$store.getters.getTtlaTotals;
    },
    justLines(){
      if(this.parts || this.WOSelected != 0){
        return false;
      }else{
        return true;
      }
    },
    WOSelected() {
      return this.$store.getters.getWOSelected;
    },

    getInventory(){
      return this.$store.getters.getInventory;
    },
    getVanillaInventory(){
      return this.$store.getters.getVanillaInventory;
    },
    getTtlaInventory(){
      return this.$store.getters.getTtlaInventory;
    }
    
    
  },
  methods: {
    ...mapActions(['selectWO']),
    handleMenu(v) {
      if(this.addFile[v]){
        this.addFile[v] = !this.addFile[v];
      }
      else{
        this.addFile.fill(false);
        this.addFile[v] = !this.addFile[v];
      }
    },
    getLines(o){
      const lines = new Set();
      o.forEach(objeto => {
        lines.add(objeto.line);
      });
      return [...lines];
    },
    getOrderByLine(l,n){
      return Object.values(l).filter((e) => e.line == n).sort((a, b) => {
        return a.sequence - b.sequence;
      });
    }
  }
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&display=swap');
* {
  margin: 0;
  padding: 0;
  font-family: 'Agdasima', sans-serif;
}
#board{
  
  display: grid;
 
  padding: 10px;
  max-width: 100vw;  

  &.alone-screen{
    grid-template-columns: 100%;
  }
  &.share-screen{
    grid-template-columns: 65% 35%;
  }
}
#main{
  display: block;
}

#head{
  display: grid;
  grid-template-columns: 50% 50%;
  #title{
    
    h1{
      font-family: 'Agdasima', sans-serif;
      font-weight: 700;
      
    }
  }
  #menu{
    display: grid;
    grid-template-columns: auto auto;
    justify-content: end;
    grid-gap: 10px; 
    margin-bottom: 10px;
    .meun-element{
      border: solid black 2px;
      padding: 2px;
      button{
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        img{
          display: block;
          width: auto;
          height: 2.5vh;
        }
        span{
          display: block;
          
        }
      }
    }
    
  }
}


.lines{
  display: grid;
  grid-template-columns: 5vw auto;
  border: solid 4px black;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  .name{
    position: relative;
    display: flex;
    justify-content: center;
    background-color: black;
    h2{
      color: white;
      writing-mode: vertical-rl;
      text-orientation: upright;
      text-align: center;
    }
  }
  .departments{
    padding: 10px 10px 10px 10px;
    h2{
      padding-left: 3px;
      background-color: black;
      color: white;
    }
    .worders{
      padding-top: 10px;
      display: grid;
      
      row-gap: 10px;
      column-gap: 10px;

      &.alone-screen{
        grid-template-columns: repeat(10,auto);
      }
      &.share-screen{
        grid-template-columns: repeat(8,auto);
      }
    }
  }
  .inventory{
    width: 100%;
    .title{
      display: grid;
      grid-template-columns: auto 20px;
      background-color: black;
      color: white;
      button{
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        img{
          display: block;
          width: auto;
          height: 2.5vh;
        }
        span{
          display: block;
          
        }
      }
    }
  }
}

#ToOrder-container{
  padding-left: 10px;
  
  
  .ToOrder-title{
    background-color: black;
    color: white;
    text-align: center;
    h2{
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
  .toOrder-content{
    padding-top: 10px;
    display: grid;
    grid-template-columns: 50% 50%;
    //column-gap: 10px;
    border: solid black 4px;
  }
 

}
#WODetails-container{
  margin-left: 10px;
  border: solid black 4px;
}



</style>
