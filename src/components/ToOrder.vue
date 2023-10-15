<template>
  <div id="wip">
    <div class="head">
      <div class="title">
        <h2>
          {{ title }} <img src="/img/alert-triangle.svg" title="Edited" v-if="!edited">
        </h2>
        
      </div>
      <div class="menu">
        <div>
          <button v-if="haveInvetary && !editable" @click="shoppingList = !shoppingList" >
            <img src="/img/cart-shopping.svg" class="stock">
          </button>
        </div>
        <div>
          <button v-if="haveInvetary && !editable" @click="stock = !stock" >
            <img src="/img/stock.svg" class="stock">
          </button>
        </div>
        <div>
          <button @click="editable = !editable">
            <img src="/img/toggle-right.svg" v-if="editable">
            <img src="/img/toggle-left.svg" v-if="!editable">
          </button>
        </div>
        
        
        
      </div>
      
    </div>
    <div class="body">
      <table  v-if="!editable">
        <tr class="table-head">
          <th>Part</th>
          <th>Qty</th>
          <th v-if="stock">WIP</th>
          <th v-if="stock">ASRSB</th>
        </tr>
        <tbody v-for="(value,key) in parts" :key="key">
          <tr v-if="likely(key)" :class=" !enough(value.qty,value.wip, value.asrsb) && stock ? 'gray' : '' ">
            <td class="left" :title="value.description">{{ key }}</td>
            <td class="right">{{ value.qty }}</td>
            <td class="right" v-if="stock">{{ value.wip }}</td>
            <td class="right" v-if="stock">{{ value.asrsb }}</td>
          </tr>
        </tbody>
        
      </table>
      <div v-if="editable">
        <div class="editable-list" v-for="(value,key) in parts" :key="key">
          <div class="left">
            <button @click="checker(key)">
              <img src="/img/check-square.svg" v-if="likely(key)">
              <img src="/img/square.svg" v-if="!likely(key)">
            </button>
          </div>
          <div class="top"> <span :title="value.description">{{ value.description }}</span> </div>
          <div class="bottom">gpn: {{ key }} x {{ value.qty }} pcs</div>
        </div>
      </div>

    <div class="shopping-list" v-if="shoppingList && !editable">
      <div class="title">
        <h4>Shopping List</h4>
        <span v-if="includeWip"> Incl. {{ wip }}</span>
        <span v-if="!includeWip"> NO {{ wip }}</span>
        <button @click="includeWip = !includeWip">
          <img src="/img/boxes1.svg" v-if="includeWip" title="Include WIPAREA">
          <img src="/img/boxes2.svg" v-if="!includeWip" title="NO Include WIPAREA">
        </button>
      </div>
      
      <div class="" v-for="(value,key) in parts" :key="key">
        <div v-if="shop(value.qty,includeWip ? value.wip : 0, value.asrsb) > 0 && likely(key)">
          {{ key }} x  {{ shop(value.qty,includeWip ? value.wip : 0, value.asrsb) }} pcs
        </div>
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
      stock: false,
      shoppingList: false,
      includeWip: true
    }
  },
  props: {
    items:Object,
    title: String,
    wip: String,
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
    shop(q, w, a){
      if(q <= w){
        return 0;
      }else{
        q = q-w;
        if(q > a){
          q = a;
        }
      }
      
      
      return q;
    },
    enough(qty,wip, asrsb){
      return wip+asrsb >= qty ? true : false 
    }
    
  },
  computed: {
    edited(){
      return Object.keys(this.notLike).length === 0;
    },
    inventory(){
      return this.$store.getters.getInventory;
    },
    haveInvetary(){
      return Object.keys(this.inventory).length > 0 ? true: false;
    },
    parts(){
      const parts = {}
      const self = this;
      for (const key in self.items) {
        let description = self.items[key].description;
        let qty = self.items[key].qty;
        let asrsb = 0;
        let wip = 0;
        if(Object.keys(self.inventory).length > 0){
          if(self.inventory[key] && 'ASRSB' in self.inventory[key]){
            asrsb = self.inventory[key]['ASRSB'];
          }
          if(self.inventory[key] && self.wip in self.inventory[key]){
            wip = self.inventory[key][self.wip];
          }
        }
        let shop = 0;
        let miss = 0;
        if(qty > asrsb){
          shop = asrsb;
          miss = qty-asrsb;
        }else{
          shop = qty;
        }

        
        parts[key]={
          description: description,
          qty: qty,
          asrsb: asrsb,
          wip: wip,
          shop: shop,
          miss: miss
        }
      }
      return parts
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

      display: grid;
      grid-template-columns: 33% 33% 33%;
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
          &.stock{
            width: auto;
            height: 80%;
          }
        }
      }
    }
  }
  .body{
    border-bottom: solid 1px black;
    border-left: solid 1px black;
    border-right: solid 1px black;
    padding: 5px;
    
    .editable-list{
      padding-top: 5px;
      padding-bottom: 5px;

      &:not(:last-child){
        border-bottom: 1px solid;
      }
      

      display: grid;
    
      .left{
        grid-column: 1;
        grid-row: 1 / span 2;
        margin-top: auto;
        margin-bottom: auto;
      }
      .top{
        grid-column: 2;
        grid-row: 1 ;

        
        overflow: hidden; /* Oculta el exceso de texto */
        white-space: nowrap; /* Evita el salto de línea */
        text-overflow: ellipsis;
        
        
        
      }
      .bottom{
        grid-column: 2;
        grid-row: 2 ;
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
      
     
    }
    table{
      border: 0px;
      width: 100%;
      border-spacing:0; /* Removes the cell spacing via CSS */
      
      .table-head{
        background-color: black;
        color: white;
      }
      .left{
        text-align: left;
      }
      .right{
        text-align: right;
      }
      td{
        border-bottom: 1px solid;
      }
      .gray{
        background-color: gray;
      }
    }
    .shopping-list{
      margin-top: 15px;
      .title{
        padding-left: 2px;
        background-color: black;
        color: white;
        display: grid;
        grid-template-columns: auto 30% 10%;
        h4{
          display: flex;
  align-items: center;
        }
        span{
          display: flex;
          align-items: center;
          text-align: right;
          font-size: 95%;
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
            height: 80%;
          }
        }
      }
    }
  }
  
  
}
</style>