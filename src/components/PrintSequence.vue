<template>
  <button @click="print">
    <img src="/img/print1.svg" >
    <span>Print</span>
  </button>
  <div>
    <div ref="contenidoImprimir" style=" display: none ;">
      <div class="areas" v-for="area in areas()" :key="area" style="font-size: 11pt; width: 100%;" >
          
          <div class="areas__body">
            <div class="areas__lines" v-for="line in lines(area)" :key="line" style="padding: 4px;"> 
              <h3 style=" background-color: black; color: white; margin-bottom: 5px;">{{ line }}</h3>
              <table cellspacing="0" style="width: 100%; border: 2px solid; font-size: 11px;"> 
                <tr>
                  <th style="border: 1px solid;">Work Order</th>
                  <td v-for="e in elementsName(line)" :key="e" style="border: 1px solid; font-size: 0.8em;"> {{ e }} </td>
                </tr>
                <tr v-for="wo in workOrdes(line)" :key="wo.id">
                  <th style="border: 1px solid; font-size: 1.5em;">{{ wo.id }}</th>
                  <td v-for="e in elementsName(line)" :key="e" style="border: 1px solid;">
                    <span v-for="ele in elements(wo.elements, e)" :key="ele"> 
                      {{ ele.gpn }} x {{ ele.qty }} <br>
                    </span>
                    
                  </td>
                </tr>
              </table>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  
  methods: {
    areas(){
      return [...new Set(this.wos.map(obj => obj.belongs))];
      
    },
    lines(b){
      const belons = this.wos.filter(obj => obj.belongs === b);
      return new Set(belons.map(obj => obj.line));
    },
    elementsName(l){
     //const names = this.workOrdes(l).map(item => item.elements).flat();
     //return [... new Set(names.map(e => e.name))];

      const elements = this.workOrdes(l).map(item => item.elements).flat();
      const filtered = elements.filter(i => i.data.length > 0);
      return new Set(filtered.map(obj => obj.name));
      
     
     
    },
    elements(elements, e){
      const t = elements.filter(obj => obj.name === e);
      return t.map(obj => obj.data).flat();
    },
    
    
    workOrdes(l){
      const t = this.wos.filter(obj=> obj.line === l);
      const orders = t.sort((a, b) => {
        if (a.sequence === null && b.sequence !== null) {
          return 1
        } else if (a.sequence !== null && b.sequence === null) {
          return -1; 
        } else {
          return a.sequence - b.sequence; 
        }
      });
      return orders;
    },
    splitDescription(text){
      const t = text.split(',')
      if (t.length >= 4) {
        return t.slice(0, 4).join(',') ;
      } else {
        return text;
      }
    },
    print() {
      const content = this.$refs.contenidoImprimir.innerHTML;
      const print = window.open('','ventana_impresion', 'popimpr');
      print.document.open();
      print.document.write(content);
      print.document.close();
      print.onload = function () {
        print.print();
        //print.close();
      };
    },
  },
  computed:{
    wos(){
      return this.$store.getters.getWOs;
    },
  }
};
</script>

<style lang="scss">
 
</style>