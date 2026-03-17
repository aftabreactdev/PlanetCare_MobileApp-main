import { Alert } from 'react-native';

export const showMessage = (title, message) => {
  Alert.alert(title, message);
};