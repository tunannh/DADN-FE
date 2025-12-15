// import bgImage from '@/assets/images/Cooking-background.png';
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Link, Redirect, router } from 'expo-router';
import ShareButton from '@/components/share-button';
import { COLORS } from '@/constants/colors';
import bgImage from '@/assets/bg-image/bg-image.png';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    top: {
        padding: 30,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 250,
    },
    wcText: {
        fontSize: 40,
        fontWeight: '600',
    },
    faText: {
        fontSize: 35,
        color: COLORS.primary,
        marginVertical: 15,
        fontWeight: 'bold',
    },
    coteText: {
        fontSize: 15,
    },

    bot: {
        // flex: 0.5,
        marginTop: 50,
    },
})
const WelcomePage = () => {
    return (
        <ImageBackground style={{
            flex: 1,
        }}
            source={bgImage}
        >
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.3)']} style={{ flex: 1 }} >
                <View style={styles.container}>
                    <View style={styles.top}>
                        <Text style={styles.wcText}>Welcome to</Text>
                        <Text style={styles.faText}>Smart irrigation system</Text>
                        <Text style={styles.coteText}>Automatic plant watering system</Text>
                    </View>

                    <View style={styles.bot}>
                        <ShareButton
                            title='Start with your email'
                            onPress={() => router.push('/(auth)/SignIn')}
                            btnStyle={{
                                // backgroundColor: '#2c2c2c',
                                backgroundColor: 'green',
                                borderRadius: 30,
                                marginHorizontal: 60,
                                borderColor: '#505050',
                                borderWidth: 1,
                            }}
                            textStyle={{ color: 'white' }}
                        />
                    </View>
                </View>
            </LinearGradient>
        </ImageBackground>
    )
}

export default WelcomePage;