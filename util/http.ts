import axios from "axios";

const BACKEND_URL = 'https://expensetrackerrq-default-rtdb.firebaseio.com';

export const storeExpense = async({expenseData, UID}: {expenseData: any, UID: string}): Promise<string> => {
    //console.log(UID);
    const response = await axios.post(BACKEND_URL + `/${UID}` + '/expenses.json', expenseData);
    const id = response.data.name;
    return id;
}

export const fetchExpenses = async(UID: string) => {
    //console.log(UID);
    const response = await axios.get(BACKEND_URL + `/${UID}` + '/expenses.json');

    const expenses = [];
    //console.log(response.data);
    for(const key in response.data){
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }
        expenses.push(expenseObj);
    }
    return expenses;
}

export const updateExpense = ({id, expenseData, UID}: {id: string, expenseData: any, UID: string}) => {
    return axios.put(BACKEND_URL + `/${UID}` + `/expenses/${id}.json`, expenseData);
}

export const deleteExpense = ({id, UID}: {id: string, UID: string}) => {
    return axios.delete(BACKEND_URL + `/${UID}` + `/expenses/${id}.json`);
}