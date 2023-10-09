<template >
  <div class="container">
      <div v-for="(element, index) in elements" :key="index" class="elements">
        <div>{{ index }}</div>
        <div> x </div>
        <div>{{ element.quantity }} </div>
        <div>{{ element.description }}</div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    
  },
  props: {
    elements: Object,
  },
  methods:{
    
    
  },
  computed: {
   
  }
};
</script>

<style lang="scss">
.container{
  padding: 10px;
  .elements{
 
  display: grid;
  grid-template-columns: 10% min-content 10% auto;
  grid-gap: 10px;
  div:last-child {
    padding-left: 50px; /* Ajusta el espacio adicional para la última columna */
  }
  border-bottom: 1px solid gray;
  
  }
}

</style>