<template>
  <div class="show-wo">
    <div class="show-wo__head">
      <h2>
        WO {{ getWO.id }}  
       
      </h2>
      <span v-if="getWO.status">{{ getWO.done }} / {{ getWO.total }}</span>
    </div>
    <div class="menu-wo">
      {{ getWO.platform }}
      <button :class=" {selected : showBins} "  @click="showSetLine = false, showBins = !showBins" v-if="getWO.belongs =='WIPTVAN'">
        Bins
      </button>
      <button :class=" {selected : showSetLine} "  @click="showSetLine = !showSetLine, showBins = false" v-if="getWO.belongs =='WIPTVAN'">
        {{ showSetLine ?  ' WO Details ': ' Line Setup '  }}
      </button>
     
    </div>
    
    <div class="show-wo__body"  v-if="!showSetLine && !showBins">
      <div v-for="(element, index) in getWO.elements" :key="index" >
        <div v-if="element.data && element.data.length">
          <h3>{{ element.name }}</h3>
        <div v-for="(part,i) in element.data" :key="i" class="show-wo__elements">
          <div class="show-wo__gpn">{{ part.gpn }}</div>
          <div class="show-wo__descripcion">{{ part.description }}</div>
          <div class="show-wo__qty">
            {{ part.qty }}
            <span v-if="getWO.status">
              ({{ partials(part.qty,getWO.total,getWO.done) }})
            </span>
          </div>
        </div>
        </div>
        
      </div>
    </div>
    <LineSetUp :wo="getWO" v-if="showSetLine && getWO.belongs =='WIPTVAN'"/>
    <BinsSet :wo="getWO" v-if="showBins && getWO.belongs =='WIPTVAN'"/>
  </div>
</template>
<script>

import LineSetUp from './line_setup/LineSetUp.vue'
import BinsSet from './line_setup/BinsSet.vue'
export default {
  components: {
    LineSetUp,
    BinsSet
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  
  data(){
    return {
      showSetLine: false,
      showBins: false,
    }
  },
  methods:{
    partials(t_qty, t_machines, done_machines){
      return (t_machines-done_machines)*(t_qty/t_machines);
    }
  },
  computed: {
    getWO() {
      return this.$store.getters.getWO(this.id);
    }
  },
  watch: {
    id(newValue, oldValue) {
      if(newValue != oldValue){
        this.showSetLine = false;
        this.showBins = false;
      }
    },
  },

};
</script>
<style lang="scss">
  .show-wo{

    .show-wo__head{
      display: grid;
      grid-template-columns: 50% 50%;
      background-color: black;
      color: white;

      span{text-align: right;}
    }
    .show-wo__body{
      padding: 5px;
      .show-wo__elements{
        display: grid;
        grid-template-columns: 25% 60% 15%;
        
        .show-wo__qty{
          text-align: center;
        }
      }
    }
  }
  .menu-wo{
    text-align: right;
    padding: 2px;
    button {
      background: none;
      color: inherit;
      border: solid 2px black;
      padding: 3px 2px 2px 3px; 
      font: inherit;
      cursor: pointer;
      outline: inherit;
      &.selected{
        background-color: black;
        color: white;
      }
    }
    
  }
</style>