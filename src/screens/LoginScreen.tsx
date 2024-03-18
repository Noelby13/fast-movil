import React from 'react'
import { KeyboardAvoidingView, Pressable, StyleSheet, Text , View, ScrollView, Platform} from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LogoFast } from '../components/LogoFast'
import UserLogin from '../components/UserLogin'

export const LoginScreen = () => {
  return (
    <SafeAreaView style ={styles.safeContainer}> 
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS ==='ios'? 'padding' : 'height'}  >
     <View style={styles.containerHeader}>
        {/* <UserLogin></UserLogin> */}
        <LogoFast></LogoFast>
        <Text style={styles.title}>Iniciar Sesion</Text>

     </View>
     <ScrollView style={{backgroundColor:'white'}}>

     <View style={styles.containerInfo}>
        <View style={styles.credentialsEmail}>
            <View ><Text style={styles.labelCredentials}>Email</Text></View>
            <TextInput style={styles.TextInput}></TextInput>
        </View>
        <View style={styles.credentialsPw}>
            <View ><Text style={styles.labelCredentials}>Contrasena</Text></View>
            <TextInput style={styles.TextInput}></TextInput>
        </View>
        <Pressable>
            <Text style ={styles.forgotPw}>Olvide mi contrasena</Text>
        </Pressable>
        <Button mode='contained' style={styles.button}>
            <Text>Entrar</Text>
        </Button>
        <Pressable>
            <Text style ={styles.forgotPw}>Olvide mi contrasena</Text>
        </Pressable>
        <Pressable>
            <Text style ={styles.forgotPw}>Olvide mi contrasena</Text>
        </Pressable>
       
    </View>
     </ScrollView>

     </KeyboardAvoidingView>

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
    }



})