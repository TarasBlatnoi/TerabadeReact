import axios from "axios"

export const client = axios.create({
  baseURL: "https://terabade-dfdc3e3cb126.herokuapp.com/api/v1",
  withCredentials: true,
})
