import React, { useEffect, useState } from "react";
import { db } from "../../utiles/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Button, message } from "antd";

function ProductManage() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch users
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

  console.log("Users:", users);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);
    console.log("Products:", products);

  // Delete product function
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter((p) => p.id !== id));
      message.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product: ", error);
      message.error("Failed to delete product.");
    }
  };

  // Helper: find user name/email by ID
  const getUserName = (uid) => {
    const user = users.find((u) => u.id === uid);
    return user ? user.name || user.email : "Unknown User";
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
          >
            {/* Image */}
            {product.image && (
              <img
                src={product.image}
                alt={product.title}
                className="w-20 h-20 object-cover rounded mr-4"
              />
            )}

            {/* Product Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">Price: ${product.price}</p>
              <p className="text-sm text-gray-500">
                Added by:{" "}
                <span className="font-medium">
                  {getUserName(product.createdBy)}
                </span>
              </p>
            </div>

            {/* Delete Button */}
            <Button danger onClick={() => handleDelete(product.id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductManage;
