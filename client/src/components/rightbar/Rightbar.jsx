import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import {useContext, useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import {Add,Remove} from '@mui/icons-material'

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const [friends,setFriends] = useState([])

  const [others,setOthers] = useState([])

  const {user : currentUser,dispatch} = useContext(AuthContext)

  const [followed,setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  // useEffect(()=>{
  //   axios.get(`/users/friends/${user._id}`)
  //   .then(res => console.log(res))
  //   .then(res => setFriends(res.data))
  //   .catch(err => console.log(err))
  // },[user])

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  useEffect(()=>{
    const getOthers = async () => {
      try{
        const othersList = await axios.get('/users/explore/'+user._id);
        console.log(othersList.data)
        //console.log('hey')
        setOthers(othersList.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getOthers()
  },[])

  // useEffect(()=>{
  //   console.log(others)
  // },[others])

  const handleFollow = async () => {
    try{
      if(followed){
       await axios.put('/users/'+user._id+'/unfollow',{userId : currentUser._id});
       dispatch({type : 'UNFOLLOW',payload:user._id})
      }
      else{
       await axios.put('/users/'+user._id+'/follow',{userId : currentUser._id})
       dispatch({type:'FOLLOW',payload:user._id})
      }
    }
    catch(err){
      console.log(err)
    }

    setFollowed(!followed)
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={`${PF}ad.png`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {others.map((u) => (
            <Online key={u._id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    const {city = 'N/A',from='N/A',hobbies=['N/A'],relationship} = user

    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleFollow}>
            {followed ? 'Unfollow' : 'Follow'}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relatonship:</span>
            <span className="rightbarInfoValue">{relationship === 1 ? 'Single' : relationship===2 ? 'Married' : '-'}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Hobbies:</span>
            <span className="rightbarInfoValue">{hobbies.map((h)=> <h4>{h} </h4>)}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend)=>(
            <Link to={`/profile/${friend.username}`} style={{textDecoration:'none'}}>
              <div className="rightbarFollowing">
              <img
                src={friend.profilePicture ? PF + friend.profilePicture : PF + 'person/noAvatar.png'}
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">{friend.username}</span>
            </div>
          </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

// import "./rightbar.css";
// import { Users } from "../../dummyData";
// import Online from "../online/Online";
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import {Add,Remove} from '@mui/icons-material'

// export default function Rightbar({ user }) {
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//   const [friends, setFriends] = useState([]);
//   const { user: currentUser, dispatch } = useContext(AuthContext);
//   const [followed, setFollowed] = useState(
//     currentUser.followings.includes(user?.id)
//   );
//   const [others,setOthers] = useState([])

//   useEffect(() => {
//     const getFriends = async () => {
//       try {
//         const friendList = await axios.get("/users/friends/" + user._id);
//         setFriends(friendList.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getFriends();
//   }, [user]);

//     useEffect(()=>{
//     const getOthers = async () => {
//       try{
//         const othersList = await axios.get('/users/explore/'+user._id);
//         console.log(othersList)
//         //console.log('hey')
//         setOthers(othersList.data)
//       }
//       catch(err){
//         console.log(err)
//       }
//     }
//     getOthers()
//   },[])


//   const handleClick = async () => {
//     try {
//       if (followed) {
//         await axios.put(`/users/${user._id}/unfollow`, {
//           userId: currentUser._id,
//         });
//         dispatch({ type: "UNFOLLOW", payload: user._id });
//       } else {
//         await axios.put(`/users/${user._id}/follow`, {
//           userId: currentUser._id,
//         });
//         dispatch({ type: "FOLLOW", payload: user._id });
//       }
//       setFollowed(!followed);
//     } catch (err) {
//     }
//   };

//   const HomeRightbar = () => {
//     return (
//       <>
//         <div className="birthdayContainer">
//           <img className="birthdayImg" src="assets/gift.png" alt="" />
//           <span className="birthdayText">
//             <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
//           </span>
//         </div>
//         <img className="rightbarAd" src="assets/ad.png" alt="" />
//         <h4 className="rightbarTitle">Online Friends</h4>
//         <ul className="rightbarFriendList">
//           {Users.map((u) => (
//             <Online key={u.id} user={u} />
//           ))}
//         </ul>
//       </>
//     );
//   };

//   const ProfileRightbar = () => {
//     return (
//       <>
//         {user.username !== currentUser.username && (
//           <button className="rightbarFollowButton" onClick={handleClick}>
//             {followed ? "Unfollow" : "Follow"}
//             {followed ? <Remove /> : <Add />}
//           </button>
//         )}
//         <h4 className="rightbarTitle">User information</h4>
//         <div className="rightbarInfo">
//           <div className="rightbarInfoItem">
//             <span className="rightbarInfoKey">City:</span>
//             <span className="rightbarInfoValue">{user.city}</span>
//           </div>
//           <div className="rightbarInfoItem">
//             <span className="rightbarInfoKey">From:</span>
//             <span className="rightbarInfoValue">{user.from}</span>
//           </div>
//           <div className="rightbarInfoItem">
//             <span className="rightbarInfoKey">Relationship:</span>
//             <span className="rightbarInfoValue">
//               {user.relationship === 1
//                 ? "Single"
//                 : user.relationship === 1
//                 ? "Married"
//                 : "-"}
//             </span>
//           </div>
//         </div>
//         <h4 className="rightbarTitle">User friends</h4>
//         <div className="rightbarFollowings">
//           {friends.map((friend) => (
//             <Link
//               to={"/profile/" + friend.username}
//               style={{ textDecoration: "none" }}
//             >
//               <div className="rightbarFollowing">
//                 <img
//                   src={
//                     friend.profilePicture
//                       ? PF + friend.profilePicture
//                       : PF + "person/noAvatar.png"
//                   }
//                   alt=""
//                   className="rightbarFollowingImg"
//                 />
//                 <span className="rightbarFollowingName">{friend.username}</span>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </>
//     );
//   };
//   return (
//     <div className="rightbar">
//       <div className="rightbarWrapper">
//         {user ? <ProfileRightbar /> : <HomeRightbar />}
//       </div>
//     </div>
//   );
// }