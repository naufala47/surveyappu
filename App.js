import React, { useEffect, useState } from 'react'
import { View, TextInput } from 'react-native'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import HomeScreen from './Page/HomeScreen/HomeScreen';
import InputPage from './Page/InputPage/InputPage';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
//rcc pake function biasa
//rnfe pake arrow function
const App = () => {

  const [name, setNama] = useState("")

  // useEffect(() => {
  //   const rename = (name) => {
  //     return name + "ok"//nambahin kata ok
  //   }
  //   //untuk set mount pertama kali / kayak compounentDidMount
  //   setNama(rename("ahmad"))
  // }, [])

  return (
    // <View>
    //   <TextInput style={{ borderWidth: 1 }} onChangeText={(input) => setNama(input)} />
    //   <Text>{name}</Text>
    // </View>
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <HomeScreen />
      </ApplicationProvider>
    </>
  )
}

export default App;
