import React from 'react';
import './App.css';
import {Header} from './components/Header'
import MovieGrid from './components/MovieGrid'
import Login from './components/Login'
import Register from './components/Register'
import Settings from './components/Settings'
import {Footer} from './components/Footer'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import {AppProvider} from './context/state/AppState'

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppProvider>
          <Header/>
          <Switch>
            <Route path='/' exact>
              <MovieGrid/>
            </Route>
            <Route path='/login'>
              <Login/>
            </Route>
            <Route path='/register'>
              <Register/>
            </Route>
            <Route path='/settings'>
              <Settings/>
            </Route>
          </Switch>
          <Footer/>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
