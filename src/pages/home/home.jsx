import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utiles/firebase";
import Cart from "../../component/cart";
import AddCartImage from "../../component/addCartImage";
import background from "../../img/image.jpg.webp";
import { Link } from "react-router-dom";
import { Button } from "antd";

function Home() {
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
      const q = query(productCollection, orderBy("createdAt", "desc"), limit(4));
      const querySnapshot = await getDocs(q);
      const myArr = [];

      querySnapshot.forEach((doc) => myArr.push({ ...doc.data(), id: doc.id }));

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
    <div className="container mx-auto p-4">
      {/* Banner Section */}
      <div
        className="relative h-[400px] lg:h-[559px] bg-cover bg-center p-4 rounded-lg shadow-lg flex flex-col justify-center items-start overflow-hidden"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="flex flex-col justify-center items-start h-full p-6 opacity-0 translate-y-10 animate-fadeIn">
          <h1 className="text-white font-bold text-4xl lg:text-5xl mb-2 transition-transform duration-300 hover:scale-110 hover:text-blue-400">
            Auction Bikes
          </h1>
          <p className="text-gray-300 text-base lg:text-lg mb-4 w-full lg:w-3/4 transition-all duration-300 transform hover:scale-105 hover:text-blue-300">
            Get ready to bid on your dream bike! Our auction features high-quality bikes that offer unmatched performance and style.
          </p>
          <Link to="/products">
            <Button className="transition-transform hover:scale-110">See All</Button>
          </Link>
        </div>

        <style>
          {`
            @keyframes fadeIn {
              0% {
                opacity: 0;
                transform: translateY(20px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.6s ease-out forwards;
            }
          `}
        </style>
      </div>

      {/* Product Section */}
      <div className="container mx-auto my-8 bg-slate-100 p-6 rounded-md">
        {loading && (
          <p className="text-center text-gray-500">Loading products...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && <Cart products={products} />}
      </div>

      {/* Featured Products Section */}
      <div className="container mx-auto my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AddCartImage
          Title="Bike"
          Price={30000}
          desc="Enjoy your life"
          image="https://cdn.pixabay.com/photo/2022/06/08/05/43/motorbike-7249769_640.jpg"
          category="Motorcycle"
        />
        <AddCartImage
          Title="Bike"
          Price={30000}
          desc="Enjoy your life"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWuogn5GBliOIpOPoX9dbk_aEIbYaAh_6OJA&s"
          category="Motorcycle"
        />
        <AddCartImage
          Title="Bike"
          Price={30000}
          desc="Enjoy your life"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDH4ct7QjYy0W9mPQRKD3ohXMO8nUq6_mBfg&s"
          category="Motorcycle"
        />
        <AddCartImage
          Title="Bike"
          Price={30000}
          desc="Enjoy your life"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDVaB8pjiNrDSPofBMoO2f2oHnbhReqBaUKA&s"
          category="Motorcycle"
        />
        <AddCartImage
          Title="Bike"
          Price={30000}
          desc="Enjoy your life"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNyVNWxOuSEXfdkDkjZ1tII6J4as0DM1RCEw&s"
          category="Motorcycle"
        />
        <AddCartImage
          Title="Recar"
          Price={30000}
          desc="Enjoy your life"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGZHTwN6HmD2AbGJw_ryoL_Wn2mccxYsolQ&s"
          category="Motorcycle"
        />
      </div>
    </div>
  );
}

export default Home;
