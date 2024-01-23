import { Status, TableData } from "../../types/types";


export const dummyData:TableData[]=[
{
    id:1,
    name:"Ann Culhane",
    phone:"9131200223",
    description:"Ldjkd sdfjkdbf cbsjds dhjkhd ei djadj iasdn idhakdn  asdhiasda usadha",
    status:Status.Open,
    rate:70.00,
    balance:-270.00,
    deposit:500.00,
},
{
    id:2,
    name:"Ann Culhane",
    phone:"9131200223",
    description:"Ldjkd sdfjkdbf cbsjds dhjkhd ei djadj iasdn idhakdn  asdhiasda usadha",
    status:Status.Inactive,
    rate:70.00,
    balance:270.00,
    deposit:500.00,
},
{
    id:3,
    name:"Ann Culhane",
    phone:"9131200223",
    description:"Ldjkd sdfjkdbf cbsjds dhjkhd ei djadj iasdn idhakdn  asdhiasda usadha",
    status:Status.Due,
    rate:70.00,
    balance:-270.00,
    deposit:500.00,
},
{
    id:4,
    name:"Ann Culhane",
    phone:"9131200223",
    description:"Ldjkd sdfjkdbf cbsjds dhjkhd ei djadj iasdn idhakdn  asdhiasda usadha",
    status:Status.Paid,
    rate:70.00,
    balance:270.00,
    deposit:500.00,
},
{
    id:5,
    name:"Ann Culhane",
    phone:"9131200223",
    description:"Ldjkd sdfjkdbf cbsjds dhjkhd ei djadj iasdn idhakdn  asdhiasda usadha",
    status:Status.Open,
    rate:70.00,
    balance:100.00,
    deposit:500.00,
},
{
    id:6,
    name:"Ann Culhane",
    phone:"9131200223",
    description:"Ldjkd sdfjkdbf cbsjds dhjkhd ei djadj iasdn idhakdn  asdhiasda usadha",
    status:Status.Inactive,
    rate:70.00,
    balance:-270.00,
    deposit:500.00,
},
{
    id:7,
    name:"Ann Culhane",
    phone:"9131200223",
    description:"Ldjkd sdfjkdbf cbsjds dhjkhd ei djadj iasdn idhakdn  asdhiasda usadha",
    status:Status.Due,
    rate:70.00,
    balance:289.00,
    deposit:500.00,
},
{
    id:8,
    name:"Ann Culhane",
    phone:"9131200223",
    description:"Ldjkd sdfjkdbf cbsjds dhjkhd ei djadj iasdn idhakdn  asdhiasda usadha",
    status:Status.Paid,
    rate:70.00,
    balance:200.00,
    deposit:500.00,
},
];


export const dummyDynamicData = {
    "type": {
        "num_models": "Number",
        "img_url": "URL",
        "max_car_id": "Number",
        "id": "Number",
        "name": "String",
        "avg_horsepower": "Number",
        "avg_price": "Number"
    },
    "data": [
        {
            "num_models": 3,
            "img_url": "http://www.carlogos.org/uploads/car-logos/Chrysler-logo-1.jpg",
            "max_car_id": 104,
            "id": 1,
            "name": "chrysler",
            "avg_horsepower": 291,
            "avg_price": 32971
          },
          {
            "num_models": 8,
            "img_url": "http://www.carlogos.org/uploads/car-logos/Honda-logo-1.jpg",
            "max_car_id": 152,
            "id": 2,
            "name": "honda",
            "avg_horsepower": 190,
            "avg_price": 27965
          }
    ]
}

const metaData = dummyDynamicData.type;
type MetaDataKeys = keyof typeof metaData;
type Data = {
  [key in MetaDataKeys]: string; 
};
const dynamicInterface: Data = {} as Data;
for (const key in metaData) {
  dynamicInterface[key as MetaDataKeys] = metaData[key as MetaDataKeys];
}
console.log(dynamicInterface);
