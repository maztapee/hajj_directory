import React, { useState, useEffect } from 'react';
import { TextInput, FlatList, Text, View, StyleSheet } from 'react-native';

const SearchResultScreen = () => {
  const [contactItems, setContactItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isFocus, setIsFocused] = useState(false);

  useEffect(() => {
    // Function to fetch all contacts
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://api.hajjwayfinder.com.ng/contacts');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        let items = data;

        if (items && items.length > 0) {
          items = items.map(async item => {
            const genderResponse = await fetch(`https://gender-api.com/get?name[]=${item.f_name}`);
            if (!genderResponse.ok) {
              throw new Error(`HTTP error! Status: ${genderResponse.status}`);
            }
            const genderData = await genderResponse.json();
            return { ...item, gender: (genderData?.[0]?.gender) ? genderData[0].gender : "male" };
          });

          items = await Promise.all(items);
        }

        setContactItems(items); // updating contact list items before rerendering
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    // Fetch all contacts when the component mounts
    fetchContacts();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = contactItems.filter(item =>
      (item.f_name && item.f_name.toLowerCase().includes(lowerCaseQuery)) ||
      (item.l_name && item.l_name.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredItems(filtered);
  }, [searchQuery, contactItems]);

  return (
    <View style={{alignContent:"center"}}>
      <TextInput style={styles.search_field}
        type="text"
        placeholder="Search by any part of a name"
        placeholderTextColor={"gray"}
        textAlign='center'
        selectionColor={"black"}
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      { searchQuery ?(
        <FlatList
        data={filteredItems}
        keyExtractor={item => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.search_input}>{item.f_name} {item.l_name} - {item.location.location}</Text>
          </View>
        )}
      />) : ( <View style={styles.search_notification_container}><Text style={styles.search_notification}>Search result will appears here</Text></View>)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  search_field:{
    backgroundColor:"lightgray",
    color: "black",
    fontWeight: "bold",
    height: 45,
    width: "65%",
    border: "solid",
    borderWidth: 2,
    borderColor: "darkslategray",
    borderRadius: 8,
    alignSelf: "center"
  },
  search_input:{
  
  },
  search_notification_container:{
    alignSelf: "center",
    marginTop: 20,
  },
  search_notification:{
    fontSize: 22
  }
})

export default SearchResultScreen;
