import axios from "axios";
import {AuthInterface} from './auth';
import { AuthContext } from '../store/auth-context';
import { useContext } from 'react';

const BACKEND_URL = 'https://expensetracker-2c96f-default-rtdb.firebaseio.com';
const {login, signup, getUserData} = new AuthInterface();
//const authCtx = useContext(AuthContext);
//const localId = authCtx.localId;

/* export const getUID = async(uid: string) => {
    const authCtx = useContext(AuthContext);
    const localId = authCtx.localId;
    console.log(uid);
    return uid;
}
 */
export const storeExpense = async(expenseData: any, UID: string) => {
    //const UID = getUID;
    console.log(UID);
    const response = await axios.post(BACKEND_URL + `/${UID}` + '/expenses.json', expenseData);
    const id = response.data.name;
    return id;
}

export const fetchExpenses = async(UID: string) => {
    console.log(UID);
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

export const updateExpense = (id: string, expenseData: any, UID: string) => {
    return axios.put(BACKEND_URL + `/${UID}` + `/expenses/${id}.json`, expenseData);
}

export const deleteExpense = (id: string, UID: string) => {
    return axios.delete(BACKEND_URL + `/${UID}` + `/expenses/${id}.json`);
}