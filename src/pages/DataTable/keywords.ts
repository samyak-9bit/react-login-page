import { Keywords, TableData } from "../../types/types";
import { getEncoding } from 'js-tiktoken';

const tiktoken = getEncoding('cl100k_base');

export const keywords:Keywords[]=[
    {
        key:"less",
        value:"<"
    },
    {
        key:"more",
        value:">"
    },
    {
        key:"greater",
        value:">"
    },
    {
        key:"equal",
        value:"="
    },
    {
        key:"is",
        value:"="
    },
]

const attributes:string[]=["id","name","phone","description","status","rate","balance","deposit"]

// export const filterArray=(arr: TableData[],operand1:string,operator:string,operand2:string)=>{
//     switch(operator){
//         case ">":
//             switch(operand1){
//                 case "id":
//                     const filteredArray = arr.filter((item:TableData)=>{
//                         return item.id >
//                     })
//              }
//     }
// }


export const searchInStatement = (str: string, arr: TableData[]) => {
    const tokens = tiktoken.encode(str);
    // console.log(tokens);

    const wordsArray = str.toLowerCase().split(/\s+/);
    let previousIndex = -1;
  
    for (let i = 0; i < wordsArray.length; i++) {
      const word = wordsArray[i];
  
      const match = keywords.find((keyword) => word === keyword.key.toLowerCase());
  
      if (match) {
        const operatorIndex = i;
        console.log(`Operator: ${match.key}`);
  
        for (let j = operatorIndex - 1; j > previousIndex; j--) {
          const operand1 = wordsArray[j];
          if (attributes.includes(operand1)) {
            console.log(`Operand1: ${operand1}`);
            let operand2;

            if (wordsArray[operatorIndex+1] === 'than' || wordsArray[operatorIndex+1] === 'to') {
                operand2 = wordsArray[operatorIndex + 2];
            } else {
                operand2 = wordsArray[operatorIndex + 1];
            }
            console.log(`Operand2 ${operand2}`);

    
        }
  
        previousIndex = operatorIndex;
        
      }
    }
  };

}
