import React, {useState, useEffect} from 'react';
import { Button, StyleSheet, View, ActivityIndicator, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ContactCard from './ContactCard';
import { genderApi,contactsApi } from '../api/api';




function ContactScreen({ navigation }) {

  const [contactItems, setContactItems] = useState([]);
  const route = useRoute();
  const { locationId } = route.params || {};
  
  
  useEffect(() => {
    // Function to fetch navigation items
    const fetchNavItems = async () => {
      if (locationId) {//checked for existence of locationID
        try {
          const response = await contactsApi.get(`/contacts/${locationId}`);
          if (response.ok) {
            
            let items = response.data;

            if(items && (items?.length)>0){
              items = items.map(async item => {
                const  gender = await genderApi.get(`?name[]=${item.f_name}`);//Using gender.io API to predict gender of contact through first name parameter 
                if(gender.ok){
                  return {...item, gender: (gender.data?.[0]?.gender)?gender.data?.[0]?.gender: "male"} //grabbing gender value in API response and adding to contact array fetched from Hajj contact API
                }else{
                  return {...item, gender: 'male'}// returning default gender as "male"
                }
              });

              items = await Promise.all(items);
            }

            setContactItems(items); //updating contact list items before rerendering

          } else {
            console.error('Error fetching data:', response.problem);
          }
        } catch (error) {
          console.error('Network error:', error);
        }
    }else {
      console.error('locationId is undefined');
    }
    };

    // Fetch the navigation items when the component mounts
    fetchNavItems();
  }, [locationId]);


  
  return (
    <View style={styles.contact_screen}>
      <ScrollView style={styles.scroll_view}>
        {contactItems.length > 0 ? (
          contactItems.map((item, index) => (
            <ContactCard 
            key= {index} 
            name={item.full_name.toLowerCase()} 
            phoneNumber={item.phone} 
            whatsapp={item.whatsapp} 
            imageType={item.gender} 
            office_location={item.category_name}
            onPress={() => navigation.navigate('ContactDetailScreen', item)} // Pass the item as navigation parameter
            />
          ))
        ) : (
          <View style={{justifyContent:"center", alignItems:"center"}}>
              <ActivityIndicator size="larger" color="#0000ff" />
              <Text style={{fontSize:18, fontWeight:"bold"}}>Loading Contact List</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.button_container}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home Page')}>
          <Text style={styles.buttonText}>Go To Home Page</Text>
        </TouchableOpacity>
      </View>
        
    </View>
  );
};
const styles = StyleSheet.create({
  contact_screen:{
    flex: 1,
    alignContent:'center',
    backgroundColor:'white',
    width:"100%",
  },
  scroll_view:{
    marginTop: 20,
    marginBottom: 25,
    marginRight: 4
  },
  button_container:{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 60,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactScreen;
