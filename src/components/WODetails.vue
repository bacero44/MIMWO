<template>
  <div class="show-wo">
    <div class="show-wo__head">
      <h2>WO {{ getWO.id }}  </h2><span v-if="getWO.status">{{ getWO.done }} / {{ getWO.total }}</span>
    </div>
    <div class="show-wo__body">
      <div v-for="(element, index) in getWO.elements" :key="index">
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
</template>
<script>

export default {
  props: {
    id: {
      type: String,
      required: true
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
  }

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
</style>