import { StyleSheet, Text, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

import { AuthContext } from '../store/auth-context';

const RecentExpenses = () => {
    //use AuthContext to get user localId (uid)
    const authCtx = useContext(AuthContext);
    const localId = authCtx.localId;

    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState<any>();

    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        const getExpenses = async() => {
            setIsFetching(true);
            try{
                const expenses = await fetchExpenses(localId);
                expensesCtx.setExpenses(expenses);
            }
            catch(error){
                setError('Could not fetch expenses');
            }
            setIsFetching(false);
        }
        getExpenses();
    }, []);

    /* const errorHandler = () => {
        setError(null);
    }
 */
    if(error && !isFetching){
        return <ErrorOverlay message={error}/>
    }

    if(isFetching){
        return <LoadingOverlay/>
    }

    const recentExpenses = expensesCtx.expenses.filter((expense: any) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo;
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