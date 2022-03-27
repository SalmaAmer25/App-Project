import React , {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button , Image,TouchableOpacity } from 'react-native';
import {Camera} from 'expo-camera';


export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [camera, setCamera] = useState();
  const [image, setImage] = useState();
  const [type, setType] = useState(Camera.Constants.Type.front);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');

    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data=await camera.takePictureAsync()
      setImage(data.uri);

    }
  }

  if(hasCameraPermission === false) {
    return <Text> No Camera Access</Text>
  }

  return (
    <View style={{flex:1}}>
      <View style={styles.cameraContainer}>
        <Camera ref={ref=> setCamera(ref)}
        style={styles.fixedRatio}
        type={type}
        ratio={'1:1'}
        />
      </View>
      <Button 
      title="Flip Camera"
      onPress={()=> {
        setType( type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back);

      }} >
      </Button>
     
      <Button 
      title="Take Picture"
      onPress={() => takePicture()}>
      </Button>
      {image && <Image source={{uri:image}} style={{flex:1}}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
   flexDirection:'row'
  },
  fixedRatio : {
    flex:1,
    aspectRatio:1

  }
});
