import { View, Text, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

type InputProps = {
    label: string,
    style: any,
    invalid: boolean,
    textInputConfig: object
}

const Input = ({label, style, invalid, textInputConfig}: any) => {

    const inputStyles = [styles.input];

    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiline as any)
    }

    if(invalid){
        inputStyles.push(styles.invalidInput as any)
    }

    return(
        //<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput {...textInputConfig} style={inputStyles}/>
        </View>
        //</TouchableWithoutFeedback>
        
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8
    },
    label: {
        fontSize: 12,
        marginBottom: 4,
        color: GlobalStyles.colors.primary100
    },
    input: {
        fontSize: 18,
        padding: 6,
        borderRadius: 6,
        color: GlobalStyles.colors.primary700,
        backgroundColor: GlobalStyles.colors.primary100
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50
    }
})

export default Input;