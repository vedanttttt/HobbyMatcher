import './online.css'
import {Link} from 'react-router-dom'

export default function Online({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div>
      <li className="rightbarFriend">
          	<div className="rightbarProfileImgContainer">
          		<img className="rightbarProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF+'person/noAvatar.png'} alt="" />
          		<span className="rightbarOnline"></span>
          	</div>
            <Link to={`/profile/${user.username}`} style={{"textDecoration":"none"}}>
          	  <h1 className="rightbarUsername">{user.username}</h1>
              {user.hobbies.length>0 && <span>Hobbies are :- </span>}
              {
                user.hobbies &&
                user.hobbies.map((h)=>{
                  return <span>{h}</span>
                })
                }
            </Link>
       </li>
    </div>
)
}
