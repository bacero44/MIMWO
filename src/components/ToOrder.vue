<template>
  <div id="wip">
    <div class="head">
      <div class="title">
        <h2>
          {{ title }} <img src="/img/alert-triangle.svg" title="Edited" v-if="!edited">
        </h2>
      </div>
      <div class="menu">
        <button @click="editable = !editable">
          <img src="/img/toggle-right.svg" v-if="editable">
          <img src="/img/toggle-left.svg" v-if="!editable">
        </button>
      </div>
      
    </div>
    <div class="body">
      <div class="toOrder-item" :class="{'checks': editable}" v-for="(value,key) in items" :key="key">
        <div v-if="editable">
          <button v-if="editable" @click="checker(key)">
            <img src="/img/check-square.svg" v-if="likely(key)">
            <img src="/img/square.svg" v-if="!likely(key)">
          </button>
        </div>
        <div>
          <h4 :title="value.description" v-if="editable" > {{ value.description }} </h4>
          <p :title="value.description" v-if="editable || likely(key)"> {{ key }} x {{ value.qty }} pcs </p>
        </div>
        
      </div>
    </div>
    
    
   
  </div>
</template>
<script>
export default {
  data(){
    return{
      editable: false,
      notLike:[],
    }
  },
  props: {
    items:Object,
    title: String,
  },
  methods:{
    checker(i){
      if (i !== '') {
        if (this.notLike.includes(i)) {
          const index = this.notLike.indexOf(i);
          this.notLike.splice(index, 1);
        } else {
          this.notLike.push(i);
        }
      }
    },
    likely(i){
      if (this.notLike.includes(i)){
        return false;
      }else{
        return true;
      }
    },
    
  },
  computed: {
    edited(){
      return Object.keys(this.notLike).length === 0;
    }
  }
};
</script>

<style lang="scss">
#wip{
  padding: 4px;
  height: 100%;
  
  .head{
    border: solid 1px black;
    display: grid;
    grid-template-columns: auto auto;
    padding-left: 4px;
    padding-right: 4px;
    .title{
      h2{
        img{
          height: 2vh;
          width: auto;
        }
      }
    }
    .menu{
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
          height: 100%;
        }
      }
    }
  }
  .body{
    border-bottom: solid 1px black;
    border-left: solid 1px black;
    border-right: solid 1px black;
    padding: 5px;
    .toOrder-item{
      &.checks{
        display: grid;
        grid-template-columns: 15% 85%;
        div{
          padding: 2px;
        }
        &:not(:last-child){
          border-bottom: solid 1px black;
        }
      }

      
      
      
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
          height: 100%;
        }
      }
      
      h4{
        overflow: hidden; /* Oculta el exceso de texto */
        white-space: nowrap; /* Evita el salto de línea */
        text-overflow: ellipsis; /* Muestra puntos suspensivos */
      }
  }
  }
  
  
}
</style>