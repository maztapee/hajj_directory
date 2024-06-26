import * as React from 'react';
import { Button, StyleSheet, View, Text, Image, TouchableOpacity,Alert, Linking, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { capitalizeFirstLetterOfEachWord, handleWhatsAppPress } from '../utils';

function ContactDetailScreen({ navigation, route }) {
  const { name, phoneNumber, whatsapp, office_location, image} = route.params;

  const handlePhoneNumberPress = (number) => {
    if (Platform.OS === 'ios' || Platform.OS === 'android'){
      Linking.openURL(`tel:${number}`).catch((err) =>{
        Alert.alert('Error', 'Unable to open dial pad');
      });
    } else{
        Clipboard.setStringAsync(number).then(() => {
            setCopiedText(number);
            Alert.alert(
              'Copied to Clipboard',
              `Phone number ${number} has been copied to your clipboard.`,
              [{ text: 'OK' }]
            );
        })
      };
  };

  return (
    <View style={styles.detail_screen}>
      <View style={styles.top_screen}>
        <Image source={image} resizeMode="contain" style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.text}>Name: <Text style={{color:'blue'}}>{capitalizeFirstLetterOfEachWord(name)}</Text></Text>
          <Text style={styles.text}>Designation: <Text style={{color:'blue'}}>{office_location}</Text></Text>
          <View style={styles.contactRow}>
            <Image 
                  source={require('../assets/telephone.png')}
                  style={styles.icon}
                  resizeMode='contain'
            />
            <Text style={styles.text}>Phone Number: </Text>
            <TouchableOpacity onPress={()=>handlePhoneNumberPress(phoneNumber)}>
              <Text style={styles.linkText}>{phoneNumber}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contactRow}>
            <Image 
                  source={require('../assets/images/whatsapp-icon.png')}
                  style={styles.icon}
                  resizeMode='contain'
            />
            <Text style={styles.text}>WhatsApp: </Text>
            <TouchableOpacity onPress={() => handleWhatsAppPress(whatsapp)}>
              <Text style={styles.linkText}>{whatsapp ? whatsapp : 'Unavailable'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Go to Home Page"
          onPress={() => navigation.navigate('Home Page')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detail_screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "skyblue",
  },
  top_screen: {
    width: '100%',
    borderWidth: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "skyblue",
    padding: 10,
  },
  details: {
    width: "100%",
    alignContent: "stretch",
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: "white",
    padding: 10,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 4,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    width: 35,
    height: 35,
    borderRadius:17.5,
    marginRight: 10,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "bold",
    color: 'blue',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 60,
  },
});

export default ContactDetailScreen;