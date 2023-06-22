import { useLayoutEffect, useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/ui/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense } from '../util/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

import { AuthContext } from '../store/auth-context';

const ManageExpense = ({route, navigation}: any) => {
    const authCtx = useContext(AuthContext);
    const localId = authCtx.localId;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<any>();

    const expensesCtx = useContext(ExpensesContext);
    
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId; //!! to convert to boolean

    const selectedExpense = expensesCtx.expenses.find((expense: any) => expense.id === editedExpenseId);

    useLayoutEffect(() => {
         navigation.setOptions({
            title: isEditing ? 'Edit' : 'Add'
         });
    }, [navigation, isEditing]);

    const deleteExpenseHandler = async() => {
        setIsSubmitting(true);
        try{
            await deleteExpense(editedExpenseId, localId);
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        }catch(error){
            setError('Could not delete expense - please try again later!');
            setIsSubmitting(false);
        }
    }

    const cancelHandler = () => {
        navigation.goBack();
    }

    const confirmHandler = async(expenseData: any) => {
        setIsSubmitting(true);
        try{
            if(isEditing){
                expensesCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData, localId);
            }else{
                const id = await storeExpense(expenseData, localId);
                expensesCtx.addExpense({...expenseData, id: id});
            }
            navigation.goBack();
        }catch(error){
            setError('Could not save data - please try again later!');
            setIsSubmitting(false);
        }
    }

    /* const errorHandler = () => {
        setError(null);
    } */

    if(error && !isSubmitting){
        return <ErrorOverlay message={error}/>
    }

    if(isSubmitting){
        return <LoadingOverlay/>
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <ExpenseForm 
                    submitButtonLabel={isEditing ? 'Update' : 'Add'}
                    onCancel={cancelHandler}
                    onSubmit={confirmHandler}
                    defaultValues={selectedExpense}
                />
                
                {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}/>
                </View>)}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})

export default ManageExpense;