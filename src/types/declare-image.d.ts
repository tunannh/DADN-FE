// declare module "@/assets/bg-image/smartfarm-bg.png";
declare module '*.png' {
    const value: import('react-native').ImageSourcePropType;
    export default value;
}