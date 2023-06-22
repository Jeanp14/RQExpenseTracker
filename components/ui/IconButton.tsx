import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

type IconButtonProps = {
    icon: any,
    size: number,
    color: string | undefined,
    onPress: () => void
}

const IconButton = ({icon, size, color, onPress}: IconButtonProps) => {
    return(
        <Pressable 
            onPress={onPress} 
            style={({pressed}) => pressed && styles.pressed}
        >
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={size} color={color}/>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 8,
        marginHorizontal: 8,
        marginVertical: 2,
        borderRadius: 24
    },
    pressed: {
        opacity: 0.75
    }
})

export default IconButton;