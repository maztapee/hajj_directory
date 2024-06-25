import React, { useEffect, useState } from 'react';
import { Text, Image, StyleSheet,View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { capitalizeFirstLetterOfEachWord } from '../utils';


const ContactCard = ({name, phoneNumber, whatsapp, office_location, imageType }) =>{
    const [selectedImage, setSelectedImage] = useState(null);
    const navigation = useNavigation();

    const imagePaths = {
        "regular":{
            "male":[
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Regular/Screen_Shot_Male_1.png'),
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Regular/Screen_Shot_Male_2.png'),
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Regular/Screen_Shot_Male_3.png'),
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Regular/Screen_Shot_Male_4.png'),
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Regular/Screen_Shot_Male_5.png'),
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Regular/Screen_Shot_Male_6.png'),
            ],
            "female":[
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Regular/Screen_Shot_Female_1.png'),
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Regular/Screen_Shot_Female_2.png'),
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Regular/Screen_Shot_Female_3.png'),
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Regular/Screen_Shot_Female_4.png'),
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Regular/Screen_Shot_Female_5.png'),
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Regular/Screen_Shot_Female_6.png'),
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Regular/Screen_Shot_Female_7.png'),
            ]
        },
        "medical":{
            "male":[
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Medical/med_male_1.png'),
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Medical/med_male_2.png'),
            ],
            "female":[
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Medical/med_female_1.png'),
                require('../assets/Muslim_Avatars/Screen_Shot_Avatar/Medical/med_female_2.png'),
            ],
        }
        // Add more images as needed
    };

    const getRandomRegularMaleImage = () => {
        //Document Implementation
        const randomIndex = Math.floor(Math.random() * imagePaths.regular.male.length);
        return imagePaths.regular.male[randomIndex];
      };

    const getRandomRegularFemaleImage = () => {
        //Document Implementation
        const randomIndex = Math.floor(Math.random() * imagePaths.regular.female.length);
        return imagePaths.regular.female[randomIndex];
    };
    
    useEffect((gender) => {
        //Document Implementation
        gender = imageType;
        if (gender =="male"){

            setSelectedImage(getRandomRegularMaleImage());
        } else {

            setSelectedImage(getRandomRegularFemaleImage());
        };
        
    }, [imageType]);

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Contact Detail',
            {
                name,
                phoneNumber,
                whatsapp,
                office_location,
                image: selectedImage,
            }
        )}>
            <View style={styles.card}>
                <View style={styles.image_container}>
                    <Image
                        source={selectedImage}
                        style={styles.image}
                        resizeMode='contain'
                    />
                </View>
                <View style={styles.card_description}>
                    <View>
                        <Text style={{alignItems:'center', color:'black'}}> Name:
                            <Text style={{fontWeight: 'bold'}}>
                            {capitalizeFirstLetterOfEachWord(name)} 
                            </Text>
                        </Text>
                    </View>
                    <View>
                        <Text style={{color:'black'}}> {`Designation: ${office_location}`} </Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width: '100%',
        height: 185,
        border:'solid',
        borderWidth: 1,
        borderRadius:5,
        margin: 3,
        backgroundColor:"skyblue",
    },
    image:{
        width:100, 
        height:100,
        borderRadius:50,
        backgroundColor: 'white'
      },
      card_description:{
        flexDirection: 'column',
        textAlign:'center',
        flexWrap: 'wrap',
        backgroundColor: 'white',
        border:'solid',
        borderWidth: 1,
        borderRadius:5,
        width:'90%',
      },
      image_container:{

      }
})

export default ContactCard;