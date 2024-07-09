import React, { useState, useEffect } from 'react';
import { TextInput, ScrollView, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import ContactCard from './ContactCard';

const SearchResultScreen = ({ navigation }) => {
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
          items = items.map(async (item) => {
            const genderResponse = await fetch(`https://gender-api.com/get?name[]=${item.f_name}`);
            if (!genderResponse.ok) {
              throw new Error(`HTTP error! Status: ${genderResponse.status}`);
            }
            const genderData = await genderResponse.json();
            return { ...item, gender: (genderData?.[0]?.gender) ? genderData[0].gender : 'male' };
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
    const filtered = contactItems.filter((item) =>
      (item.f_name && item.f_name.toLowerCase().includes(lowerCaseQuery)) ||
      (item.l_name && item.l_name.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredItems(filtered);
  }, [searchQuery, contactItems]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search_field}
        type="text"
        placeholder="Search by any part of a name"
        placeholderTextColor={'gray'}
        textAlign="center"
        selectionColor={'black'}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <View style={styles.list_container}>
        {searchQuery ? (
          <ScrollView contentContainerStyle={styles.scroll_container}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <View key={index} style={styles.result_list}>
                  <ContactCard
                    name={item.full_name.toLowerCase()}
                    phoneNumber={item.phone}
                    whatsapp={item.whatsapp}
                    imageType={item.gender}
                    office_location={item.category_name}
                    onPress={() => navigation.navigate('ContactDetailScreen', item)} // Pass the item as navigation parameter
                  />
                </View>
              ))
            ) : (
              <View style={{justifyContent:"center", alignItems:"center"}}>
                <ActivityIndicator size="larger" color="gray" />
                <Text style={{fontSize:18, fontWeight:"bold"}}>Loading Search Results . . .</Text>
              </View>
            )}
          </ScrollView>
        ) : (
          <View style={styles.search_notification_container}>
            <Text style={styles.search_notification}>Search result will appear here</Text>
          </View>
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  search_field: {
    backgroundColor: 'lightgray',
    color: 'black',
    fontWeight: 'bold',
    height: 45,
    width: '65%',
    border: 'solid',
    borderWidth: 2,
    borderColor: 'darkslategray',
    borderRadius: 8,
    alignSelf: 'center',
  },
  search_notification_container: {
    justifyContent: 'space-around',
  },
  search_notification: {
    fontSize: 22,
  },
  list_container: {
    flex: 1,
    marginTop: 15,
    width: '94%',
    margin: '2.5%',
    borderRadius: 10,
  },
  scroll_container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  result_list: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
  },
});

export default SearchResultScreen;
