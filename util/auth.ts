import axios from "axios";
import { API_KEY } from "../ignore/API";

const authenticate = async(mode: string, email: string, password: string) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    try{const response = await axios.post(
        url, 
        {
            email,
            password,
            returnSecureToken: true
        }
    )

    const token = response.data.idToken;
    return token;
    }catch(error){
        console.log(error);
        console.log('Api call failed');
    }  
}

export const createUser = (email: string, password: string) => {
    /* const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY,
        {
            email: email,
            password: password,
            returnSecureToken: true
        } 
    ); */
    return authenticate('signUp', email, password);
}

/* export const login = (email: string, password: string) => {
    return authenticate('signInWithPassword', email, password);
} */

export class AuthInterface{
    private readonly  API_KEY:string='AIzaSyB7orGyRp0tW9CTL0GxJE6P1fo7ktF2okM';
    private readonly  generateUrl=({mode}:{mode:'signInWithPassword'|'signUp'|'lookup'})=>{
        return `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${this.API_KEY}`

    }
    login=async ({email,password}:{email:string,password:string}) =>{

        try{
            const {data}=await axios.post(this.generateUrl({mode:'signInWithPassword'}),{
                email,
                password,
                returnSecureToken:true
                //ask backend to return token; if token is returned, we know that the login was successful
                })
            console.log(data);
            console.log({data});
            return data;
        }catch(err){
            const error=err as any
            console.log('error in login with',{...error})
            return error.message
        }


    }

    signup=async ({email,password}:{email:string,password:string})=>{

        try{
            const {data}=await axios.post(this.generateUrl({mode:'signUp'}),{
                email,
                password,
                returnSecureToken:true
                //ask backend to return token; if token is returned, we know that the signup was successful
                })
                return data;
        }catch(err){
            const error=err as any
            console.log('error in signup with',error.message)
            return error.message

        }
    }

    getUserData = async({idToken}: {idToken: string}) => {
        try{
            const {data}=await axios.post(this.generateUrl({mode:'lookup'}),{
                idToken
                })
            return data;
        }catch(err){
            const error=err as any
            console.log('error in getting user data with',{...error})
            return error.message
        }
    }

}
