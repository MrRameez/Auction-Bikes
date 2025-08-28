import React, { useEffect, useState, useContext } from "react";
import { db } from "../../utiles/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Button, message } from "antd";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contaxt/AuthContaxt";

function ProductManage() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
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
      }
    };
    fetchUsers();
  }, []);

  // Build user map for faster lookup
  const userMap = new Map(users.map(u => [u.id, u.name || u.email]));
  const getUserName = (uid) => userMap.get(uid) || "Unknown User";

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter(p => p.id !== id));
      message.success("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      message.error("Failed to delete product.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <div className="space-y-4">
        {products.map(product => (
          <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white">
            {product.image && <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded mr-4" />}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">Price: ${product.price}</p>
              <p className="text-sm text-gray-500">
                Added by: <span className="font-medium">{getUserName(product.createdBy)}</span>
              </p>
            </div>
            <Button danger onClick={() => handleDelete(product.id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductManage;
