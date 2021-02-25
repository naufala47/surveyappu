import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Input, Layout, Select, Text, IndexPath, SelectItem, Card, Avatar, Button } from '@ui-kitten/components';
import { RNCamera } from 'react-native-camera';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';

const lstGender = ["Male", "Female"]
const lstStatus = ["Single", "Married"]
let camera = null;
const UpdateScreen = () => {
    const [name, setName] = useState("")
    const [gender, setGender] = useState(0)
    const [umur, setUmur] = useState(0)
    const [status, setStatus] = useState(0)
    const [gps, setGps] = useState("")
    const [gambar, setGambar] = useState("")

    const renderOption = (title) => {
        <SelectItem title={title} />
    };

    useEffect(() => {
        Geolocation.getCurrentPosition(info => {
            setGps(info.coords.longitude + ";" + info.coords.latitude)
        });
    }, [])

    const saveData = () => {
        firestore()
            .collection('Users')
            .doc()
            .add({
                name: name,
                gender: lstGender[gender, row],
                umur: umur,
                status: lstStatus[status, row],
                gps: gps
            })
            .then(() => {
                console.log('User added!');
            });
    }

    const takePicture = async () => {
        console.log("test")
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const data = await camera.takePictureAsync(options);
            setGambar(data.uri)
            console.log(data.uri);
        }
    };
    return (
        <Layout style={styles.container}>
            {/* <Text style={styles.layout}>Nama</Text> */}
            <Input
                style={styles.layout}
                placeholder='Masukkan Nama'
                value={name}
                onChangeText={txtName => setName(txtName)}
            />
            {/* <Text style={styles.layout}>Gender</Text> */}

            {/* <Text style={styles.layout}>Umur</Text> */}
            <Input
                style={styles.layout}
                placeholder='Masukkan Umur'
                value={umur}
                onChangeText={txtUmur => setUmur(txtUmur)}
            />

            <View style={styles.layout}>
                <RNCamera
                    ref={ref => {
                        camera = ref;
                    }}
                    style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', height: 100, width: 100 }}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                    }}
                />
                <Button onPress={() => takePicture()}>
                    Ambil Foto
            </Button>

                {/* <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture} >
                    <Text style={{ fontSize: 14 }}> Ambil </Text>
                </TouchableOpacity>
            </View> */}
            </View>
            {/* <Card style={styles.containerPicture}>
            <Avatar style={styles.avatar} size='giant' source={{ uri: 'https://static.miraheze.org/hololivewiki/thumb/3/36/Momosuzu_Nene_-_Portrait_01-1.png/270px-Momosuzu_Nene_-_Portrait_01-1.png' }} />
            <Button onPress={() => { }}>
                Ambil Foto
            </Button>

          <Text style={styles.layout}>Lokasi</Text> 
        </Card> */}
            <Card style={styles.containerPicture}>
                <Input
                    style={styles.layout}
                    placeholder='Lokasi Anda'
                    value={gps}
                    onChangeText={txtGps => setGps(txtGps)}
                />
                <Button onPress={() => { }}>
                    Ambil Lokasi
        </Button>
                <Button onPress={() => saveData()}>
                    submit
            </Button>
            </Card>
        </Layout >
    )
}

export default UpdateScreen

const styles = StyleSheet.create({})
