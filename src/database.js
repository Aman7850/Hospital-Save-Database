import React, { useState, useEffect } from 'react';

import { SafeAreaView, Text, View, StyleSheet, Alert, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

import { NavigationContainer, useIsFocused } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
var db = openDatabase({ name: 'Create_patientDatabase.db' });


function HomeScreen({ navigation }) {

  const [S_Patient_Name, setPatient_Name] = useState('');
  const [S_Address, setAddress] = useState('');
  const [S_Phone, setPhone] = useState('');
  const [S_Age, setAge] = useState('');
  const [S_Sex, setSex] = useState('');
  const [S_Disease, setDisease] = useState('');
  const [S_Prescription, setPrescription] = useState('');
  const [S_Blood_Report, setBlood_Report] = useState('');
  const [S_Date_Of_Visit, setDate_Of_Visit] = useState('02/02/2022');
  const [S_Date_Of_Operation, setDate_Of_Operation] = useState('02/02/2022');
  const [S_Tet_Vac, setTet_Vac] = useState('');
  const [S_Amount, setAmount] = useState('');
  const [S_Due, setDue] = useState('');
  const [S_date, setdate] = useState(
    '0' +
      (new Date().getMonth() + 1) +
      '/' +
      +new Date().getDate() +
      '/' +
      new Date().getFullYear(),
  );
  
   
  
    const insertData = () => {
  
      if (Patient_Name == '' || Address == '' || Phone == '' || Age == '' || Sex == '' || Disease == '' || Prescription == '' || Blood_Report == '' || Date_Of_Visit == '' || Date_Of_Operation == '' || Tet_Vac == '' || Amount == '' || Due == '') {
        Alert.alert('Please Enter All the Values');
      } else {
  
        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO Student_Table (Patient_Name, Address, Phone, Age, Sex, Disease, Prescription, Blood_Report, Date_Of_Visit, Date_Of_Operation, Tet_Vac, Amount, Due) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [S_Patient_Name, S_Address, S_Phone, S_Age, S_Sex, S_Disease, S_Prescription, S_Blood_Report, S_Date_Of_Visit, S_Date_Of_Operation, S_Tet_Vac, S_Amount, S_Due],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert('Data Inserted Successfully....');
              } else Alert.alert('Failed....');
            }
          );
        });
  
      }
    }
  
    navigateToViewScreen = () => {
  
      navigation.navigate('ViewAllStudentScreen');
    }
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
  
          <Text style={{ fontSize: 24, textAlign: 'center', color: '#000' }}>
            Insert Data Into SQLite Database
          </Text>
  
          <TextInput
            style={styles.textInputStyle}
            onChangeText={
              (text) => setPatient_Name(text)
            }
            placeholder="Enter Student Name"
            value={S_Name} />
  
          <TextInput
            style={styles.textInputStyle}
            onChangeText={
              (text) => setPhone(text)
            }
            placeholder="Enter Student Phone Number"
            keyboardType={'numeric'}
            value={S_Phone} />
  
          <TextInput
            style={[styles.textInputStyle, { marginBottom: 20 }]}
            onChangeText={
              (text) => setAddress(text)
            }
            placeholder="Enter Student Address"
            value={S_Address} />
  
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={insertData}>
  
            <Text style={styles.touchableOpacityText}> Click Here To Insert Data Into SQLite Database </Text>
  
          </TouchableOpacity>
  
          <TouchableOpacity
            style={[styles.touchableOpacity, { marginTop: 20, backgroundColor: '#33691E' }]}
            onPress={navigateToViewScreen}>
  
            <Text style={styles.touchableOpacityText}> Click Here View All Students List </Text>
  
          </TouchableOpacity>
  
        </View>
  
      </SafeAreaView>
    );
  };