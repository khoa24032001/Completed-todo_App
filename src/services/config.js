import axios from "axios";
import { ROOT_URL } from "../configs/app";

export const axiosClient = axios.create({
    baseURL: ROOT_URL,
})
