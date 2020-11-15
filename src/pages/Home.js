import React, { useState } from 'react';
import {
  Clipboard,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import Slider from '@react-native-community/slider';

import { RandomPassword } from '../Utils';

const Home = () => {
  const [passwordLength, setPasswordLength] = useState(8);
  const [newPassword, setNewPassword] = useState('');

  const [isLowerEnabled, setIsLowerEnabled] = useState(true);
  const toggleLowerSwitch = () => setIsLowerEnabled(previousState => !previousState);
  const [isUpperEnabled, setIsUpperEnabled] = useState(true);
  const toggleUpperSwitch = () => setIsUpperEnabled(previousState => !previousState);
  const [isNumberEnabled, setIsNumberEnabled] = useState(true);
  const toggleNumberSwitch = () => setIsNumberEnabled(previousState => !previousState);
  const [isSymbolEnabled, setIsSymbolEnabled] = useState(true);
  const toggleSymbolSwitch = () => setIsSymbolEnabled(previousState => !previousState);

  const [modalVisible, setModalVisible] = useState(false);

  function generatePwd() {
    let pwd = new RandomPassword()
      .setLength(passwordLength)
      .setLowerCase(isLowerEnabled)
      .setUpperCase(isUpperEnabled)
      .setNumberCase(isNumberEnabled)
      .setSymbol(isSymbolEnabled)
      .generate();
    setNewPassword(pwd);
  }

  function handleCopy() {
    Clipboard.setString(newPassword);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Senha copiada!</Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <View>
        <Text style={styles.header}>Gerador de senhas</Text>
      </View>

      <View style={styles.password}>
        <Text style={styles.passwordText}>{newPassword}</Text>
      </View>

      <Text style={styles.text}>Tamanho da senha entre 4 e 32 caracteres:</Text>
      <View style={styles.sliderContainer}>
        <Text style={styles.passwordLength}>{passwordLength}</Text>
        <Slider
          style={styles.slider}
          value={passwordLength}
          onValueChange={value => setPasswordLength(value)}
          step={1}
          tapToSeek={true}
          minimumValue={4}
          maximumValue={32}
          minimumTrackTintColor="green"
          maximumTrackTintColor="red"
          thumbTintColor={'#f4f3f4'}
        />
      </View>

      <View style={styles.toggleContainer}>
        <Text style={styles.text}>Minúsculas</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#AE1B1F' }}
          thumbColor={isLowerEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleLowerSwitch}
          value={isLowerEnabled}
        />
      </View>
      <View style={styles.toggleContainer}>
        <Text style={styles.text}>Maiúsculas</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#AE1B1F' }}
          thumbColor={isUpperEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleUpperSwitch}
          value={isUpperEnabled}
        />
      </View>
      <View style={styles.toggleContainer}>
        <Text style={styles.text}>Números</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#AE1B1F' }}
          thumbColor={isNumberEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNumberSwitch}
          value={isNumberEnabled}
        />
      </View>
      <View style={styles.toggleContainer}>
        <Text style={styles.text}>Símbolos</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#AE1B1F' }}
          thumbColor={isSymbolEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSymbolSwitch}
          value={isSymbolEnabled}
        />
      </View>

      <TouchableOpacity
        style={styles.buttonGen}
        onPress={() => generatePwd()} >
        <Text style={styles.buttonText}>Gerar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonCopy}
        onPress={() => handleCopy()} >
        <Text style={styles.buttonText}>Copiar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4C0000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    color: '#fff',
    fontSize: 25
  },

  password: {
    backgroundColor: '#AE1B1F',
    width: '80%',
    height: 100,
    padding: 5,
    marginTop: 10,
    marginBottom: 10
  },

  passwordText: {
    fontSize: 20,
    color: '#fff'
  },

  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 5,

  },

  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },

  passwordLength: {
    marginRight: 15,
    color: '#fff',
    fontSize: 16
  },

  slider: {
    width: '70%',
    height: 40
  },

  text: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  buttonGen: {
    width: '80%',
    height: 42,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 20,
    marginBottom: 20
  },

  buttonCopy: {
    width: '80%',
    height: 42,
    backgroundColor: '#AE1B1F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginBottom: 10
  },

  buttonText: {
    fontSize: 20,
    color: 'white'
  }
});

export default Home;
