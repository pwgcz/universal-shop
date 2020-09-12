import React from "react";
import Addresses from "../components/Addresses";
import ProfileInfo from "../components/ProfileInfo";
import Orders from "../components/Orders";

export default function ProfilePage () {
  return (
    <div className="profile-conteiner">
      <ProfileInfo />
      <Addresses />
      <Orders />
    </div>
  )
}
