<template>
  <div class="wos-index" :class="{'inverse': wo.id == WOSelected, 'normal': wo.id != WOSelected }">
    <article @click="selectWO(wo.id)"> 
    <div class="wo-head" :class="{'inverse': wo.id == WOSelected, 'normal': wo.id != WOSelected, 'alert':!SameLastOne  }">
      <h3>{{ wo.id }}</h3>
      <span v-if="wo.platform">{{wo.platform }}</span>
      <span v-if="!wo.platform">--</span>
    </div>
    <div class="wo-body">
      <p>
        <b v-if ="wo.status" >{{ wo.status }}</b> 
        <b v-if ="!wo.status" >--</b> 
      </p>
      <p>
        <b v-if ="wo.done || wo.done == 0" >{{ wo.done }}</b> 
        <b v-if ="!wo.done && wo.done !=0" >-</b> 
        /  
        <b v-if ="wo.total" >{{ wo.total }}</b> 
        <b v-if ="!wo.total" >-</b> 
      </p>
    </div>
  </article>
    <div class="wo-footer">
      <button @click="setShowWO(wo.id)" v-if="wo && wo.elements">
        <img src="/img/check-square.svg" v-if="wo.show">
        <img src="/img/square.svg" v-if="!wo.show">
      </button>
    </div>
  </div>
  
    
    
  
</template>


<script>
import { mapActions } from 'vuex';
export default {
  props: {
    wo: {
      type: Object,
      required: true
    },
    ElementsBefore:{
      type: Object,
    }
  },
  methods:{
    ...mapActions(['setShowWO','selectWO']),
  },
  computed: {
    WOSelected() {
      return this.$store.getters.getWOSelected;
    },
    SameLastOne(){
      if(JSON.stringify(this.ElementsBefore) ==  JSON.stringify(this.wo.elements)){
        return true;
      }
      else{
        return false;
      }
    }
    
  }

};
</script>

<style lang="scss">
  .wos-index{
    
    &.normal{
      background-color: white;
      border: solid 1px black;
      color: black;
    }
    &.inverse{
      background-color: black;
      border: solid 1px white;
      color: white;
    }

    .wo-head{
      text-align: center;
      &.normal{
        border-bottom: solid 1px black;
      }
      &.inverse{
        border-bottom: solid 1px white;
      }
      &.alert{
        background-image: url("/public/img/alert-triangle.svg");
        background-size: 20%; /* Cambia el tamaño de la imagen (ejemplo: 100px) */
        background-position: right center; /* Coloca la imagen a la derecha y centrada verticalmente */
        background-repeat: no-repeat;
        
      }
    }
    .wo-body{
      text-align: center;
    }
    .wo-footer{
      text-align: right;
      button{
        background: none;
        color: inherit;
        border: none;
        padding-top: 3px;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        img{
          width: auto;
          height: 2vh;
        }
      }
    }
  }
  
</style>