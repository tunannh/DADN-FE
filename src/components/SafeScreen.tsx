import { COLORS } from '@/constants/colors';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeScreen = ({ children } : any) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 2,
        backgroundColor: COLORS.background,
      }}
    > 
      <StatusBar style="dark" backgroundColor={COLORS.background} />
      {children}
    </View>
  );
};

export default SafeScreen;
