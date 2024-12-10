import { StyleSheet } from 'react-native';

export const theme = {
  light: {
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#000000',
    textSecondary: '#666666',
    primary: '#2196F3',
    border: '#e0e0e0',
    modalOverlay: 'rgba(0,0,0,0.5)',
  },
  dark: {
    background: '#121212',
    surface: '#2C2C2C',
    text: '#ffffff',
    textSecondary: '#A0A0A0',
    primary: '#2196F3',
    border: '#404040',
    modalOverlay: 'rgba(0,0,0,0.7)',
  }
};

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});