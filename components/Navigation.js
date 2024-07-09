import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Nav_List from './Nav_List';
import { handleWhatsAppPress } from '../utils';

const Navigation = ({showNavi, toggleNavi, navigation, selectedNav})=>{ 
    return(
        <View style={[styles.grid_1, {display: showNavi ? 'flex' : 'none'}]}>
            <View style={styles.back_arrow}>
              <TouchableOpacity onPress={toggleNavi}>
                <Icon name="arrow-left" size={41} color="black"/>
              </TouchableOpacity>
            </View>
            <View style={styles.grid_1layer1}>
                <View style={{top:'0%', alignItems:'center'}}><Text style={{fontWeight:'bold', fontSize:17}}>2024 HAJJ E-Directorate</Text></View>
                <View style={styles.status_bar}>
                    <View style={styles.image}> 
                        <Image 
                            source={require('../assets/telephone.png')}
                            style={styles.image}
                            resizeMode='contain'
                        />
                        <View style={{flexDirection:'column'}}>
                          <Text style={{fontWeight:'bold'}}>Pilgrim</Text>
                          <View style={{flexDirection:'row'}}>
                            <View style={styles.circle}></View><Text style={{fontWeight:'bold'}}>Online</Text>
                          </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.grid_1layer2}>
              <View style={{height:30, backgroundColor:'black', alignItems:'center',justifyContent:'space-around'}}>
                <Text style={{fontWeight:'900', color:'white'}}>NAVIGATION</Text>
              </View>
              <Nav_List navigation = {navigation} navSelection={selectedNav} status={showNavi}/>
              <View style={styles.contact}>
                <TouchableOpacity onPress={()=> handleWhatsAppPress('+2347016042209')}>
                  <Text>CALL CENTER</Text>
                  <Text>+234-701-604-2209</Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    grid_1:{
      position: 'absolute',
      flex: 1,
      backgroundColor: 'lightgray',
      opacity:0.88,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 1,
      zIndex: 100,
      top:'0%',
      left:'1.5%',
      borderTopRightRadius:15,
      borderTopWidth:2,
      borderRightWidth:2,
      borderBottomRightRadius:15,
      width:'58%',
      height:'98.5%',
      },
        grid_1layer1:{
    flex:0.55,
    alignSelf:"stretch",
    justifyContent:"space-around",
  },
  grid_1layer2:{
    flex: 2
  },
  status_bar:{
    flexDirection:'column',
  },
  image:{
    width:60, 
    height:60,
    borderRadius:30,
    flexDirection: 'row',
    backgroundColor: 'lightgreen'
  },
  input:{
    marginTop:10,
    height:30,
    width:'95%',
    borderWidth:1,
    borde:'solid',
    margin: '2.5%',
    borderRadius: 5,
    textAlignVertical:'center',
    backgroundColor: 'white',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'lightgreen',
    alignSelf: 'center',
    margin:5
  },
  contact:{
    flexDirection:'row',
    alignItems:'center',
    fontSize:16,
    backgroundColor: 'grey',
    border:'solid',
    borderWidth: 2,
    borderRadius: 5,
    padding: 3
  },
  base_contact:{
    bottom: 'auto', 
    maxWidth: 'auto',
    minHeight:'auto'
  },
  back_arrow:{
    alignSelf:'flex-start',
    alignItems:'center',
    width: '30%',
    height: '6.5%',
  }
})
export default Navigation;