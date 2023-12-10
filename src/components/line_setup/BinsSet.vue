<template>
  <div>
    <div>
      <h3>SCREWS <span>(Small Bins)</span></h3>
      <div v-for="value, index in Screws()" :key="index">
        {{ index }} x {{ value }}
      </div>
    </div>

    <div>
      <h3>Small Bins </h3>
      <div v-for="bin in SmallBins()" :key="bin">
        {{ getItem(bin.element, bin.sub).gpn }} x 2
      </div>
    </div>

    <div>
      <h3>Big Bins </h3>
      <div v-for="bin in BigBins()" :key="bin">
        {{ getItem(bin.element, bin.sub).gpn }} x 2
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
  methods: {
    getPlatform(){
      if(this.wo.platform == 'ARCADIA'|| this.wo.platform == 'ARCADIA-M'){
        return ArcadiaWorkStations;
      }
      else if(this.wo.platform == 'INDUS' || this.wo.platform == 'INDUS-S' || this.wo.platform == 'INDUS-18C' || this.wo.platform == 'INDUS-28C'){
        return IndusWorkStations;
      }
      else {
        return [];
      }
    },
    Bins(){
      const elements = this.getPlatform().filter(e => {
        // Verificar si la descripción o cualquier otra propiedad contiene la palabra "bin"
        return (
          e.description.toLowerCase().includes("bin") ||
          e.undertable.some(item => item.container.toLowerCase().includes("bin")) ||
          e.ontable.some(item => item.container.toLowerCase().includes("bin"))
        );
      });
      return elements
    },
    Screws(){
      const screws = this.Bins().filter(e =>
        e.undertable.some(item => item.type === "SCREWS") ||
        e.ontable.some(item => item.type === "SCREWS")
      );

      const gpns = screws.flatMap(e =>
        e.undertable.concat(e.ontable)
        .filter(item => item.type === "SCREWS")
        .map(item => item.gpn)
      );
      
      const totals = gpns.reduce((count, gpn) => {
        count[gpn] = (count[gpn] || 0) + 1;
        return count;
      }, {});

      return totals

    },
    // TODO: improve
    SmallBins(){
      const smallBins = this.Bins().filter(e =>
        e.undertable.some(item => item.container === "SMALL BIN" && item.element && item.sub) ||
        e.ontable.some(item => item.container === "SMALL BIN" && item.element && item.sub) 
      );

      const under = smallBins.flatMap(item =>
        item.undertable.map(({ element, sub }) => ({ element, sub })) 
      );
      
      return under.filter(item => item.element !== undefined && item.sub !== undefined);
    },

    BigBins(){
      const smallBins = this.Bins().filter(e =>
        e.ontable.some(item => item.container === "BIG BIN" && item.element && item.sub) 
      );

      const on = smallBins.flatMap(item =>
        item.ontable.map(({ element, sub }) => ({ element, sub })) 
      );
      
      return on.filter(item => item.element !== undefined && item.sub !== undefined);
    },



    getItem(element,sub){
      const t = this.wo.elements.find(ele =>  ele.name.includes(element) )
      const tt = t.data.find(ele => ele.description.includes(sub))
      return tt;
    },
  }
}
</script>