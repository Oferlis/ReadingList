import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Dashboard</h1>
      {!!user && <h2>Hi {user.firstName}</h2>}
      {!!user && <h2>Hi {user.id}</h2>}
    </div>
  );
}
