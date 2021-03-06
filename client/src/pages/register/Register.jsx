import "./register.css";
import { useRef,useEffect,useState } from "react";
import axios from "axios";
import {useNavigate,Link} from 'react-router-dom'

export default function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const hobby = useRef();
  const navigate = useNavigate();

  const [long,setLong] = useState(0);
  const [lat,setLat] = useState(0);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function(position) {
      //console.log("Latitude is :", position.coords.latitude);
      //console.log("Longitude is :", position.coords.longitude);
      //console.log(typeof position.coords.latitude)
      setLong(position.coords.longitude);
      setLat(position.coords.latitude);
    });
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password.current.value !== passwordAgain.current.value){
      passwordAgain.current.setCustomValidity('Passwords dont match')
    }
    else{
      const user = {
        username : username.current.value,
        email : email.current.value,
        password : password.current.value,
        hobby : hobby.current.value,
        longitude : long,
        latitude : lat
      }
      try{
      console.log(user)
      await axios.post('/auth/register',user);
      navigate('/login')
      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">HobbyMatcher</h3>
          <span className="loginDesc">
            Connect with friends around you on HobbyMatcher.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Email" required type="email"  ref={email} className="loginInput" />
            <input placeholder="Password" required type="password" minLength="6" ref={password} className="loginInput" />
            <input placeholder="Password Again" required type="password" ref={passwordAgain} className="loginInput" />
            <input placeholder="Hobbies" type="text" ref={hobby} className="loginInput" />
            <button className="loginButton" type="submit">Sign Up</button>
            <h3>Already have an account ?</h3>
            <Link to='/login'>
            <button className="loginRegisterButton">
              Log into Account
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}