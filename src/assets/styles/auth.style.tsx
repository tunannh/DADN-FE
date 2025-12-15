import { COLORS } from "@/constants/colors";
import { Dimensions, StyleSheet } from "react-native";


const { height } = Dimensions.get("window");

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },
  keyboardView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  imageContainer: {
    height: height * 0.2,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems
      : 'center',
  },
  imageContainerSignUp: {
    height: height * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 320,
    height: 320,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginVertical: 40,
    marginBottom: 20
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    flex: 1
  },
  inputContainer: {
    marginBottom: 30,
    position: 'relative',
  },
  labelInput: {
    fontSize: 18,
    color: COLORS.titleColor,
    fontWeight: '600',
    marginBottom: 6,
  },
  errorText: {
    position: 'absolute',
    bottom: -20,
    left: 10,
    fontSize: 12,
    color: 'red',
  },
  textInput: {
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1.2,
    backgroundColor: COLORS.bgColor,
    borderColor: COLORS.borderColor,
    borderRadius: 15
  },
  eyeButton: {
    position: 'absolute',
    right: 5,
    top: 45,
    padding: 4,
  },
  authButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 30,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
  linkContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  linkText: {
    fontSize: 16,
  },
  link: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  }
})