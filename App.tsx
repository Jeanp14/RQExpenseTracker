import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/ui/IconButton';
import ExpensesContextProvider from './store/expenses-context';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignUpScreen';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {

  const authCtx = useContext(AuthContext);

  return(
    <BottomTabs.Navigator 
      screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => (
          <IconButton 
            icon="add" 
            size={24} 
            color={tintColor} 
            onPress={() => {
              navigation.navigate('ManageExpense')
            }}
          />
        ),
        headerLeft: ({tintColor}) => (
          <IconButton 
            icon="exit" 
            size={24} 
            color={tintColor} 
            onPress={() => {
              authCtx.logout()
            }}
          />
        )  
        
      })}>
      <BottomTabs.Screen 
        name='RecentExpenses' 
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => (
            <Ionicons name='hourglass' color={color} size={size}/>
          )
        }}
      />
      <BottomTabs.Screen 
        name='AllExpenses' 
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({color, size}) => (
            <Ionicons name='calendar' color={color} size={size}/>
          ) 
        }}
      />
    </BottomTabs.Navigator>
  )
}

const AuthenticatedStack = () => {
  return(
    <ExpensesContextProvider>

        <Stack.Navigator 
          screenOptions={{
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor: 'white'
          }}
        >
          <Stack.Screen 
            name='ExpenseOverview' 
            component={ExpensesOverview}
            options={
              {headerShown: false}
            }
          />
          <Stack.Screen 
            name='ManageExpense' 
            component={ManageExpense} 
            options={{
              presentation: 'modal'
            }}
          />
        </Stack.Navigator>
      
    </ExpensesContextProvider>
  )
}

const AuthStack = () => {
  return(
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 }
      }}
    >
      <Stack.Screen
        name='Login'
        component={LoginScreen}
      />
      <Stack.Screen
        name='SignUp'
        component={SignupScreen}
      />
    </Stack.Navigator>
  )
}

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  return(
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack/>}
      {authCtx.isAuthenticated && <AuthenticatedStack/>}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation/>
      </AuthContextProvider>
      </QueryClientProvider>
    </> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
