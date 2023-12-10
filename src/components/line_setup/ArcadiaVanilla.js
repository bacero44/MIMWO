const workStations =[
  {
    number:3,
    description: "Power Cable",
    undertable:[{
      gpn:'07096185',
      type:'SCREWS',
      container:'SMALL BIN'
    }],
    ontable:[
      {
        element:'CORDS, CABLES, AND HARNESSES',
        sub:'CABLE',
        container:'BIG BIN'
      }
    ]
  },
  {
    number:5,
    description: 'Mother Board',
    undertable:[{
      gpn:'900864',
      type:'SCREWS',
      container:'SMALL BIN'
    }],
    ontable:[]
  },
  {
    number:6,
    description: "Filler",
    undertable:[
      {
        gpn:'900864',
        type:'SCREWS',
        container:'SMALL BIN'
      }
    ],
    ontable:[
      {
        element:'SHEET METAL',
        sub:'BRACKET',
        container:'BIG BIN'
        
      }
    ]
  },
  {
    number:7,
    description: 'Bios',
    undertable:[],
    ontable:[
      {
        element:'MEMORY IC, FLASH, BIOS',
        sub:'BIOS',
        container:'TRAY'
      },
      {
        element:'PCI / PCBA CARDS',
        sub:'TEMPERATURE SENSOR',
        container:'TRAY'
      }
    ]
  },
  {
    number:9,
    description: 'BMC',
    undertable:[],
    ontable:[
      {
        element:'MEMORY IC, FLASH, BIOS',
        sub:'BMC',
        container:'TRAY'
      }
    ]
  },
]

export default workStations;