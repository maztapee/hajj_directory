import { View, } from 'react-native';
import React from 'react';
import Nav_List_Item from './Nav_List_Item';


const Nav_List = ({navigation, navSelection, status})=>{
    return(
        <View>
            <Nav_List_Item navigation={navigation} onLocationSelect={navSelection} status={status}/>
        </View>
        
    )
};

export default Nav_List;