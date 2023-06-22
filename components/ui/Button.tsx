import { View, Text, Pressable, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

type ButtonProps = {
    children: string,
    onPress: () => void,
    mode?: string,
    style?: any //to add some extra styling 
}

const Button = ({children, onPress, mode, style}: ButtonProps) => {
    return(
        <View style={style}>
            <Pressable 
                onPress={onPress} 
                style={({pressed}) => pressed && styles.pressed}
            >
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: GlobalStyles.colors.primary500
    },
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    flatText: {
        color: GlobalStyles.colors.primary200
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4
    }
});

export default Button;