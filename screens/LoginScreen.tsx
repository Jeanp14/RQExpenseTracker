import { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
//import { login } from '../util/auth';
import {AuthInterface} from '../util/auth';
import { AuthContext } from '../store/auth-context';
import { storeExpense, updateExpense, deleteExpense } from '../util/http'; 

const LoginScreen = () => {

  const {login, signup, getUserData} = new AuthInterface();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  
  const loginHandler = async({email, password}: {email: string, password: string}) => {
    setIsAuthenticating(true);
    try{
      const {idToken} = await login({email, password});
      const {users} = await getUserData({idToken});
      console.log('users[0]:',users[0].localId);
      //console.log('users.localid',users.localId);
      authCtx.authenticate(idToken, users[0].localId);
    }catch(error){
      Alert.alert('Authentication failed!', 'Could not log you in. Please check your credentials or try again later.');
      setIsAuthenticating(false);
    }
    //setIsAuthenticating(false);
  }

  if(isAuthenticating){
    return <LoadingOverlay/>
  }

  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;