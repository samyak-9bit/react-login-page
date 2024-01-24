import { Keywords} from "../../types/types";


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
export const getAttribute = (item:Object, operand1: keyof Object):any => {
    return item[operand1];

}


// Function to filter the array
export const filterArray = (arr: Object[], operand1: keyof Object, operator: string, operand2: string): Object[] => {
    switch (operator) {
        case ">":
            return arr.filter((item: Object) => {
                const value = getAttribute(item, operand1);
                return typeof value === 'number' && value > Number(operand2);
            });
        case "<":
            return arr.filter((item: Object) => {
                const value = getAttribute(item, operand1);
                return typeof value === 'number' && value < Number(operand2);
            });
        case "=":
            return arr.filter((item: Object) => {
                const value = getAttribute(item, operand1);
                if (typeof value === 'number') {
                    return value === Number(operand2);
                } else return value === operand2;
            });
        default:
            return arr;
    }
};



// Function to implement the smart Search
export const searchInStatement = (str: string, arr: Object[], attributes:string[]): Object[] => {

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
                    const filteredArray = filterArray(arr, operand1 as keyof Object, match.value, operand2);

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
