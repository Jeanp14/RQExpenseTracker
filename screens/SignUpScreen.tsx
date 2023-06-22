import { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import {AuthInterface} from '../util/auth';


const SignupScreen = () => {

  const {login, signup} = new AuthInterface();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  
  const signupHandler = async({email, password}: {email: string, password: string}) => {
    setIsAuthenticating(true);
    try{
      const {idToken} = await signup({email, password});
      console.log('Token received', idToken);
      authCtx.authenticate(idToken);
    }catch(error){
      Alert.alert('Authentication failed!', 'Could not create user. Please check your input or try again later.');
      setIsAuthenticating(false);
    }
    //setIsAuthenticating(false);
  }

  if(isAuthenticating){
    return <LoadingOverlay/>
  }

  return( 
    <AuthContent onAuthenticate={signupHandler}/>
  );
}

export default SignupScreen;