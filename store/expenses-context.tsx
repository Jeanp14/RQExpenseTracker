import { createContext, useReducer, useState } from 'react';

type ExpenseDataProps = {
    description: string,
    amount: number,
    date: string
}

/* const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2022-12-19')
    }
];  */

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}: ExpenseDataProps) => {},
    setExpenses: (expenses: any) => {},
    deleteExpense: (id: string) => {},
    updateExpense: (id: string, {description, amount, date}: ExpenseDataProps) => {}
});

const expensesReducer = (state: any, action: any) => {
    switch(action.type) {
        case 'ADD':
            //const id = new Date().toString() + Math.random().toString();
            return [action.payload, ...state];
        case 'SET':
            const inverted = action.payload?.reverse();
            return inverted; 
        case 'DELETE':
            const expenses = state as any[];
            return expenses?.filter((expense: any) => expense.id !== action.payload);
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense: any) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        default:
            return state;
    }
}

const ExpensesContextProvider = ({children}: any) => {

    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    //const [expenseIds, setExpenseIds] = useState<string[]>([]);

    const addExpense = (expenseData: ExpenseDataProps) => {
        dispatch({type: 'ADD', payload: expenseData});
    }

    const setExpenses = (expenses: any) => {
        dispatch({type: 'SET', payload: expenses});
    } 

    const deleteExpense = (id: string) => {
        dispatch({type: 'DELETE', payload: id});
    }

    const updateExpense = (id: string, expenseData: ExpenseDataProps) => {
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return(
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider;