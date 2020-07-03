import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {AppContext} from '../context/state/AppState'

export const Header = () => {
    const {userId,logOut} = useContext(AppContext);
    const history = useHistory();
    const headerStyling = {
        display: 'flex',
        width: '30%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        listStyle: 'none',
        marginLeft: 'auto',
        marginRight: '1vh'
    };

    const navItem = {
        padding: '5px',
        color: 'orange',
        background: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '0 1vh',
        fontWeight: 'bold'
    };

    const logUserOut = () => {
        logOut();
        history.push('/login');
    }

    return (
        <nav style={{background: 'orange',height: '7vh', width: '100%',display: 'flex',
            justifyContent: 'space-around', alignItems: 'center', boxShadow: '1px 1px 1px 1px #888'}}>
            <div style={{marginLeft: '1vh'}}>
                <Link to='/' style={{textDecoration: 'none'}}>
                    <h1 style={{color: 'white'}}>Vid To Go</h1>
                </Link>
            </div>

            <ul style={headerStyling}>
              <li style={navItem}>
                    <Link to='/' style={{textDecoration: 'none',color: 'orange'}}>Dashboard</Link>
              </li>
              <li style={navItem}>
                    <Link to='/settings' style={{textDecoration: 'none',color: 'orange'}}>Settings</Link>
              </li>
              {
                  userId !== '' ? (
                    <li style={navItem} onClick={logUserOut}>
                        Log Out
                    </li>
                  ) : (
                    <React.Fragment>
                        <li style={navItem}>
                            <Link to='/login' style={{textDecoration: 'none',color: 'orange'}}>Log In</Link>
                        </li>

                        <li style={navItem}>
                            <Link to='/register' style={{textDecoration: 'none',color: 'orange'}}>Register</Link>
                        </li>  
                    </React.Fragment>
                    
                  )
              }
              
            </ul>  
        </nav>
    )
}
