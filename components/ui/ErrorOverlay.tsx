import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const ErrorOverlay = ({message}: {message: string}) => {
    return(
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error has occurred!</Text>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text: {
        marginBottom: 8,
        textAlign: 'center',
        color: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default ErrorOverlay;