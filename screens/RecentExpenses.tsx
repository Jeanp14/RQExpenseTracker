import { StyleSheet, Text, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

import { AuthContext } from '../store/auth-context';
import { useGetExpenses } from '../hooks/Queries';

const RecentExpenses = () => {
    //use AuthContext to get user localId (uid)
    const {localId} = useContext(AuthContext);

    const expensesCtx = useContext(ExpensesContext);

    const {data, error, isFetching} = useGetExpenses({uid: localId, onSuccess: (data) => {console.log(data)}});
    expensesCtx.setExpenses(data);

    /* const errorHandler = () => {
        setError(null);
    }
 */
    if(error && !isFetching){
        return <ErrorOverlay message={error as string}/>
    }

    if(isFetching){
        return <LoadingOverlay/>
    }

    const recentExpenses = data?.filter((expense: any) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense?.date > date7DaysAgo;
    })

    return(
        <ExpensesOutput 
            expenses={recentExpenses} 
            expensesPeriod="Last 7 days" 
            fallbackText="No expenses for the last 7 days!"
        />
    )
}

const styles = StyleSheet.create({
    
})

export default RecentExpenses;