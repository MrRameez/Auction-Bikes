import React, { useEffect, useState } from "react";
import { db } from "../../utiles/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { message } from "antd";

function UserManage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  // Toggle disable/enable
  const toggleDisable = async (user) => {
    try {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, { isDisabled: !user.isDisabled });
      setUsers(
        users.map((u) =>
          u.id === user.id ? { ...u, isDisabled: !u.isDisabled } : u
        )
      );
      message.success(
        `User ${!user.isDisabled ? "disabled" : "enabled"} successfully!`
      );
    } catch (error) {
      console.error("Error updating user status:", error);
      message.error("Failed to update user status.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>
      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between border p-3 rounded-lg shadow-md bg-gray-100"
          >
            <div>
              <p className="text-lg font-medium">
                Username: {user.username || "N/A"}
              </p>
              <p className="text-sm text-gray-600">Email: {user.email}</p>
              <p className="text-sm text-red-500">
                Status: {user.isDisabled ? "Disabled" : "Active"}
              </p>
            </div>

            <button
              className={`px-4 py-2 rounded-md font-medium text-white ${
                user.isDisabled
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
              onClick={() => toggleDisable(user)}
            >
              {user.isDisabled ? "Enable" : "Disable"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManage;
