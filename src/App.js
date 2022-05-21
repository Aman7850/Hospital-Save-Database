import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Image, ImageBackground, useWindowDimensions, TouchableOpacity} from 'react-native';
import { Button, Card, TextInput} from 'react-native-paper';
import { NavigationContainer,  useNavigation, useIsFocused } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import {Input, Icon } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Picker} from '@react-native-picker/picker';
import { openDatabase } from 'react-native-sqlite-storage';
import ImagePicker from 'react-native-image-crop-picker';
import {} from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import Patient from './Patient';
import Create_patient from './Create_patient';
import View_patient from './View_patient';


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(async() => {
      setIsLoading(false);
    }, 5100);
  }, []);

  if(isLoading){
    return(
      <View style = {{flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#007bff'}}>
        <LottieView source={require('./hospital.json')} autoPlay loop duration={2000}/>
      </View>
    )
    }


    
    return(
      <NavigationContainer>
        
          <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={'StartScreen'}>
          
          <Stack.Screen name="Patient" component={Patient} />
          <Stack.Screen name="Create_patient" component={Create_patient} />
          <Stack.Screen name="View_patient" component={View_patient} />
          
            </Stack.Navigator>
        
      </NavigationContainer>
    )
}
const Stack = createStackNavigator();
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  
});

export default App;