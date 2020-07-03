import React,{useContext,useEffect,useState} from 'react'
import { withRouter,useHistory } from 'react-router-dom'
import {AppContext} from '../context/state/AppState'
import axios from 'axios';

function Settings() {
    const {userId,name,email,updateUser} = useContext(AppContext);
    const history = useHistory();
    const [newName,setName] = useState(name);
    const [newEmail,setEmail] = useState(email);
    const [currentPassword,setCurrentPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');

    useEffect(() => {
        if(userId === ''){
            history.push('/login');
        }
    },[history,userId]);

    const saveChanges = (e) => {
        e.preventDefault();
        if(newEmail !== '' && currentPassword !== '' && newPassword !== ''){
            axios.get(`api/v1/users/checkpassword/${currentPassword}`)
                .then(res => {
                    if(res.data.isSuccess){
                        const userObj = {
                            newName,
                            newEmail,
                            newPassword
                        };
                        const jsonObj = JSON.stringify(userObj);
                        updateUser(jsonObj);
                        history.push('/');
                    }
                })
                .catch(err => console.log(err));
        }

    }

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    }

    const onNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    }

    return (
        <div className='auth-modal'>
            <form onSubmit={saveChanges}>
                <input className='app-input' name='settingsName' placeholder='Name' type='text' onChange={onNameChange}/>
                <input className='app-input' name='settingsEmail' placeholder='Email' type='email' onChange={onEmailChange}/>
                <input className='app-input' name='settingsCurrentPassword' placeholder='Current Password' type='password'
                 onChange={onCurrentPasswordChange}/>
                 <input className='app-input' name='settingsNewPassword' placeholder='New Password' type='password'
                 onChange={onNewPasswordChange}/>
                <input className='app-btn' value='Save' type='submit'/>
            </form>
        </div>
    )
}

export default withRouter(Settings);