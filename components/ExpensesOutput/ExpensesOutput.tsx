import { View, Text, FlatList, StyleSheet } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { GlobalStyles } from '../../constants/styles';

/* const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2022-12-19')
    },
    {
        id: 'e2',
        description: 'A t-shirt',
        amount: 19.29,
        date: new Date('2023-01-17')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 4.49,
        date: new Date('2023-05-03')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 13.89,
        date: new Date('2023-03-15')
    },
    {
        id: 'e5',
        description: 'A PS5',
        amount: 499.99,
        date: new Date('2022-12-21')
    }
]; */

const ExpensesOutput = ({expenses, expensesPeriod, fallbackText}: {expenses: any, expensesPeriod: string, fallbackText?: string}) => {

    let content = <Text style={styles.infoText}>{fallbackText}</Text>;

    if(expenses?.length > 0){
        content = <ExpensesList expenses={expenses}/>
    } 

    return(
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
            {/* <ExpensesList expenses={expenses}/> */}
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        marginTop: 32,
        textAlign: 'center'
    }
})

export default ExpensesOutput;