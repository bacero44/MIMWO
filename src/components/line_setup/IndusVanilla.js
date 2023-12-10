const workStations =[
  {
    number:3,
    description: "MotherBoard",
    undertable:[{
      gpn:'900864',
      type:'SCREWS',
      container:'SMALL BIN'
    }],
    ontable:[
      {
        element:'MEMORY IC, FLASH, BIOS',
        sub:'BIOS',
        container:'TRAY'
      }
    ]
  },
  {
    number:4,
    description: "Powe Cable / Sensor",
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
      },
      {
        element:'PCI / PCBA CARDS',
        sub:'.975',
        container:'TRAY'
      }

    ]
  },
  {
    number:5,
    description: "--",
    undertable:[{
      gpn:'07000906',
      type:'SCREWS',
      container:'SMALL BIN'
    }],
    ontable:[]
  },
  {
    number:6,
    description: "Small Fans",
    undertable:[{
      gpn:'07035341',
      type:'SCREWS',
      container:'SMALL BIN'
    }],
    ontable:[
      {
        element:'FANS, HEATSINK & CPU COOLER',
        sub:'40X40X28MM',
        container:'BIG BIN'
      },
    ]
  },
  {
    number:8,
    description: "Sensor",
    undertable:[{
      gpn:'07022216',
      type:'SCREWS',
      container:'SMALL BIN'
    }],
    ontable:[
      {
        element:'PCI / PCBA CARDS',
        sub:'1.5 INCH',
        container:'BIG BIN'
      },
    ]
  },
  {
    number:12,
    description: "Left Fan",
    undertable:[
      {
        gpn:'900864',
        type:'SCREWS',
        container:'SMALL BIN'
      },
      {
        gpn:'07130633',
        type:'SCREWS',
        container:'SMALL BIN'
      },
      {
        element:'SHEET METAL',
        sub:'FRONT GUARD',
        container:'SMALL BIN'
      },
    ],
    ontable:[
      {
        element:'FANS, HEATSINK & CPU COOLER',
        sub:'40X40X20MM',
        container:'BIG BIN'
      },
    ]
  },
  {
    number:13,
    description: "Rigth Fan",
    undertable:[
      {
        gpn:'900864',
        type:'SCREWS',
        container:'SMALL BIN'
      },
      {
        gpn:'07130633',
        type:'SCREWS',
        container:'SMALL BIN'
      },
    ],
    ontable:[
      {
        element:'FANS, HEATSINK & CPU COOLER',
        sub:'40X40X20MM',
        container:'BIG BIN'
      },
      
    ]
  },
  {
    number:14,
    description: "Miscellaneous",
    undertable:[
      {
        gpn:'900864',
        type:'SCREWS',
        container:'SMALL BIN'
      },
      {
        gpn:'07022216',
        type:'SCREWS',
        container:'SMALL BIN'
      },
      {
        element:'SHEET METAL',
        sub:'COBRA',
        container:'SMALL BIN'
      },
      {
        element:'CORDS, CABLES, AND HARNESSES',
        sub:'SATA',
        container:'SMALL BIN'
      },
    ],
    ontable:[
      
    ]
  },
]
export default workStations;