<template>

  <div id="ExcelUpper">
    <label for="files-upload">
      <img src="/img/upload.svg" alt="Descripción de la imagen">
      <span>Load</span>
    </label>  
    <input id="files-upload" type="file" :multiple="true" @change="handleFilesUpload" accept=".xlsx, .xls, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
  </div>
  
</template>

<script>
import { read } from 'xlsx';
import { mapActions } from 'vuex';
export default{
  props: ['excelType'],
  
  data(){
    return{
      title: "",
      elements:{
        WIPTVAN:[
          'PROCESSORS',
          'MOTHERBOARDS',
          'PCI/PCBACARDS',
          'CORDS,CABLES,ANDHARNESSES',
          'MEMORYIC,FLASH,BIOS',
          'FANS,HEATSINK&CPUCOOLER',
          'SHEETMETAL',
          'HARDWAREANDFASTNERS',
          'HARDWAREANDFASTNERS',
          'REFERENCEDOCUMENTS,SPECS',
          'SHOPFLOORROUTING',
        ],
        WIPTTLA:[
          'FGI&ASSEMBLIES',
          'MEMORYMODULES',
          'PCI/PCBACARDS',
          'CORDS,CABLES,ANDHARNESSES',
          'FLASHCARDS',
          'GUARDS&BAFFLES',
          'SHEETMETAL',
          'SERVICEPARTS-NONINVENTORY',
          'HARDWAREANDFASTNERS',
          'SHOPFLOORROUTING',
        ]
      }
      
      
    }
  },
  methods:{
    ...mapActions(['addToSequence','addToWO','addToInventory']),
    addElementToSequence(payload){
      this.addToSequence(payload);
    },
    addElements(payload){
      this.addToWO(payload);
    },
    addInventory(payload){
      this.addToInventory(payload);
    },

        
    textWithoutSpaces(text){
      if (text != null){
        return text.replace(/\s/g, '');
      }else{
        return "!-NULL-!";
      }
    },
   
    handleFilesUpload(event){
      const self = this;
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = read(data, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          let trimmedStr = worksheet['A'+1]?.v.replace(/\s/g, '');
          let trimmedStr2 = worksheet['B'+1]?.v.replace(/\s/g, '');
          trimmedStr = trimmedStr !== null && trimmedStr !== undefined && trimmedStr !== '' ? trimmedStr : trimmedStr2;
          
          switch (trimmedStr) {
            case 'WORKORDERTRAVELERFORM' :
              self.WOExcelHandler(worksheet);
            break;
            case 'WORKORDERRELEASESEQUENCEREPORT':
              self.SequenceExcelHandler(worksheet);
            break;
            case 'MIMINVENTORYBYBIN':
              self.InventoryExcelHandler(worksheet);
            break;
            
            default:
              break;
          }
          

        };
        reader.readAsArrayBuffer(files[i]);
      }

    },
    WOExcelHandler(worksheet){
      const self = this;
      let i = 25;
      let last = 0;
      
      do{
        i++;
        let str = worksheet['A'+i]?.v;
        if (str != null ){
          const trimmedStr = str.replace(/\s/g, '');
          if(trimmedStr == "SHOPFLOORROUTING"){
            last = i;
          }
        }
      }while(last == 0 || i == 1000)// 1000 Break
      
      const fundElements =[];
      const belongs = worksheet['A'+5]?.v;
      const elementsList = self.elements[belongs]

      for(let i = 25; i<=last; i++){
        const element = elementsList.indexOf(self.textWithoutSpaces(worksheet['A'+i]?.v));
        if(element !== -1) {
          let ti = i+1;
          let tf = 0;
          for(let x = i+1; x <= last; x++ ){
            if(elementsList.includes(self.textWithoutSpaces(worksheet['A'+x]?.v))){
              tf = x-1;
              break; 
            }
          }
          const newKeyName = worksheet['A'+i]?.v;
          const newKeyValues = [ti, tf];
          fundElements[newKeyName] = newKeyValues;
        }
      }
      const finalElements = [];
      Object.keys(fundElements).forEach((key) => {
        const data = []
        for(let i = fundElements[key][0]; i<= fundElements[key][1]; i++ ){
          if(worksheet['A'+i]?.v != null && worksheet['J'+i]?.v != null && worksheet['AX'+i]?.v != null){
            data.push({
              gpn: worksheet['A'+i]?.v,
              description: worksheet['J'+i]?.v,
              qty: worksheet['AX'+i]?.v,
            });
          }
        }
        finalElements.push({
          name: key,
          data:data
        });
      });
      const id = worksheet['AN'+5]?.v.replace(/\*/g, "");
      self.addElements({
        id: id,
        line: worksheet['O'+5]?.v,
        belongs:belongs,
        elements:finalElements,
        show: true,
        sequence : null,
      });
    },
    SequenceExcelHandler(worksheet){
      const self = this;
      const wos=[];
      const range = worksheet['!ref'];
      const rangeCoordinates = range.split(':');
      const lastCell = rangeCoordinates[1];
      const lastCellCoordinates = lastCell.match(/[A-Z]+|[0-9]+/g);
      const lastCellRow = parseInt(lastCellCoordinates[1]);
      for(let t = 1; t <= lastCellRow; t++){
        let address = 'A' + t; // Dirección de la celda
        let str =worksheet[address]?.v;
        if (str != null){
          let address2 = 'AD'+t;
          let trimmedStr = str.replace(/\s/g, '');
          if(trimmedStr == "ASMLINE:" && (worksheet[address2]?.v == "WIPTVAN" || worksheet[address2]?.v == "WIPTTLA")){
            wos.push(t);
          }
        }
      }
      wos.forEach(function(e){
        let et = e;
        let blank = 0;
        do{
          et = et+1; 
          let address = 'B' + et;
          let str =worksheet[address]?.v;
          if (str == null){
            blank++;
          }else{
            blank = 0;
            if(str != "WO NUM"){
              let sec = et+1;
              self.addElementToSequence({
                id: str,
                line: worksheet['C'+e]?.v,
                status:worksheet['D'+et]?.v,
                platform:worksheet['L'+et]?.v,
                part:worksheet['AG'+sec]?.v,
                total:worksheet['AR'+sec]?.v,
                done:worksheet['AS'+sec]?.v,
                sequence:et,
                belongs:worksheet['AD'+e]?.v,
              });
            }
          }
        }while(blank<=4)
      });
    },
    InventoryExcelHandler(worksheet){
      const self = this;
      const items={};
      //TODO: duplicate, create a function
      const range = worksheet['!ref'];
      const rangeCoordinates = range.split(':');
      const lastCell = rangeCoordinates[1];
      const lastCellCoordinates = lastCell.match(/[A-Z]+|[0-9]+/g);
      const lastCellRow = parseInt(lastCellCoordinates[1]);
      for(let t = 1; t <= lastCellRow; t++){
        let str =worksheet['B'+t]?.v;
        if(str !== null && str !== undefined && str !== ''){
          str = str.replace(/-R/g, '');
          let place = worksheet['J'+t]?.v;
          if(place == "WIPTTLA" || place == "WIPTVAN" || place == "ASRSB"){
            if (str in items){
              if (place in items[str]){
                items[str][place] = items[str][place] + worksheet['M'+t]?.v
              } else {
                items[str][place] = worksheet['M'+t]?.v;
                
              }
            } else{
              items[str]= {
                description: worksheet['T'+t]?.v,
                [place]: worksheet['M'+t]?.v,

              }
            }
          }
          
        }
      }
      self.addInventory(items);
    }
  }
}
</script>

<style lang="scss">
  #ExcelUpper{
    text-align: center;
    label{
      display: block;
      cursor: pointer;
      img{
        
        width: auto;
          height: 2.5vh;
      }
      span{
        display: block;
        
      }
    }
    
  }
   
  #files-upload{
    display: none;
  }

  
</style>