import { useEffect, useState } from "react";
import socket from "../services/socket";

const ActiveUsersList = () => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.on("activeUsers", (users) => setUsers(users));

    return () => {
      socket.off("activeUsers");
    };
  }, []);

  return (
    <div>
      {users.map((user) => (
        <li key={user}>{user}</li>
      ))}
    </div>
  );
};

export default ActiveUsersList;
