import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export async function getLinks(data) {
  const userId = data;
  try {
    const { data } = await axios.get("/links", { userId: userId });

    if (data.error) {
      toast.error(data.error);
      return [];
    } else {
      console.log("links fetched!");
      console.log(data);
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function registerUser(data) {
  const { firstName, lastName, email, password } = data;
  try {
    const { data } = await axios.post("/register", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });

    if (data.error) {
      toast.error(data.error);
      return false;
    } else {
      toast.success("Registration Success! Welcome");
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function logoutUser() {
  try {
    const { data } = await axios.post("/logout");

    if (data.error) {
      toast.error(data.error);
      return false;
    } else {
      toast.success("You are logged out! see you soon");
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(data) {
  const { email, password } = data;
  try {
    const { data } = await axios.post("/login", { email, password });

    if (data.error) {
      toast.error(data.error);
      return false;
    } else {
      console.log("success!!");
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addLink(data) {
  const { name, link } = data;
  try {
    const { data } = await axios.post("/", { name, link });

    if (data.error) {
      toast.error(data.error);
      return false;
    } else {
      console.log("link added! success!!");
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchLinks() {}
