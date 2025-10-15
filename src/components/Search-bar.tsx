import { StyleSheet, Text, TextInput, View } from "react-native";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { COLORS } from "@/constants/colors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.textColor,
    }
})
const SearchBar = () => {
    return (
        <View style={styles.container}>
            <EvilIcons name="search" size={30} color={COLORS.textColor} />
            <TextInput style={styles.input} placeholder="Search devices" autoCapitalize="none" />
        </View>
    )
}

export default SearchBar