import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Pressable, StyleSheet, Text , View, ScrollView, Platform} from 'react-native'
import { TextInput, Button, Snackbar} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LogoFast } from '../components/LogoFast'
import UserLogin from '../components/UserLogin'
import { useAuthStore } from '../services/store/authStore'


export const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const login = useAuthStore(state => state.login);
    const isAuth = useAuthStore(state => state.isAuthenticated);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [passwordIcon, setPasswordIcon] = useState('eye');    

    // useEffect(() => {
    //     if (isAuth) {
    //         console.log("Autenticación exitosa", isAuth);
    //         navigation.navigate('DashboardScreen');
    //     }
    // }, [isAuth]);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
        setPasswordIcon(passwordVisibility ? 'eye-off' : 'eye');
    };


    const onLoginPressed = async () => {
        if (email.trim() === "" || pw.trim() === "") {
          setSnackbarMessage("Por favor, ingrese su email y contraseña.");
          setSnackbarVisible(true);
          return;
        }
    
        try {
          const success = await login(email, pw);

          if (!success) {
            setSnackbarMessage("Credenciales incorrectas o problema al iniciar sesión.");
            setSnackbarVisible(true);
            return;
          }

          navigation.navigate('DashboardScreen');

        } catch (error) {
            console.error('Login error:', error);
            setSnackbarMessage("Error al iniciar sesión. Por favor, intente de nuevo.");
            setSnackbarVisible(true);
        }
      };



  return (
    <SafeAreaView style ={styles.safeContainer}> 
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS ==='ios'? 'padding' : 'height'}  >
     <View style={styles.containerHeader} >
        {/* <UserLogin></UserLogin> */}
        <LogoFast></LogoFast>
        <Text style={styles.title}>Iniciar Sesion</Text>

     </View>
     <ScrollView style={{backgroundColor:'white'}} >

     <View style={styles.containerInfo}>
        <View style={styles.credentialsEmail}>
            <View ><Text style={styles.labelCredentials}>Email</Text></View>
            <TextInput style={styles.TextInput} onChangeText={setEmail} value={email}></TextInput>
        </View>
        <View style={styles.credentialsPw}>
            <View ><Text style={styles.labelCredentials}>Contraseña</Text></View>
            <TextInput style={styles.TextInput} onChangeText={setPw} value={pw} secureTextEntry={passwordVisibility} right={<TextInput.Icon icon={passwordIcon} onPress={togglePasswordVisibility}/>}></TextInput>
        </View>
        <Pressable>
            <Text style ={styles.forgotPw}>Olvide mi contraseña</Text>
        </Pressable>
        <Button mode='contained' style={styles.button} onPress={onLoginPressed}>
            <Text>Entrar</Text>
        </Button>
        <Pressable>
            <Text style ={styles.labelNotAccount}>No tienes cuenta?</Text>
        </Pressable>
        <Pressable>
            <Text style ={styles.newAccount}>Registrarme</Text>
        </Pressable>
       
    </View>
     </ScrollView>

     </KeyboardAvoidingView>

     <Snackbar
    visible={snackbarVisible}
    onDismiss={() => setSnackbarVisible(false)}
    duration={3000} // Duración en milisegundos antes de ocultarse automáticamente
    >
    {snackbarMessage}   
    </Snackbar>

  </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    safeContainer:{
        flex: 1,
        width: '100%',
        backgroundColor: "#121223",
        justifyContent:'center',
        alignContent:'center'
    },
    container:{
        flex: 1,
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',

    },
    containerHeader:{
        flex:1,
        // justifyContent: 'center',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:26,

    },
    title:{
        color: 'white',
        fontSize:30,
        marginTop: 16,
        fontWeight:'bold'
        
    },
    containerInfo:{
        flex:3,
        width:'100%',
        backgroundColor: '#fff',
        borderRadius:14,
        paddingTop:10,
        paddingLeft:24,
        paddingRight:24
      
    },
    credentialsEmail:{
        width:'100%',
        height:86,
     
    },
    credentialsPw:{
        width:'100%',
        height:86,
        marginTop:24
     
    },
    TextInput:{
        width:'100%',
        height:62,
    },
    labelCredentials:{
        fontSize:16,
    },
    forgotPw:{
        alignSelf:"flex-end",
        marginTop:25,
        color:'#FF7622'
    },
    button:{
        marginTop:25,
        height:62,
        justifyContent:'center',
        backgroundColor:"#FF7622"
    },
    labelNotAccount: {
        alignSelf:'center',
        fontSize: 16,
        marginTop: 40,

    },
    newAccount:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF7622',
        alignSelf: 'center',
        marginTop: 13
    }



})