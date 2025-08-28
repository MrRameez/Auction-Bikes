import React, { useEffect, useState, useContext } from "react";
import { db } from "../../utiles/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { message, Button, Spin } from "antd";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contaxt/AuthContaxt";

function UserManage() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Admin check
  useEffect(() => {
    if (!user || user.uid !== "4NDC83H684QXgHJ7tFubCdsul2r2") {
      navigate("/");
    }
  }, [user, navigate]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      } catch (err) {
        console.error(err);
        message.error("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    if (user && user.uid === "4NDC83H684QXgHJ7tFubCdsul2r2") {
      fetchUsers();
    }
  }, [user]);

  // Toggle disable/enable
  const toggleDisable = async (u) => {
    try {
      const userRef = doc(db, "users", u.id);
      await updateDoc(userRef, { isDisabled: !u.isDisabled });
      setUsers(users.map(user => user.id === u.id ? { ...user, isDisabled: !u.isDisabled } : user));
      message.success(`User ${!u.isDisabled ? "disabled" : "enabled"} successfully!`);
    } catch (err) {
      console.error(err);
      message.error("Failed to update user status.");
    }
  };

  if (loading) return <Spin tip="Loading users..." className="mt-5" />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>
      <ul className="space-y-3">
        {users.map((u) => (
          <li
            key={u.id}
            className="flex items-center justify-between border p-3 rounded-lg shadow-md bg-gray-100"
          >
            <div>
              <p className="text-lg font-medium">Username: {u.username || "N/A"}</p>
              <p className="text-sm text-gray-600">Email: {u.email}</p>
              <p className="text-sm text-red-500">Status: {u.isDisabled ? "Disabled" : "Active"}</p>
            </div>
            <Button
              className={u.isDisabled ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}
              onClick={() => toggleDisable(u)}
              type="primary"
            >
              {u.isDisabled ? "Enable" : "Disable"}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManage;
