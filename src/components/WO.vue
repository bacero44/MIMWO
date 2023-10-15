<template>
  
  <div class="mini-wo"  :class=" woColor()">
    
    <div class="mini-wo__head" @click="wo.elements ? selectWO(wo.id): '' ">
      <h3>{{ wo.id }}</h3>
      <span v-if="wo.platform">{{wo.platform }}</span>
      <span v-if="!wo.platform">--</span>
    </div>
    <div class="mini-wo__body" @click="wo.elements ? selectWO(wo.id): '' ">
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
    <div class="mini-wo__footer">
      <button class="mini-wo__button" @click="setShowWO(wo.id)" v-if="wo && wo.elements">
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
    woColor(){
      let t = "";
      
      if(this.wo.elements){
        t = "mini-wo_white";
      }else{
        t = "mini-wo_gray";
      }
      if(this.wo.id == this.WOSelected)
        t =  "mini-wo_black";
      t = !this.wo.status? t+" min-wo_border_dashed" : t+" min-wo_border_solid" 
      
      return t;
    }
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

  .mini-wo{
    text-align: center;
    border-width: 1px;
    &.mini-wo_black{
      background-color: black;
      color: white;
      border-color: white;
    }
    &.mini-wo_white{
      background-color: white;
      color: black;
      border-color: black;
    }
    &.mini-wo_gray{
      background-color: gray;
      color: black;
      border-color: gray;
    }
    &.min-wo_border_dashed{
      border-style: dashed;
      
    }
    &.min-wo_border_solid{
      border-style: solid;
      
    }
    


    .mini-wo__head{
      
    }
    .mini-wo__body{

    }
    .mini-wo__footer{
      width: 100%;
      text-align: right;
      .mini-wo__button{
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