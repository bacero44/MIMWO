<template>
  <div id="WO-detail">
    <div class="head">
      <h2>WO {{ getWO.id }} <span v-if="getWO.status">{{ getWO.done }} / {{ getWO.total }}</span> </h2>
    </div>
    <div class="content">
      {{ getWO }}
      <div v-for="(element, index) in getWO.elements" :key="index">
        <h3>{{ element.name }}</h3>
        <div v-for="(part,i) in element.data" :key="i" class="elements">
          <div class="gpn">{{ part.gpn }}</div>
          <div class="descripcion">{{ part.description }}</div>
          <div class="qty">
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
  #WO-detail{
    .head{
      background-color: black;
      color: white;
    }
    .content{
      padding: 5px;
      .elements{
        display: grid;
        grid-template-columns: 25% 60% 15%;
        
        .qty{
          text-align: center;
        }
      }
    }
  }
</style>