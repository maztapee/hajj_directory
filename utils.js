import {Alert, Linking} from 'react-native';
export const capitalizeFirstLetterOfEachWord = (string) => {
    return string.replace(/\b\w/g, char => char.toUpperCase());
};

export const handleWhatsAppPress = (number) => {
    const url = `whatsapp://send?phone=${number}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url).catch((err) => {
          Alert.alert('Error', 'Unable to open WhatsApp');
        });
      } else {
        Alert.alert('WhatsApp not installed', 'Please install WhatsApp to use this feature');
      }
    });
  };
// const test_touch = () =>{
//     console.log("contact clicked");
// };