import React,{useContext,useState} from 'react'
import { withRouter,useHistory } from 'react-router-dom'
import '../App.css'
import {AppContext} from '../context/state/AppState'

function Login(){
    const {loginUser} = useContext(AppContext);
    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const loginTheUser = async (e) => {
        e.preventDefault();
        const userObj = {
            email,
            password
        };
        const jsonObj = JSON.stringify(userObj);

        setEmail('');
        setPassword('');
        await loginUser(jsonObj);

        //redirect back to / using react router dom
        history.push('/');
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className='auth-modal'>
            <form onSubmit={loginTheUser}>
                <input className='app-input' name='loginEmail' placeholder='Email' type='email' onChange={onEmailChange}/>
                <input className='app-input' name='loginPassword' placeholder='Password' type='password' onChange={onPasswordChange}/>
                <input className='app-btn' value='Log In' type='submit'/>
            </form>
        </div>
    )
}

export default withRouter(Login);