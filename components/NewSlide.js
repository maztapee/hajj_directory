import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const ImageSlider = () => {
    const images = [
        require('../assets/images/hajj_1.jpg'), 
        require('../assets/images/hajj_2.jpg'), 
        require('../assets/images/hajj_3.jpg'),
        require('../assets/images/hajj_4.jpg'), 
        require('../assets/images/hajj_5.jpg'),
        require('../assets/images/hajj_6.jpg'),
        require('../assets/images/hajj_7.jpg')
        ];
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item} style={styles.image} />
    </View>
  );

  return (
    <Carousel
      data={images}
      renderItem={renderItem}
      sliderWidth={screenWidth * 0.92}
      itemWidth={screenWidth * 0.8}
      layout={'default'} 
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    padding: 0,
    width: '100%',
    height: '85%', // Adjust the height as needed
    resizeMode: 'cover',
  },
});

export default ImageSlider;
