import { View, Text, FlatList, StyleSheet } from 'react-native';
import ExpenseItem from './ExpenseItem';

const ExpensesList = ({expenses}: any) => {
    return(
            <FlatList 
                data={expenses} 
                renderItem={(itemData) => {
                    return <ExpenseItem {...itemData.item}/>
                }}
                keyExtractor={(item) => item.id}
            />
    );
}

const styles = StyleSheet.create({

})

export default ExpensesList;