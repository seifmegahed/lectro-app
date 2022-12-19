export const products = [
  {
    id: 1,
    name: "PERI-100",
    power: 100,
    series: "PERI",
    type: "Street Light",
    bom: {
      driver: { itemName: "Driver 100W", uom: "Unit", quantity: 1 },
      led: { itemName: "PCB 24 LED", uom: "Unit", quantity: 3 },
      lens: { itemName: "24 Led", uom: "Unit", quantity: 3 },
      heatSink: { itemName: "LT-07", uom: "Kg", quantity: 3.5 },
      body: { itemName: "", uom: "Unit", quantity: 1 },
      driverBox: { itemName: "Gest Box", uom: "Unit", quantity: 1 },
      glands: { itemName: "", uom: "Unit", quantity: 2 },
    },
  },
  {
    id: 2,
    name: "PERI-150",
    power: 150,
    series: "PERI",
    type: "Street Light",
    bom: {
      driver: { itemName: "Driver 150W", uom: "Unit", quantity: 1 },
      led: { itemName: "PCB 24 LED", uom: "Unit", quantity: 4 },
      lens: { itemName: "24 Led", uom: "Unit", quantity: 4 },
      heatSink: { itemName: "LT-07", uom: "Kg", quantity: 4 },
      body: { itemName: "", uom: "Unit", quantity: 1 },
      driverBox: { itemName: "", uom: "Unit", quantity: 1 },
      glands: { itemName: "", uom: "Unit", quantity: 2 },
    },
  },
  {
    id: 3,
    name: "PERI-200",
    power: 200,
    series: "PERI",
    type: "Street Light",
    bom: {
      driver: { itemName: "Driver 200W", uom: "Unit", quantity: 1 },
      led: { itemName: "PCB 24 LED", uom: "Unit", quantity: 5 },
      lens: { itemName: "24 Led", uom: "Unit", quantity: 5 },
      heatSink: { itemName: "LT-07", uom: "Kg", quantity: 5 },
      body: { itemName: "", uom: "Unit", quantity: 1 },
      driverBox: { itemName: "Gest Box", uom: "Unit", quantity: 1 },
      glands: { itemName: "", uom: "Unit", quantity: 2 },
    },
  },
  {
    id: 4,
    name: "NHE-20",
    power: 20,
    series: "NH Emergancy",
    type: "Flood Light",
    bom: {
      driver: { itemName: "Meanwell LDD1500HW", uom: "Unit", quantity: 1 },
      led: { itemName: "COB 20W", uom: "Unit", quantity: 1 },
      lens: { itemName: "HB100-A", uom: "Unit", quantity: 1 },
      heatSink: { itemName: "LT-07", uom: "Kg", quantity: 2 },
      body: { itemName: "", uom: "Unit", quantity: 2 },
      driverBox: { itemName: "Gest Box", uom: "Unit", quantity: 1 },
      glands: { itemName: "", uom: "Unit", quantity: 2 },
    },
  },
  {
    id: 5,
    name: "NH-20",
    power: 20,
    series: "NH",
    type: "Flood Light",
    bom: {
      driver: { itemName: "Driver 20W", uom: "Unit", quantity: 1 },
      led: { itemName: "COB 20W", uom: "Unit", quantity: 1 },
      lens: { itemName: "HB100-A", uom: "Unit", quantity: 1 },
      heatSink: { itemName: "LT-07", uom: "Kg", quantity: 2 },
      body: { itemName: "", uom: "Unit", quantity: 2 },
      driverBox: { itemName: "Gest Box", uom: "Unit", quantity: 1 },
      glands: { itemName: "", uom: "Unit", quantity: 2 },
    },
  },
  {
    id: 6,
    name: "NH-60",
    power: 60,
    series: "NH",
    type: "Flood Light",
    bom: {
      driver: { itemName: "Driver 60W", uom: "Unit", quantity: 1 },
      led: { itemName: "COB 60W", uom: "Unit", quantity: 1 },
      lens: { itemName: "HB100-A", uom: "Unit", quantity: 1 },
      heatSink: { itemName: "LT-07", uom: "Kg", quantity: 2 },
      body: { itemName: "", uom: "Unit", quantity: 2 },
      driverBox: { itemName: "", uom: "Unit", quantity: 1 },
      glands: { itemName: "", uom: "Unit", quantity: 2 },
    },
  },
  {
    id: 7,
    name: "NH-80",
    power: 80,
    series: "NH",
    type: "Flood Light",
    bom: {},
  },
  {
    id: 8,
    name: "NH-100",
    power: 100,
    series: "NH",
    type: "Flood Light",
    bom: {
      driver: { itemName: "Driver 100W", uom: "Unit", quantity: 1 },
      led: { itemName: "COB 100W", uom: "Unit", quantity: 1 },
      lens: { itemName: "HB120-A", uom: "Unit", quantity: 1 },
      heatSink: { itemName: "LT-07", uom: "Kg", quantity: 4 },
      body: { itemName: "", uom: "Unit", quantity: 2 },
      driverBox: { itemName: "", uom: "Unit", quantity: 1 },
      glands: { itemName: "", uom: "Unit", quantity: 2 },
    },
  },
  {
    id: 9,
    name: "NH-150",
    power: 150,
    series: "NH",
    type: "Flood Light",
    bom: {
      driver: { itemName: "Driver 150W", uom: "Unit", quantity: 1 },
      led: { itemName: "COB 150W", uom: "Unit", quantity: 1 },
      lens: { itemName: "HB120-A", uom: "Unit", quantity: 1 },
      heatSink: { itemName: "LT-07", uom: "Kg", quantity: 4 },
      body: { itemName: "", uom: "Unit", quantity: 2 },
      driverBox: { itemName: "", uom: "Unit", quantity: 1 },
      glands: { itemName: "", uom: "Unit", quantity: 2 },
    },
  },
  {
    id: 10,
    name: "NH-200",
    power: 200,
    series: "NH",
    type: "Flood Light",
    bom: {
      driver: { itemName: "Driver 200W", uom: "Unit", quantity: 1 },
      led: { itemName: "COB 100W", uom: "Unit", quantity: 2 },
      lens: { itemName: "HB120-A", uom: "Unit", quantity: 2 },
      heatSink: { itemName: "LT-07", uom: "Kg", quantity: 6 },
      body: { itemName: "", uom: "Unit", quantity: 2 },
      driverBox: { itemName: "", uom: "Unit", quantity: 1 },
      glands: { itemName: "", uom: "Unit", quantity: 2 },
    },
  },
  {
    id: 11,
    name: "NH-400",
    power: 400,
    series: "NH",
    type: "Flood Light",
    bom: {
      driver: { itemName: "Driver 200W", uom: "Unit", quantity: 2 },
      led: { itemName: "COB 100W", uom: "Unit", quantity: 4 },
      lens: { itemName: "HB120-A", uom: "Unit", quantity: 4 },
      heatSink: { itemName: "LT-07", uom: "Kg", quantity: 12 },
      body: { itemName: "", uom: "Unit", quantity: 2 },
      driverBox: { itemName: "", uom: "Unit", quantity: 2 },
      glands: { itemName: "", uom: "Unit", quantity: 2 },
    },
  },
];

export const productsCategories = [
  {
    name: "Street Light",
    products: [
      "PERI-100",
      "PERI-150",
      "PERI-200",
    ]
  },
  {
    name: "Emergancy",
    products: [
      "NHE-20",
    ]
  },
  {
    name: "Flood Light",
    products: [
      "NH-20",
      "NH-60",
      "NH-80",
      "NH-100",
      "NH-150",
      "NH-200",
      "NH-400",
    ]
  },
  {
    name: "High Bay",
    products: [
      "HB-100",
      "HB-150",
    ]
  },

]