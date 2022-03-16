import React from "react";
import Base from "../core/Base";
import { signout,isAutheticated } from "../auth/helper";
import axios from 'axios'
function  Profile() {
  
  const {user} = isAutheticated()

  return (
    <Base>
     <div className="mt-5 pt-5">
     <p>Name:  {isAutheticated() && user.name}</p>
      <p>email:  {isAutheticated() && user.email}</p>
     </div>
    </Base>
  );
}

export default  Profile;
