import React, { useState, useEffect } from "react"
import authorizationAxios from "../axiosApi"
import { Link } from "react-router-dom"
import axios from "axios"
import Addresses from "../components/Addresses"
import ProfileInfo from "../components/ProfileInfo"
import Orders from "../components/Orders"

export default function ProfilePage() {
  return (
    <div className="profile-conteiner">
      <ProfileInfo />
      <Addresses />
      <Orders />
    </div>
  )
}
