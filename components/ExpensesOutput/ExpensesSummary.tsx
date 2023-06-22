import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const ExpensesSummary = ({expenses, periodName}: {expenses: any, periodName: string}) => {

    const expensesSum = expenses.reduce((sum: number, expense: any) => {
        return sum + expense.amount
    }, 0);

    return(
        <View style={styles.container}>
            <Text style={styles.periodStyle}>{periodName}</Text>
            {/* toFixed() sets the number of decimals to the number passed in parameter*/}
            <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    periodStyle: {
        fontSize: 16,
        color: GlobalStyles.colors.primary400
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500
    }
})

export default ExpensesSummary;