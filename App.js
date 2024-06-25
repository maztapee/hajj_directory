import React, {useState} from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableWithoutFeedback,
  AppRegistry 
  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageView from './components/PageView';
import Navigation from './components/Navigation';
import ContactScreen from './components/ContactScreen';
import ContactDetailScreen from './components/ContactDetailScreen';

const Stack = createStackNavigator();

const HomeScreen = ({navigation}) => {

  const [showNav, setShowNav] = React.useState(false);

  const toggleVisibility = () => {
    setShowNav(!showNav);
  };

  const handleOutsideTouchClose = () => {
    console.log("clicked outside");
    if (showNav) {
      setShowNav(!showNav);
   }
  };

  return (
      
        <View style={styles.mainbody}>
          <Navigation showNavi={showNav} toggleNavi={toggleVisibility} navigation={navigation} />
          <TouchableWithoutFeedback >
           <PageView showNav={showNav} toggleNav={toggleVisibility} onTouch={handleOutsideTouchClose}/>
          </TouchableWithoutFeedback>
        </View>

  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home Page" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Contact List" component={ContactScreen}/>
        <Stack.Screen name="Contact Detail" component={ContactDetailScreen} />
        {/* Add more screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('hajjdirectory', () => App);

const styles = StyleSheet.create({
  mainbody: {
    flex:1,
    flexDirection:'row',
    marginTop: '10%',
    marginLeft: 2,
    marginRight:2,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
