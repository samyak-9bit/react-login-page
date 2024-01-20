import { Keywords, TableData } from "../../types/types";


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
        key: "is",
        value: "="
    },
]

const attributes: string[] = ["id", "name", "phone", "description", "status", "rate", "balance", "deposit"]


// Function to get attributes of table data
export const getAttribute = (item: TableData, operand1: string) => {
    switch (operand1) {
        case "id":
            return item.id;
        case "balance":
            return item.balance;
        case "deposit":
            return item.deposit;
        case "rate":
            return item.rate;
        case "description":
            return item.description;
        case "name":
            return item.name;
        case "phone":
            return item.phone;
        case "status":
            return item.status;

    }

}


// Function to filter the array
export const filterArray = (arr: TableData[], operand1: string, operator: string, operand2: string): TableData[] => {
    switch (operator) {
        case ">":
            return arr.filter((item: TableData) => {
                const value = getAttribute(item, operand1);
                return typeof value === 'number' && value > Number(operand2);
            });
        case "<":
            return arr.filter((item: TableData) => {
                const value = getAttribute(item, operand1);
                return typeof value === 'number' && value < Number(operand2);
            });
        case "=":
            return arr.filter((item: TableData) => {
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
export const searchInStatement = (str: string, arr: TableData[]): TableData[] => {

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
                    const filteredArray = filterArray(arr, operand1, match.value, operand2);

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
