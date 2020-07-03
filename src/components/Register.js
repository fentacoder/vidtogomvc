import React,{useContext,useState} from 'react'
import { withRouter,useHistory } from 'react-router-dom'
import '../App.css'
import {AppContext} from '../context/state/AppState'

function Register(){
    const {registerUser} = useContext(AppContext);
    const history = useHistory();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const registerTheUser = async (e) => {
        e.preventDefault();
        const userObj = {
            name,
            email,
            password
        };

        const jsonObj = JSON.stringify(userObj);

        await registerUser(jsonObj);

        //redirect back to / using react router dom
        history.push('/');
    }

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className='auth-modal'>
            <form onSubmit={registerTheUser}>
                <input className='app-input' name='registerName' placeholder='Name' type='text' onChange={onNameChange}/>
                <input className='app-input' name='registerEmail' placeholder='Email' type='email' onChange={onEmailChange}/>
                <input className='app-input' name='registerPassword' placeholder='Password' type='password' onChange={onPasswordChange}/>
                <input className='app-btn' value='Sign Up' type='submit'/>
            </form>
        </div>
    )
}

export default withRouter(Register);
