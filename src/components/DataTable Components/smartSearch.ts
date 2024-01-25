import { Keywords, MyObject} from "../../types/types";


export const keywords: Keywords[] = [
    {
        key: "less",
        value: "<"
    },
    {
        key: "more",
        value: ">"
    },
    {
        key: "greater",
        value: ">"
    },
    {
        key: "equal",
        value: "="
    },
    {
        key: "lower",
        value: "<"
    },
    {
        key: "higher",
        value: ">"
    },
    {
        key: "is",
        value: "="
    },
]

// const attributes: string[] = ["id", "name", "phone", "description", "status", "rate", "balance", "deposit"]


// Function to get attributes of table data
export const getAttribute = (item:MyObject, operand1: keyof MyObject):any => {
    return item[operand1];

}


// Function to filter the array
export const filterArray = (arr: MyObject[], operand1: keyof MyObject, operator: string, operand2: string): MyObject[] => {
    switch (operator) {
        case ">":
            return arr.filter((item: MyObject) => {
                const value = getAttribute(item, operand1);
                return typeof value === 'number' && value > Number(operand2);
            });
        case "<":
            return arr.filter((item: MyObject) => {
                const value = getAttribute(item, operand1);
                return typeof value === 'number' && value < Number(operand2);
            });
        case "=":
            return arr.filter((item: MyObject) => {
                const value = getAttribute(item, operand1);
                if (typeof value === 'number') {
                    return value === Number(operand2);
                } else return value.toLowerCase() === operand2.toLowerCase();
            });
        default:
            return arr;
    }
};



// Function to implement the smart Search
export const searchInStatement = (str: string, arr: MyObject[], attributes:string[]): MyObject[] => {

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

                    if (wordsArray[operatorIndex + 1] === 'than' || wordsArray[operatorIndex + 1] === 'to') {
                        operand2 = wordsArray[operatorIndex + 2];
                    } else {
                        operand2 = wordsArray[operatorIndex + 1];
                    }
                    console.log(`Operand2 ${operand2}`);
                    const filteredArray = filterArray(arr, operand1 as keyof MyObject, match.value, operand2);

                    console.log(`Filtered Array:`);
                    filteredArray.forEach(item => {
                        console.log(item);
                    });

                    console.log(`Filtered Array Length: ${filteredArray.length}`);
                    return filteredArray;

                }
            }
        }
    };
    return [];
}
