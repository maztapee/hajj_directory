import { StyleSheet, View, } from 'react-native';
import React from 'react';
import Nav_List_Item from './Nav_List_Item';


const Nav_List = ({navigation, navSelection})=>{
    return(
        <View>
            <Nav_List_Item navigation={navigation} onLocationSelect={navSelection}/>
        </View>
        
    )
};

export default Nav_List;