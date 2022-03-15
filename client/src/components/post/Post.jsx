import "./post.css";
import { MoreVert } from '@mui/icons-material';
import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";

export default function Post({post}) {

  const {desc,img,createdAt,comment,userId} = post;

  const [like,setLike] = useState(post.likes.length);
  const [isLiked,setIsLiked] = useState(false)
  const [user,setUser] = useState({})

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const {user:currentUser} = useContext(AuthContext);

  const likeHandler = () => {
    try{
      axios.put(`/posts/${post._id}/like`,{userId:currentUser._id})
    }
    catch(err){
      console.log(err)
    }

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }

  useEffect(()=>{
    axios.get(`/users?userId=${userId}`)
    .then((res)=> setUser(res.data))
    .catch(err => console.log(err))
  },[userId])

  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id,post.likes])


  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
            <img
              className="postProfileImg"
              src={user.profilePicture ? PF + user.profilePicture : PF+'person/noAvatar.png'}
              alt=""
            />
            </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{desc}</span>
          <img className="postImg" src={PF + img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} alt="" onClick={likeHandler} />
            <img className="likeIcon" src={`${PF}heart.png`}  alt="" onClick={likeHandler} />
            <span className="postLikeCounter">{like} people liked it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}