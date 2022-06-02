import React,{useContext} from "react";
import "./topbar.css";
import {Search,Person,Chat,Notifications} from '@mui/icons-material'
import {Link,Navigate} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'

export default function Topbar() {

  const {user,dispatch} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  //const PF = 'https://hobbymatcher.herokuapp.com/images/'

  function handleLogout(){
    dispatch({type:'LOGOUT'});
    <Navigate to="/" />
  }

  return <div className="topbarContainer">
    <div className="topbarLeft">
      <Link to="/" style={{textDecoration:"none"}}>
      <span className="logo">HobbyMatcher</span>
      </Link>
    </div>
    <div className="topbarCenter">
      <div className="searchBar">
        <Search className="searchIcon"/>
        <input placeholder="Search for friends,posts or videos" className="searchInput" />
      </div>
    </div>
    <div className="topbarRight">
      <div className="topbarLinks">
        <Link to="/" style={{textDecoration:"none",color:'white'}}>
          <span className="topbarLink">Homepage</span>
        </Link>
        <Link to={`/profile/${user.username}`} style={{textDecoration:"none",color:'white'}}>
          <span className="topbarLink">Timeline</span>
        </Link>
        <Link to="/messenger" style={{textDecoration:"none",color:'white'}}>
          <span className="topbarLink">Messenger</span>
        </Link>
        <span className="topbarLink" onClick={handleLogout}>Logout</span>
      </div>
      <div className="topbarIcons">
        <div className="topbarIconItem">
          <Person/>
          <span className="topbarIconBadge">1</span>
        </div>
        <div className="topbarIconItem">
          <Chat/>
          <span className="topbarIconBadge">2</span>
        </div>
        <div className="topbarIconItem">
          <Notifications/>
          <span className="topbarIconBadge">1</span>
        </div>
      </div>
      <Link to={`/profile/${user.username}`}>
      <img src={user.profilePicture ? PF+user.profilePicture : PF + 'person/noAvatar.png'} alt="" className="topbarImg" />
      </Link>
    </div>
  </div>;
}
