import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../backend";
import { useForm } from "react-hook-form";
import { isAutheticated } from "../auth/helper";
import swal from "sweetalert";
import moment from "moment";
function ProfileChannel() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [IsuserChannelCreated, setIsuserChannelCreated] = useState([]);
  const CreateChannel = (data) => {
    const { token } = isAutheticated();
    console.log(`Bearer ${token}`);
    // console.log(user);
    axios
      .post(
        `${API}/create/channel`,
        {
          channel_name: data.channel_name,
          channel_description: data.channel_description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        swal(
          "Good job!",
          `Your Channel ${res.data.channel_name} Created SucessFully!`,
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "Ooops!",
          text: `${err}`,
          icon: "warning",
          dangerMode: true,
        });
      });
  };
  const { user } = isAutheticated();
  useEffect(() => {
    axios
      .get(`${API}/finduserchannels/${user._id}`)
      .then((res) => {
        console.log(res.data, "sdsd");
        setIsuserChannelCreated(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const CreateChannelForm = () => {
    return (
      <>
        <p className="mb-3"> Create Your Channel </p>
        <form onSubmit={handleSubmit(CreateChannel)}>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              {...register("channel_name", { required: true })}
            />
            <label for="floatingInput " className="text-dark">
              Channel Name
            </label>
            {errors.channel_name && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div class="form-floating">
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{ height: "100px" }}
              {...register("channel_description", { required: true })}
            ></textarea>
            <label for="floatingTextarea2" className="text-dark">
              Channel Description
            </label>
            {errors.channel_description && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              style={{
                background: "linear-gradient(180deg, #FFC700 0%, #FF0000 100%)",
              }}
              className="btn  btn-lg p-2 rounded d-block"
            >
              Create Channel
            </button>
          </div>
        </form>
      </>
    );
  };
  const DisplayChannelInfo = () => {
    return (
      IsuserChannelCreated.length &&
      IsuserChannelCreated.filter(function (el) {
        return el.user_id == user._id;
      }).map((d, i) => {
        return (
          <div key={i}>
            <p>Channel Name :- {d.channel_name}</p>
            <p>Channel Description :- {d.channel_description}</p>
            <p>
              Subcribers :-{" "}
              {d.subscribers.length ? d.subscribers.length : "No subscribers"}
            </p>
            <p>
              Channel Launch at :-
              {moment(d.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
          </div>
        );
      })
    );
  };
  return (
    <div className="pb-4">
      {console.log(IsuserChannelCreated, "IsuserChannelCreated")}
      {console.log(
        IsuserChannelCreated.filter((el) => el.user_id === user._id).length,
        "IsuserChannelCreated.filter((el) => el.user_id === user._id).length"
      )}

      {IsuserChannelCreated.filter((el) => el.user_id === user._id).length ==
      0 ? (
        <div>{CreateChannelForm()}</div>
      ) : (
        <div>{DisplayChannelInfo()}</div>
      )}
    </div>
  );
}

export default ProfileChannel;
