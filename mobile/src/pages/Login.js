import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Text, Platform, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { NPS } from "react-native-nps";

import logo from '../assets/logo.png'
import api from '../services/api';

export default function Login ({ navigation }) {
  const [user, setUser] = useState('')
  state = {
    show: false
  }

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Main', { user })
      }
    })
  }, [])

  onPress = () => {
    this.setState((prevState) => ({ show: !prevState.show }));
  }


  async function handleLogin () {
    const response = await api.post('/devs', { username: user })

    const { _id } = response.data

    await AsyncStorage.setItem('user', _id)

    console.log(_id);

    navigation.navigate('Main', { user: _id })
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={ Platform.OS === 'ios' }
      style={ styles.container }
    >
      <Image source={ logo } />
      <TextInput
        autoCapitalize="none"
        autoCorrect={ false }
        placeholder="Digite seu usuário do Github"
        placeholderTextColor="#999"
        style={ styles.input }
        value={ user }
        onChangeText={ setUser }
      />
      <TouchableOpacity onPress={this.onPress} style={styles.button}>
          <Text style={styles.text}>Press Me</Text>
        </TouchableOpacity>
        <NPS show={this.state.show} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
})