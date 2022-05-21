import React, {useState, useEffect} from 'react';
import {Text, Button, StyleSheet, View, Image, ImageBackground, useWindowDimensions, Alert, Dimensions, TouchableOpacity} from 'react-native';
import {  Card, TextInput} from 'react-native-paper';
import { NavigationContainer,  useNavigation, useIsFocused } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable';
import {Input, Icon, Divider } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Picker} from '@react-native-picker/picker';
import { openDatabase } from 'react-native-sqlite-storage';
import ImagePicker from 'react-native-image-crop-picker';

var db = openDatabase({ name: 'Create_patientDatabase.db' });

let width = Dimensions.get('window').width

const Create_patient = () => {
  const [dropdown, setDropdown] = useState();
  const [dialog, setDialog] = useState();
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const [Patient_Name, setPatient_Name] = useState('');
  const [Address, setAddress] = useState('');
  const [Phone, setPhone] = useState('');
  const [Age, setAge] = useState('');
  const [Sex, setSex] = useState('');
  const [Date_Of_Visit, setDate_Of_Visit] = useState('02/02/2022');
  const [Date_Of_Operation, setDate_Of_Operation] = useState('02/02/2022');
  const [Tet_Vac, setTet_Vac] = useState('');
  const [Amount, setAmount] = useState('');
  const [Due, setDue] = useState('32');
  const [DiseaseImage, setDiseaseImage] = useState("default image.png");
  const [PrescriptionImage, setPrescriptionImage] = useState("default image.png");
  const [BloodImage, setBloodImage] = useState("default image.png");
  const [date, setdate] = useState(
    '0' +
      (new Date().getMonth() + 1) +
      '/' +
      +new Date().getDate() +
      '/' +
      new Date().getFullYear(),
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const g = JSON.stringify(date);
        const g_array = g.slice(1, 11).split('-').reverse();
        const d = g_array[0];
        const m = g_array[1];
        const y = g_array[2];
        const togedate = m + '/' + d + '/' + y;
        console.log('A date has been picked:jhvhvhgvhg ', togedate);
        console.log('A date has been picked: ', typeof g);
        setdate(togedate);
        hideDatePicker();
  };

  const multipleFileDisease = () =>{
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setDiseaseImage(DiseaseImage.path);
    });
  }

  const multipleFilePrescription = () =>{
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setPrescriptionImage(PrescriptionImage.path);
    });
  }

  const multipleFileBlood = () =>{
    ImagePicker.openPicker({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setBloodImage(BloodImage.path);
    });
  }

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='create_patient_Table'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS create_patient_Table(create_patient_id INTEGER PRIMARY KEY AUTOINCREMENT, create_patient_patient_name VARCHAR(30), create_patient_address VARCHAR(50), create_patient_phone INTEGER(25), create_patient_age INTEGER(25), create_patient_sex VARCHAR(255), create_patient_diseaseimage VARCHAR(255), create_patient_prescriptionimage VARCHAR(50), create_patient_bloodimage VARCHAR(50), create_patient_date_of_visit VARCHAR(50), create_patient_date_of_operation INTEGER(20), create_patient_tet_vac VARCHAR(50), create_patient_amount INTEGER(50), create_patient_due INTEGER(50))',
              []
            );
          }
        }
      );
    })
 
  }, []);

  const insertData = () => {
   
    if (Patient_Name == '' || Address == '' || Phone == '' || Age == '' || Sex == '' || DiseaseImage == '' || PrescriptionImage == '' || BloodImage == '' || Date_Of_Visit == '' || Date_Of_Operation == '' || Tet_Vac == '' || Amount == '' || Due == '') {
        console.log(Patient_Name, Address, Phone, Age, Sex, DiseaseImage, PrescriptionImage, BloodImage, Date_Of_Visit, Date_Of_Operation, Tet_Vac, Amount, Due);
      Alert.alert('Please enter all the details.');
      
    } else {
 
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO Create_patient_Table (Create_patient_Patient_Name, Create_patient_Address, Create_patient_Phone, Create_patient_Age, Create_patient_Sex, Create_patient_DiseaseImage, Create_patient_PrescriptionImage, Create_patient_BloodImage, Create_patient_Date_Of_Visit, Create_patient_Date_Of_Operation, Create_patient_Tet_Vac, Create_patient_Amount, Create_patient_Due) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [Patient_Name, Address, Phone, Age, Sex, DiseaseImage, PrescriptionImage, BloodImage, Date_Of_Visit, Date_Of_Operation, Tet_Vac, Amount, Due],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
                navigation.navigate('View_patient')
              Alert.alert('Data Inserted Successfully....');
            } else Alert.alert('Failed....');
          }
        );
      });
 
    }
  }

  return (
    <View style={styles.container}>
        <ScrollView style={{padding: 10}}>
            <View style={{borderRadius: 40, borderWidth: 1, backgroundColor: 'lightblue', padding: 10, marginBottom: 10}}>
                <Text style={{fontSize: 30, fontWeight: '700', fontStyle: 'italic', color: 'black', textAlign: 'center'}}>Create Patient</Text>
                <Divider width={1} color={'black'} />
              <View style={{marginTop: '10%'}}>
              <Text style = {{fontSize: 14, fontWeight: '500', color: 'black'}}>Patient Name</Text>
                <Input
                    placeholder='Patient Name'
                    leftIcon={{ type: 'font-awesome', name: 'user', size:20 }}
                    value = {Patient_Name} onChangeText = {(text) => setPatient_Name(text)}
                                            
                />

                <Text style = {{fontSize: 14, fontWeight: '500', color: 'black'}}>Address</Text>
                <Input
                    placeholder='Address'
                    leftIcon={{ type: 'font-awesome', name: 'home', size:20 }}
                    value = {Address} onChangeText = {(text) => setAddress(text)}
                                            
                />

                <Text style = {{fontSize: 14, fontWeight: '500', color: 'black'}}>Phone</Text>
                <Input
                    placeholder='0000000000'
                    keyboardType = 'numeric'
                    leftIcon={{ type: 'font-awesome', name: 'phone', size:20 }}
                    value = {Phone} onChangeText = {(text) => setPhone(text)}
                                            
                />

                <Text style = {{fontSize: 14, fontWeight: '500', color: 'black'}}>Age</Text>
                <Input
                    placeholder='30 years'
                    keyboardType = 'numeric'
                    leftIcon={{ type: 'font-awesome', name: 'user', size:20 }}
                    value = {Age} onChangeText = {(text) => setAge(text)}
                                            
                />

                <Text style = {{fontSize: 14, fontWeight: '500', color: 'black'}}>Sex</Text>
                <Card style={{borderWidth: 1, borderRadius: 20, backgroundColor: 'lightgrey'}}>
                <Picker selectedValue={Sex}
                          onValueChange={(itemValue, itemIndex) =>
                            setSex(itemValue)
                          } mode = {dialog, dropdown}>
                            <Picker.Item color="#000000"
                            style={{backgroundColor: '#FFFFFF'}}
                            label="--Select Image--"/>
                            <Picker.Item label="MALE" value="MALE" />
                            <Picker.Item label="FEMALE" value="FEMALE" />
                            
                </Picker>
                </Card>

                <Text style = {{fontSize: 14, fontWeight: '500', color: 'black', marginTop: 10}}>Disease</Text>
                <TouchableWithoutFeedback onPress={multipleFileDisease}
                value = {DiseaseImage} onChange = {(image) => setDiseaseImage(image)}>
                    <Card style={{padding: 10, borderRadius: 20, backgroundColor: 'tomato', marginTop: 10}}>
                          <Text style={{fontSize: 20, fontWeight: '400', textAlign: 'center'}}>Upload File</Text>
                    </Card>
                </TouchableWithoutFeedback>

                <Text style = {{fontSize: 14, fontWeight: '500', color: 'black', marginTop: 20}}>Prescription</Text>
                <TouchableWithoutFeedback onPress={multipleFilePrescription}
                  value = {PrescriptionImage} onChange = {(image) => setPrescriptionImage(image)}>
                    <Card style={{padding: 10, borderRadius: 20, backgroundColor: 'tomato', marginTop: 10}}>
                          <Text style={{fontSize: 20, fontWeight: '400', textAlign: 'center'}}>Upload File</Text>
                    </Card>
                </TouchableWithoutFeedback>

                <Text style = {{fontSize: 14, fontWeight: '500', color: 'black', marginTop: 20}}>Blood Report</Text>
                <TouchableWithoutFeedback onPress={multipleFileBlood}
                value = {BloodImage} onChange = {(image) => setBloodImage(image)}>
                    <Card style={{padding: 10, borderRadius: 20, backgroundColor: 'tomato', marginTop: 10}}>
                          <Text style={{fontSize: 20, fontWeight: '400', textAlign: 'center'}}>Upload File</Text>
                    </Card>
                </TouchableWithoutFeedback>


                        <Text style = {{fontSize: 14, fontWeight: '500', color: 'black', marginTop: 20}}>Date of Visit</Text>
                        <View style ={{borderRadius: 50}}>
                            <Button title={date} onPress={showDatePicker}/>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                    value = {Date_Of_Visit} onChangeText = {(text) => setDate_Of_Visit(text)}
                                />
                        </View>
                

                
                        <Text style = {{fontSize: 14, fontWeight: '500', color: 'black', marginTop: 20}}>Date of Operation</Text>
                        <View style ={{borderRadius: 50}}>
                            <Button title={date} onPress={showDatePicker}/>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                    value = {Date_Of_Operation} onChangeText = {(text) => setDate_Of_Operation(text)}
                                />
                        </View>
                

                <Text style = {{fontSize: 14, fontWeight: '500', color: 'black', marginTop: 10}}>Vaccine</Text>
                <Input
                    placeholder='Vaccine'
                    leftIcon={{ type: 'font-awesome', name: 'user', size:20 }}
                    value = {Tet_Vac} onChangeText = {(text) => setTet_Vac(text)}
                                            
                />

                <Text style = {{fontSize: 14, fontWeight: '500', color: 'black'}}>Amount</Text>
                <Input
                    placeholder='Ex: 2000 rs'
                    keyboardType = 'numeric'
                    leftIcon={{ type: 'font-awesome', name: 'money', size:20 }}
                    value = {Amount} onChangeText = {(text) => setAmount(text)}
                                            
                />

                <Text style = {{fontSize: 14, fontWeight: '500', color: 'black'}}>Due</Text>
                <Input
                    placeholder='Ex: 2000 rs'
                    keyboardType = 'numeric'
                    leftIcon={{ type: 'font-awesome', name: 'money', size:20 }}
                    value = {Due} onChangeText = {(text) => setDue(text)}
                                            
                />

                <TouchableWithoutFeedback style={{marginBottom: '5%'}} onPress={insertData}>
                    <Card style={{padding: 10, borderRadius: 20, borderWidth: 1, backgroundColor: '#f70a75'}}>
                      <Text style={{fontSize: 25, color: 'black', fontWeight: '800', fontStyle: 'italic', textAlign: 'center'}}>SAVE</Text>
                    </Card>
                </TouchableWithoutFeedback>
              </View>
            </View>
        </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    
  });
export default Create_patient;