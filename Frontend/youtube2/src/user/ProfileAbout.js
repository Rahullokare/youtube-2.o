import axios from "axios";
import React, { useEffect, useState } from "react";
import { signout, isAutheticated } from "../auth/helper";
import { API } from "../backend";
import moment from "moment";
function ProfileAbout() {
  const { user } = isAutheticated();
  const [userInfo, setUserInfo] = useState([]);
  const getUser = () => {
    axios
      .get(`${API}/user/${user._id}`)
      .then((response) => {
        setUserInfo([response.data]);
        console.log(userInfo, "response.data");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {userInfo.length &&
        userInfo.map((d, i) => {
          return (
            <div key={i} className="mt-5 ms-5">
              <p>Email : {d.email}</p>
              <p>
                Name : {d.name}&nbsp; {d.lastname}
              </p>
              <p>
                Stats : Joined{" "}
                {moment(d.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default ProfileAbout;
