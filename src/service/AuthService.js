import axios from "./customize_axios";

const fetchProfile = async () => {
    let getUser = await axios.get("http://localhost:3000/getProfile");
    return getUser;
}

export default {
    fetchProfile,
};