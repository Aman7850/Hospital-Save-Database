import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Image, ImageBackground, useWindowDimensions, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import { Button, Card, TextInput} from 'react-native-paper';
import { NavigationContainer,  useNavigation, useIsFocused } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import {Input, Icon, Divider } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'Create_patientDatabase.db' });

const image = { uri: "https://cdn.pixabay.com/photo/2020/08/03/09/39/medical-5459632__340.png" };

let width = Dimensions.get('window').width

const View_patient = () => {
  
  const [items, setItems] = useState();
    const isFocused = useIsFocused();
    useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM Create_patient_Table',
            [],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i)
                temp.push(results.rows.item(i));
              setItems(temp);
                console.log(temp, 'data table');
              
     
            }
          );
     
        });
      }, [isFocused]);
    const navigation = useNavigation();
      
      
        const renderItem = ({ item }) => (
          <Card style = {{margin:5, padding: 10, backgroundColor: '#d9faf7', borderRadius: 20, borderWidth: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.list}>Name: </Text>
              <Text style={styles.list1}>{item.create_patient_patient_name}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.list}>Address: </Text>
              <Text style={styles.list1}>{item.create_patient_address}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.list}>Phone: </Text>
              <Text style={styles.list1}>{item.create_patient_phone}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.list}>Age: </Text>
              <Text style={styles.list1}>{item.create_patient_age}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.list}>Sex: </Text>
              <Text style={styles.list1}>{item.create_patient_sex}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.list}>Disease: </Text>
              <Card style={styles.Card1}>{item.create_patient_disease}</Card>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.list}>Prescription: </Text>
              <Card style={styles.Card1}>{item.create_patient_prescription}</Card>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.list}>Blood Report: </Text>
              <Card style={styles.Card1}>{item.create_patient_blood_report}</Card>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.list}>Date Of Visit: </Text>
              <Text style={styles.list1}>{item.create_patient_date_of_visit}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.list}>Date Of Operation: </Text>
              <Text style={styles.list1}>{item.create_patient_date_of_operation}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.list}>Tet Vac: </Text>
              <Text style={styles.list1}>{item.create_patient_tet_vac}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.list}>Amount: </Text>
              <Text style={styles.list1}>{item.create_patient_amount}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.list}>Due: </Text>
              <Text style={styles.list1}>{item.create_patient_due}</Text>
            </View>
          </Card>
        );

  return (
    <View style = {styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
           
            <Text style = {{fontSize:30, fontStyle:'italic', color: 'black', fontWeight:'bold', alignSelf:'center'}}>View Patient</Text>
            <Divider width={1} color={'black'} />
            
            <TouchableOpacity onPress={() => navigation.navigate('Create_patient')}>
                <Card style = {styles.Card}>
                <Text style = {styles.Text}>+</Text>
                </Card>
            </TouchableOpacity>
            
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.create_patient_id}
            />
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    image: {
        
        flex:2,
        width: '100%',
        height: '100%'
    },
    Text: {
        fontSize:35,
        color: 'red',
        fontWeight: '800',
    },
    Card: {
        
        width:'12%',
        alignItems:'center',
        marginLeft:'5%',
        marginTop: '5%',
        borderWidth: 1
        
    },
    list: {
      fontSize: 15,
      fontWeight: '600',
      color: 'black',
    },
    list1: {
      fontSize: 15,
      color: 'black',
    },
    Card1: {
      height: 80,
      width: 80
    }

});
export default View_patient;