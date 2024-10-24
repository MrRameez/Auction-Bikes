import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../../utiles/firebase';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({}); // Initially an empty object

  useEffect(() => {
    getProductInfo();
  }, [id]); // Add 'id' as a dependency to refetch when the id changes

  const getProductInfo = async () => {
    try {
      const docRef = doc(db, 'products', id);
      const productInfo = await getDoc(docRef);

      if (productInfo.exists()) {
        setProduct(productInfo.data()); // Set the fetched product data to the state
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={product.name} // Dynamic image alt text
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={product.image || "https://dummyimage.com/400x400"} // Display product image or fallback image
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.brand || "BRAND NAME"} {/* Dynamic brand */}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name || "Product Name"} {/* Dynamic product name */}
            </h1>
            <div className="flex mb-4">
              {/* You can replace static rating here with dynamic data */}
              <span className="flex items-center">
                {/* Display product reviews count dynamically */}
                <span className="text-gray-600 ml-3">{product.reviews || 0} Reviews</span>
              </span>
            </div>
            <p className="leading-relaxed">
              {product.description || "No description available."} {/* Dynamic product description */}
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                {/* Colors can be dynamic if product has multiple colors */}
                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" />
                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" />
                <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none" />
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    <option>SM</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price || "0.00"} {/* Dynamic product price */}
              </span>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Add to Cart {/* You can handle adding to cart logic here */}
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
