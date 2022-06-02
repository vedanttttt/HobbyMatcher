import "./findbyrange.css";
import Online from "../../components/online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../../components/topbar/Topbar";

export default function FindByRange() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [others, setOthers] = useState([]);
  const [list, setList] = useState([]);

  const [bool, setBool] = useState(false);

  const { user, dispatch } = useContext(AuthContext);

  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);

  const [range, setRange] = useState(100);

  useEffect(() => {
    function shareLocation() {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setLong(position.coords.longitude);
        setLat(position.coords.latitude);
      });
    }
    shareLocation();

    const getOthers = async () => {
      try {
        //console.log(user._id);
        const othersList = await axios.get("/users/explore/" + user._id);
        //console.log(othersList.data);
        //console.log('hey')
        const templist = [];
        othersList.data.map((person) => {
          //console.log(person);
          if (person.latitude) {
            console.log(person.latitude, lat);
            let a = person.latitude - lat;
            let b = person.longitude - long;

            console.log(a, b);

            let c = Math.sqrt(a * a + b * b);
            console.log(c);
            if (c <= range) {
              console.log(person);
              templist.push(person);
              //addUsers(person);
              //setList(...list, person);
              //templist.add(person);
            }
          }
        });
        console.log(templist);
        setOthers(templist);
      } catch (err) {
        console.log("heyya");
        console.log(err);
      }
    };
    // const getOthers = async () => {
    //   try {
    //     console.log(user._id);
    //     const othersList = await axios.get("/users/explore/" + user._id);
    //     console.log(othersList.data);
    //     //console.log('hey')
    //     setOthers(othersList.data);
    //   } catch (err) {
    //     console.log("heyya");
    //     console.log(err);
    //   }
    // };
    getOthers();
  }, [user]);

  //   const getOthers = async () => {
  //     try {
  //       console.log(user._id);
  //       const othersList = await axios.get("/users/explore/" + user._id);
  //       //console.log(othersList.data);
  //       //console.log('hey')
  //       const templist = [];
  //       othersList.data.map((person) => {
  //         //console.log(person);
  //         if (person.latitude) {
  //           console.log(person.latitude, lat);
  //           let a = person.latitude - lat;
  //           let b = person.longitude - long;

  //           console.log(a, b);

  //           let c = Math.sqrt(a * a + b * b);
  //           console.log(c);
  //           if (c <= range) {
  //             console.log(person);
  //             //addUsers(person);
  //             setList(...list, person);
  //             templist.add(person);
  //           }
  //         }
  //       });
  //       setOthers(templist);
  //     } catch (err) {
  //       console.log("heyya");
  //       console.log(err);
  //     }
  //   };

  function handleSubmit() {
    //e.preventDefault();
    //getOthers();
    //console.log("helloo", list);
    //console.log("hello");
    // others.map((person) => {
    //   console.log(person);
    //   //if (person.latitude != 0) {
    //   var a = person.latitude - lat;
    //   var b = person.longitude - long;
    //   var c = Math.sqrt(a * a + b * b);
    //   console.log(c);
    //   if (c <= range) {
    //     console.log(person);
    //     setList(...list, person);
    //   }
    //}
    //}
    //setBool(true);
  }

  //   const addUsers = async (person) => {
  //     await setList(...list, person);
  //   };

  return (
    <div>
      <Topbar />
      <div style={{ textAlign: "center" }}>
        <h1>Find People By Range</h1>
      </div>
      {/* <div>
        <button onClick={shareLocation}>
          <h2>Share location</h2>
        </button>
      </div>
      <div>
        <h3>Set Radius</h3>
        <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={range}
          onChange={(e) => {
            console.log(e.target.value);
            setRange(e.target.value);
          }}
          placeholder="Enter the range"
        />
        <button onClick={handleSubmit}>Submit</button>
        </form>
      </div> */}
      <div>
        {/* {list.size > 0 &&
          list.map((u) => {
            console.log("heyy");
            return <Online user={u} />;
          })} */}
        {others.map((u) => {
          return <Online user={u} />;
        })}
      </div>
    </div>
  );
}
