import "./explore.css";
import Online from '../../components/online/Online';
import {useContext, useEffect,useState} from 'react'
import axios from 'axios'
import { AuthContext } from "../../context/AuthContext";
import Topbar from '../../components/topbar/Topbar'

export default function Explore() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER


  const [others,setOthers] = useState([])

  const {user,dispatch} = useContext(AuthContext)

  useEffect(()=>{
    const getOthers = async () => {
      try{
          console.log(user._id)
        const othersList = await axios.get('/users/explore/'+user._id);
        console.log(othersList.data)
        //console.log('hey')
        setOthers(othersList.data)
      }
      catch(err){
        console.log('heyya')
        console.log(err)
      }
    }
    getOthers()
  },[user])

  return (
    <div>
        <Topbar/>
        <div style={{"textAlign":"center"}}>
          <h1>Explore Users</h1>
        </div>
        <div>
          {others.map((u) => {
              return( 
                  <Online user={u} />
              )
          })}
        </div>
    </div>

  );
}

