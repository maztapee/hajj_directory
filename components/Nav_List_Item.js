import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Image} from 'react-native';
import { create } from 'apisauce';
import { useFocusEffect } from '@react-navigation/native';

const api = create({
  baseURL: 'http://api.hajjwayfinder.com.ng/',
  headers: { Accept: 'application/json' },
});

const Nav_List_Item = ({navigation, status})=>{

  const [navItems, setNavItems] = useState([]);
  const [highlighted, setHighlighted] = useState(null);

  const fetchNavItems = useCallback(async ()=> {
    try {
      if (navItems.length) return;
      const response = await api.get('locations');
      if (response.ok) {
        setNavItems(response.data);
      } else {
        console.error('Oops!, An error occurred while fetching data:', response.problem);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }, [navItems])

  useFocusEffect(()=> {
    if (status && navItems.length < 1){
      fetchNavItems();
    }else{
      return;
    }  
    console.log('I am focused', status);
  })
  
  useEffect(() => {
    console.log('I am focused useeffect');
    // Fetch the navigation items when the component mounts
    fetchNavItems();
  }, [fetchNavItems]);

  const capitalizeFirstLetterOfEachWord = (string) => {
    return string.replace(/\b\w/g, char => char.toUpperCase());
  };
  const toggleHighlight =(name, id)=>{
    
    setHighlighted(highlighted === name ? null : name);
    // onLocationSelect(id);
    navigation.navigate('Contact List', { locationId: id });
  };
  return (
    <View style={styles.listItem}>
      {navItems.length > 0 ? (
        <FlatList
          data = {Object.values(navItems)}
          renderItem={({item}) =>(
            <View style={styles.item}>
              <Image source={require('../assets/images/phone_widget.jpg')} style={styles.image}/>
              <TouchableOpacity onPress={()=> {toggleHighlight(item.location_name, item.location_id);}}>
                <Text style={[{fontWeight: 'normal'}, highlighted === item.location_name && styles.highlighted]}>
                  {capitalizeFirstLetterOfEachWord(item.location_name)}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item,index) => index.toString()}
        />) : (
        <View style={{justifyContent:"center", alignItems:"center"}}>
          <ActivityIndicator size="larger" color="#0000ff" />
          <Text style={{fontSize:18, fontWeight:"bold"}}>Loading Locations</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      marginLeft: 20, // Adjust spacing as needed
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5, // Adjust spacing between items as needed
  
    },
    image: {
      maxWidth: 25,
      height: 15,
      marginRight: 5
    },
    item:{
      alignItems: 'center',
      marginTop: 5,
      flexDirection: 'row',
      minHeight: 30
    },
    highlighted:{
      color:'white',
      backgroundColor: 'black',
      fontWeight: 'bold'
    }
  });

export default Nav_List_Item;




// const nav_items = {
//   item_1 : {
//     name:"MAKKAH",
//     location: "",
//     contact: ""
//   },
//   item_2 : {
//     name:"MADINAH",
//     location: "",
//     contact: ""
//   },
//   item_3 : {
//     name:"MUASSASA",
//     location: "",
//     contact: ""
//   },
//   item_4 : {
//     name:"FIELD OFFICE",
//     location: "",
//     contact: ""
//   },
//   item_6 : {
//     name:"NRT",
//     location: "",
//     contact: ""
//   },
//   item_7 : {
//     name:"MEDICAL TEAM",
//     location: "",
//     contact: ""
//   },
//   item_8 : {
//     name:"SERVICE PROVIDERS",
//     location: "",
//     contact: ""
//   },
//   item_9 : {
//     name:"DEPARTURE CENTERS",
//     location: "",
//     contact: ""
//   },
//   item_10 : {
//     name:"STATES",
//     location: "",
//     contact: ""
//   },
//   item_11 : {
//     name:"COMPANIES",
//     location: "",
//     contact: ""
//   },
//   item_12 : {
//     name:"COMMAND & CONTROL",
//     location: "",
//     contact: ""
//   }
// };