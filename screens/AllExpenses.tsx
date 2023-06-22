import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext, useEffect, useState } from 'react';
import { ExpensesContext } from '../store/expenses-context';
import axios from 'axios';
import { AuthContext } from '../store/auth-context';

const AllExpenses = () => {
    const expensesCtx = useContext(ExpensesContext);
    const [fetchedExpenses, setFetchedExpenses] = useState<[]>();
    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    useEffect(() => {
        axios.get(
            'https://expensetracker-2c96f-default-rtdb.firebaseio.com/expenses.json?auth=' + token
        ).then((response) => {
            console.log('Log from AllExpenses.tsx: '+ response.data);
            setFetchedExpenses(response.data);
        })
    }, [token]);

    return(
        <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText="No expenses found!"/>
    )
}

const styles = StyleSheet.create({
    
})

export default AllExpenses;