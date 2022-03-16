// import React, { useEffect, useState } from "react";
// import { Link, Redirect } from "react-router-dom";
// import thubmnail from "../assets/coding.jpg";
// import { API } from "../backend";

// function SugesstionVideo(props) {
//   const [thumbInfo, setThumbInfo] = useState("");

//   const [thumbUser, setThumbUser] = useState("");

//   useEffect(() => {
//     setThumbInfo(props.thumbinfo);
//   }, []);

//   useEffect(() => {
//     fetch(`${API}/api/user/${props.thumbinfo.userId}`)
//       .then((response) => response.json())
//       .then((data) => setThumbUser(data.user));
//   }, [thumbInfo]);

//   return (
//     <div>
//       <a
//         href={`/VideoView/${props.thumbinfo.video._id}`}
//         className="d-flex mt-3 text-decoration-none text-white"
//       >
//         <div className="video-suggestion">
//           <img src={`${API}/${thumbInfo.path}`} alt="" />
//         </div>
//         <div className="video-info ms-2">
//           <h4 className="video-suggestion-title ">
//             {thumbInfo.video ? thumbInfo.video.title : ""}
//           </h4>
//           <h6 className="">{thumbUser && thumbUser.email}</h6>
//           <p class="fw-light">6 hours ago</p>
//         </div>
//       </a>
//     </div>
//   );
// }

// export default SugesstionVideo;
