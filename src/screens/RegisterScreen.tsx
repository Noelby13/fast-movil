import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Pressable, StyleSheet, Text , View, ScrollView, Platform} from 'react-native'
import { TextInput, Button, Snackbar} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LogoFast } from '../components/LogoFast'
import UserLogin from '../components/UserLogin'
import { useAuthStore } from '../services/store/authStore'
import { emailValidator } from '../helpers/emailValidator'
import BackButton from '../components/BackButton'


export const RegisterScreen = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [pw, setPw] = useState("");
    const [pwValidation, setPwValidation] = useState("");
    const login = useAuthStore(state => state.login);
    const isAuth = useAuthStore(state => state.isAuthenticated);
    const register = useAuthStore(state => state.register);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [passwordIcon, setPasswordIcon] = useState('eye');    
    const errorMessage = useAuthStore(state => state.errorMessage);
     // Asegúrate de obtener el mensaje de error del estado


    useEffect(() => {
        if (errorMessage){
            console.log("Hola desde use")
            setSnackbarMessage(errorMessage);
            setSnackbarVisible(true);
        }
        if (isAuth) {
            navigation.reset({
                index: 0, // Esto define el índice de la nueva ruta en el stack, que es 0 ya que será la única pantalla en el stack.
                routes: [{name: 'DashboardScreen'}], // Esto define las rutas del nuevo estado del stack de navegación.
            });
        }
    }, [isAuth, errorMessage]);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
        setPasswordIcon(passwordVisibility ? 'eye-off' : 'eye');
    };


    const onRegisterPressed = async () => {
        if (email.trim() === "" || pw.trim() === "") {
          setSnackbarMessage("Por favor, ingrese todos los campos");
          setSnackbarVisible(true);
          return;
        }


        const emailError = emailValidator(email)
        if (emailError){
            setSnackbarMessage(emailError);
            setSnackbarVisible(true);
            return;
        }

        if (pw != pwValidation){
            setSnackbarMessage("Contraseñas no coinciden");
            setSnackbarVisible(true);
            return;
        }
    
        try {
          const successRegister = await register(email.trim(), pw.trim(), pwValidation.trim(),fullName.trim());

          if (!successRegister) {
            setSnackbarMessage("Ocurrio un error durante la creación de su cuenta");
            setSnackbarVisible(true);
            return;
          }

          const successLogin = await login(email,pw);

          if (!successLogin){
            setSnackbarMessage("La cuenta se creo satisfactoriamente, pero hubo un error al iniciar sesión ")
            setSnackbarVisible(true);
          }

          //Dada la naturaleza asincronica, existen situaciones donde se creo la cuenta y esta autenticado
          //pero todavia no se ha actualizado, entonces pasare a utilizar useEffect
        //   console.log("Estoy aqui")
        //   console.log("Valor del estado :", isAuth)

        //   if (isAuth){
        //     console.log("Verificando ")
        //       navigation.navigate('DashboardScreen');
        //   }


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
        <BackButton goBack={navigation.goBack}/>
        <Text style={styles.title}>Registrarme</Text>
        <Text style={{fontSize:16, color: 'white'}}>Registrate para acceder a la app</Text>


     </View>
     <ScrollView style={{backgroundColor:'white', borderRadius:14}} >

     <View style={styles.containerInfo}>
        <View style={styles.credentialsEmail}>
            <View ><Text style={styles.labelCredentials}>Nombre completo</Text></View>
            <TextInput style={styles.TextInput} onChangeText={setFullName} value={fullName}></TextInput>
        </View>
        <View style={styles.credentialsEmail}>
            <View ><Text style={styles.labelCredentials}>Email</Text></View>
            <TextInput style={styles.TextInput} onChangeText={setEmail} value={email}></TextInput>
        </View>
        <View style={styles.credentialsPw}>
            <View ><Text style={styles.labelCredentials}>Contraseña</Text></View>
            <TextInput 
            style={styles.TextInput} 
            onChangeText={setPw} 
            value={pw} 
            
            secureTextEntry={passwordVisibility} 
            right={<TextInput.Icon icon={passwordIcon} onPress={togglePasswordVisibility}/>}>

            </TextInput>
        </View>
        <View style={styles.credentialsPw}>
            <View ><Text style={styles.labelCredentials}>Confirmar contraseña</Text></View>
            <TextInput style={styles.TextInput} onChangeText={setPwValidation} value={pwValidation} secureTextEntry={passwordVisibility} right={<TextInput.Icon icon={passwordIcon} onPress={togglePasswordVisibility}/>}></TextInput>
        </View>

        
       
        <Button mode='contained' style={styles.button} onPress={onRegisterPressed}>
            <Text>Entrar</Text>
        </Button>
        
       
    </View>
     </ScrollView>

     </KeyboardAvoidingView>

     <Snackbar
    visible={snackbarVisible}
    onDismiss={() => setSnackbarVisible(false)}
    duration={3000}
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