import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utiles/firebase";
import Cart from "../../component/cart";

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true); // Set loading to true at the start
    try {
      const productCollection = collection(db, "products");
      const q = query(productCollection, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const myArr = [];

      querySnapshot.forEach((doc) =>
        myArr.push({ ...doc.data(), id: doc.id })
      );

      setProducts(myArr);
      console.log("Fetched products:", myArr);
    } catch (error) {
      setError("Error fetching products. Please try again later.");
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false); // Set loading to false at the end
    }
  };

  return (
    <div className="container mx-auto overflow-hidden">
      
      <div className="container overflow-hidden">
        {loading && <p className="text-center text-gray-500">Loading products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && <Cart products={products} />}
      </div>
    </div>
  );
}

export default AllProduct;



