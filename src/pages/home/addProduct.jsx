import { useForm } from 'react-hook-form';
import { categories } from '../../utiles/categories';
import { addDoc, collection, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../utiles/firebase';
import { message, Spin } from 'antd';
import { useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contaxt/AuthContaxt';

function AddProduct() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check user status from Firestore
useEffect(() => {
  if (!auth.currentUser) {
    navigate("/login");
    return;
  }

  const checkUserStatus = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    console.log("Checking user status for UID:", auth.currentUser);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("✅ User Data from Firestore:", data); // 👈 pura user object
      console.log("👉 isDisabled Value:", data.isDisabled); // 👈 sirf isDisabled

      setIsDisabled(data.isDisabled === true);
    } else {
      console.warn("⚠️ No user document found in Firestore for this UID:", auth.currentUser.uid);
    }
    setLoading(false);
  };

  checkUserStatus();
}, [navigate]);


  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Prevent disabled users except admin
    if (isDisabled && user.email !== "admin@gmail.com") {
      message.error("Your account is now disabled. Please wait 3 days.");
      return;
    }

    try {
      const productCollectionRef = collection(db, "products");
      await addDoc(productCollectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser.uid,
        status: "active",
      });

      reset();
      message.success("Product Added Successfully");

      if (user.email !== "admin@gmail.com") {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to add product. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gray-100 flex flex-grow justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg ml-5 p-4">
        <h1 className="text-center text-2xl font-bold mb-4 text-gray-900">Add Product Detail</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Product Title */}
          <CustomInput
            label="Product Title"
            placeholder="Enter product title"
            obj={register("Title", { 
              required: "Product title is required",  
              maxLength: { value: 50, message: "Title cannot exceed 50 characters" } 
            })}
            fieldName="Title"
            error={errors}
            errorMsg={errors?.Title?.message}
            type="text"
          />

          {/* Product Description */}
          <CustomInput
            label="Product Description"
            type="textarea"
            placeholder="Enter product description"
            obj={register("desc", { required: "Product description is required" })}
            fieldName="desc"
            error={errors}
            errorMsg={errors?.desc?.message}
          />

          {/* Price & Quantity */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <CustomInput
                label="Product price"
                type="number"
                placeholder="Enter product price"
                obj={register("price", { 
                  required: "Product price is required",  
                  valueAsNumber: true,
                  min: { value: 0, message: "Price cannot be negative" }
                })}
                fieldName="price"
                error={errors}
                errorMsg={errors?.price?.message}
              />
            </div>
            <div className="w-1/2">
              <CustomInput
                label="Product Quantity"
                type="number"
                placeholder="Enter quantity"
                obj={register("quantity", { 
                  required: "Product quantity is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Quantity must be at least 1" }
                })}
                fieldName="quantity"
                error={errors}
                errorMsg={errors?.quantity?.message}
              />
            </div>
          </div>

          {/* Image URL */}
          <CustomInput
            label="Product Image URL"
            type="url"
            placeholder="Enter image URL"
            obj={register("image", { required: "Image URL is required" })}
            fieldName="image"
            error={errors}
            errorMsg={errors?.image?.message}
          />

          {/* Location */}
          <CustomInput
            label="Product Location"
            placeholder="Enter current location"
            obj={register("location", { required: "Product location is required" })}
            fieldName="location"
            error={errors}
            errorMsg={errors?.location?.message}
          />

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-gray-50 focus:ring-2 focus:ring-orange-400 focus:border-transparent hover:border-orange-500 transition duration-150 ease-in-out"
              required
            >
              <option value="">Select a category</option>
              {categories.map((data) => (
                <option key={data.slug} value={data.slug}>{data.name}</option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500 text-xs">{errors.category.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isDisabled && user.email !== "admin@gmail.com"}
              className={`w-full text-white font-semibold py-1 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                isDisabled && user.email !== "admin@gmail.com"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700"
              }`}
            >
              {isDisabled && user.email !== "admin@gmail.com" ? "Not Permitted" : "Submit"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddProduct;

// Custom Input Component
const CustomInput = ({ fieldName, obj, placeholder, errorMsg, type, label, error }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          {...obj}
          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-gray-50 focus:ring-2 focus:ring-orange-400 focus:border-transparent hover:border-orange-500 resize-none transition duration-150 ease-in-out"
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          {...obj}
          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-gray-50 focus:ring-2 focus:ring-orange-400 focus:border-transparent hover:border-orange-500 transition duration-150 ease-in-out"
        />
      )}
      {error[fieldName] && <span className="text-red-500 text-xs">{errorMsg}</span>}
    </div>
  );
};
