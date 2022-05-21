import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Image, ImageBackground, useWindowDimensions, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { Button, Card, TextInput} from 'react-native-paper';
import { NavigationContainer,  useNavigation, useIsFocused } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import {Input, Icon } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

const Patient = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(async() => {
      
    }, 5100);
  }, []);


  return (
    <View style={styles.container}>
    
        <View style={styles.SecondContainer}>
            <LottieView source={require('./image_hospital.json')} autoPlay loop duration={2000}/>
            
        </View>
    
        <View style={{padding: 15, backgroundColor: '#e5cef0', marginTop: '5%', borderRadius: 40}}>

        <Image
          style={{alignSelf: 'center', width: 200, height: 150}}
          source={require('./plus.png')}
        />

          <View style={{marginTop: '5%'}}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Create_patient')}>
                <Card style={{padding: 15, borderRadius: 20, backgroundColor: '#baf5ed'}}>
                  <View style={{flexDirection: 'row'}}>
                  <Icon name='plus' type='font-awesome' color='#517fa4' />
                    <Text style = {{fontSize: 20, fontWeight: '700', color: 'black', letterSpacing: 1, marginLeft: 10}}>Create Patient</Text>
                  </View>
                </Card>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('View_patient')}>
                <Card style={{padding: 15, borderRadius: 20, backgroundColor: '#baf5ed', marginTop: '5%'}}>
                <View style={{flexDirection: 'row'}}>
                    <Icon name='street-view' type='font-awesome' color='#517fa4' />
                    <Text style = {{fontSize: 20, fontWeight: '700', color: 'black', letterSpacing: 1, marginLeft: 10}}>View Patient</Text>
                </View>
                </Card>
            </TouchableWithoutFeedback>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#dadef7'
    },
    SecondContainer: {
      flex: 2,
      padding: 50,
      backgroundColor: 'blue',
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      maxHeight: 450,
      alignItems: 'center'
    }
  });
export default Patient;
