<template>
  <div>
    <div class="line" v-for="station in range(1,totalStations)" :key="station">
      <div class="station">
        <div class="number">
          {{ station }}
        </div>
        <div class="station-description" v-if="getStation(station)">
          <h4>{{ getStation(station).description }}</h4>
          <h5  v-if="Object.keys(getStation(station).ontable).length !== 0">On table</h5>
          <div class="station-table">
            <div class="station-table-on" v-for="ontable in getStation(station).ontable" :key="ontable">
              <div class="station-table-elements">{{ ontable.sub }}</div>
              <div class="station-table-elements">{{ getItem(ontable.element,ontable.sub).gpn }}</div>
              <div class="station-table-elements">{{ ontable.container }}</div>
            </div>
          </div>
          <h5 v-if="Object.keys(getStation(station).undertable).length !== 0">Under table</h5>
          <div class="station-table">
            <div class="station-table-under" v-for="under in getStation(station).undertable" :key="under">
              <div class="station-table-elements">
                {{ under.element && under.sub ?  under.sub : under.type }}
              </div>
              <div class="station-table-elements">
                {{ under.element && under.sub ?  getItem(under.element,under.sub).gpn : under.gpn }}
              </div>
              <div class="station-table-elements">{{ under.container }}</div>
            </div>
          </div>
         
        </div>
        
        
      </div>

    </div>
  </div>
</template>

<script>
import ArcadiaWorkStations from './ArcadiaVanilla';
import IndusWorkStations from './IndusVanilla';

export default {
  props: {
    wo: {
      type: Object,
      required: true
    }
  },
  
  data(){
    return{
      totalStations:14,
      
   
    }
  },
  methods: {
    range(start, end) {
      return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    },
    getStation(n){
      const result = this.stations.filter(e => e.number === n);
      return result.length > 0 ? result[0] : false;
    },
    getItem(element,sub){
      const t = this.wo.elements.find(ele =>  ele.name.includes(element) )
      const tt = t.data.find(ele => ele.description.includes(sub))
      return tt;
    },

    getSet(){
      //TODO: create fuctions for Arcadia and indus kind
      if(this.wo.platform == 'ARCADIA' || this.wo.platform == 'ARCADIA-M'){
        return ArcadiaWorkStations;
      }
      else if(this.wo.platform == 'INDUS' || this.wo.platform == 'INDUS-S' || this.wo.platform == 'INDUS-18C' || this.wo.platform == 'INDUS-28C'){
        return IndusWorkStations;
      }
      else{
        return [];
      }
    }
    
  },
  computed:{
    stations(){
      return this.getSet()
    }
  }
};
</script>

<style lang="scss">
 .line{
    margin: 5px;
    border: solid 2px;
 }
 .station{
  display: grid;
  grid-template-columns: 5% auto;
 }
 .number{
  background-color: black;
  color: white;
 }
 .station-description{
  
  h5{
    padding: 2px;
    background-color: black;
    color: white;
  }
  h4{
    padding: 2px;
  }
 }
 .station-table{
  display: flex;
 }
 .station-table-on, .station-table-under{
  padding: 1px;
  &:not(:first-child){
    border-left: 1px solid;
  }
 }
</style>