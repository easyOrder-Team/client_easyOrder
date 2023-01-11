import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/profile/actions";
import { NavBar } from "./NavBar";
import users from "../styles/Users.module.css";

export const Users = () => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profileReducer.profiles);
  useEffect(() => {
    dispatch(actions.getAllProfiles());
  }, []);
  console.log(profiles);
  if (profiles.length > 0) {
    return (
      <div>
        <NavBar />
        <div className={users.containerCardsUsers}>
          {profiles.map((profile) => {
            return (
              <div className={users.cardUser}>
                <img src={profile.picture} alt="" />
                <h1>{profile.name}</h1>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="containerSpin">
        <div className="spinner"></div>
      </div>
    );
  }
};
