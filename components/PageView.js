import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageSlider from './NewSlide';

const PageView = ( {toggleNav, onTouch, navigation} )=>{

    return(
      <View style={styles.grid_2} onTouchStart = {onTouch}>
        <View style={styles.top_pageview}>
          <TouchableOpacity style={ styles.toggleVisibility} onPress={ toggleNav}>
            <Icon name="bars" size={35} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchInput} onPress={() => {
              console.log("Search Contacts clicked");
              navigation.navigate("Search Contact Page");
              }
            }>
            <View style={styles.button}>
                <Text style={styles.buttonText}>Search Contacts</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.image_base}>
          <ImageBackground
            source={require('../assets/images/Nigeria_flag.jpg')}
            style={styles.backgroundImage}>
            <Image source={require('../assets/nahcon.png')} style={styles.image}/>
            <Text style={{color:'darkred', fontWeight:"bold", fontSize:18}}>The Presidency</Text>
            <Text style={{color:'black', fontWeight:"bold", fontSize:16}}>National Hajj Commission</Text>
          </ImageBackground>
        </View>
        <View style={styles.base_pageview}>
          <ImageSlider />
        </View>
      </View>
    )
};

const styles = StyleSheet.create({
    grid_2:{
      flex:3,
      flexGrow: 1,
      margin:5,
      border:'solid',
      backgroundColor: 'lightgray',
    },
    toggleVisibility:{
        backgroundColor: 'lightgray',
        alignItems:'center',
        padding: 6,
        borderRadius: 5,
        width:'16%',
        height: '100%'
    },
    image:{
      width:100, 
      height:100,
     alignSelf:"center",
    },
    image_base:{
      flexDirection:'column',
      alignItems:'center',
    },
    top_pageview: {
      flexDirection:'row',
      border: 'solid',
      width: "100%",     
      elevation:5,
      backgroundColor: 'lightgray'
    },
    base_pageview:{
      flex:1,
      marginTop: 5,
      backgroundColor:'lightgray',
      border: 'solid',
      borderRadius: 10,
      borderWidth: 2
    },
    backgroundImage: {
      width:'100%',
      marginTop: '0.5%',
      alignItems:'center',
      borderRadius:10,
      opacity:0.85
    },
    searchInput:{
      position:"absolute",
      right: 0,
      height: "100%",
      minWidth:"40%",
      backgroundColor: "darkgray",
      justifyContent: "space-around",
      border: 'solid',
      borderWidth: 1,
      borderRadius: 12,
      alignItems:"center"
    }
  });
  
export default PageView;