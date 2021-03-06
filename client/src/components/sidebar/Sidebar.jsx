import './sidebar.css'
import {RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School} from '@mui/icons-material'

import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext'
import {Link} from 'react-router-dom'
import { Users } from '../../dummyData';
import CloseFriend from '../closeFriend/CloseFriend'

export default function Sidebar() {

  const {user} = useContext(AuthContext);

  return <div className='sidebar'>
      <div className="sidebarWrapper">
      	<ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <Link to="/explore" style={{"textDecoration":'none',"color":'black'}}>
              <span className="sidebarListItemText">Explore</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <Link to="/findbyrange" style={{"textDecoration":'none',"color":'black'}}>
              <span className="sidebarListItemText">Find By Range</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
        	{Users.map((user)=>(
            <CloseFriend key={user.id} user={user} />
          ))}
        </ul>
      </div>
  </div>;
}
