import "./login.css";
import { CircularProgress } from '@mui/material';
import {useContext, useRef} from 'react'
import {loginCall} from '../../apiCalls'
import {AuthContext} from '../../context/AuthContext'

export default function Login() {

  const email = useRef();
  const password = useRef();

  const {user,isFetching,error,dispatch} = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value},dispatch)
  }

  console.log(user)

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">HobbyMatcher</h3>
          <span className="loginDesc">
            Connect with friends around you on HobbyMatcher
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input placeholder="Email" type="email" required minLength="6" ref={email} className="loginInput" />
            <input placeholder="Password" type="password" required ref={password} className="loginInput" />
            <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color="inherit" /> : 'Log In'}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? <CircularProgress color="inherit" /> : 'Create a New Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}