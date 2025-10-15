import { COLORS } from '@/constants/colors';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FAF4',
  },
  imgBackground: {
    width: '100%',
    height: height * 0.35,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 60,
    paddingBottom: 60,
  },
  topIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  iconCircle: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 50,
    elevation: 3,
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    top: 7,
    right: 7,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 5,
  },
  weatherCard: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    marginTop: -50,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  tempText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  cityText: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 4,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 40,
  },

  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: "48%",
    height: 165,
    justifyContent: 'space-between', // 👈 đổi ở đây
    paddingVertical: 20,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  infoValue: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    color: COLORS.text,
  },

  infoLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
});
