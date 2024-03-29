import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export async function getLinks(data) {
  try {
    const { data } = await axios.get("/links");

    if (data.error) {
      toast.error(data.error);
      return null;
    } else {
      return data;
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
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addLink(data) {
  const { name, link } = data;
  try {
    const { data } = await axios.post("/links", { name, link });

    if (data.error) {
      toast.error(data.error);
      return false;
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteLink(id) {
  try {
    const { data } = await axios.delete(`/links/${id}`);

    if (data.error) {
      toast.error(data.error);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateLink(id, isRead) {
  try {
    const { data } = await axios.patch(`/links/${id}`, { isRead });
    if (data.error) {
      toast.error(data.error);
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}
