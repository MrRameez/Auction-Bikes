import { useForm } from 'react-hook-form';
import { categories } from '../../utiles/categories';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../utiles/firebase';
import { message } from 'antd';
import { useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contaxt/AuthContaxt';

function AddProduct() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if the user is not authorized
  useEffect(() => {
    if (!user || user.email !== "rameez@gmail.com") {
      navigate('/');  // Redirect to home if not authorized
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const productCollectionRef = collection(db, "products");
    const obj = {
      ...data,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser.uid,
      status: "active",
    };
    addDoc(productCollectionRef, obj).then(() => {
      reset();
      message.success("Product Added Successfully");
      navigate("/");
    });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gray-100 flex flex-grow justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg ml-5 p-4">
        <h1 className="text-center text-2xl font-bold mb-4 text-gray-900">Add Product Detail</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Product Title Input */}
          <CustomInput
            label={"Product Title"}
            placeholder={"Enter product title"}
            obj={register("Title", { 
              required: "Product title is required",  
              maxLength: { value: 50, message: "Title cannot exceed 50 characters" } 
            })}
            fieldName={"Title"}
            error={errors}
            errorMsg={errors?.Title?.message}
            type="text"
          />

          {/* Product Description TextArea */}
          <CustomInput
            label={"Product Description"}
            type={"textarea"}
            placeholder={"Enter product description"}
            obj={register("desc", { 
              required: "Product description is required"
            })}
            fieldName={"desc"}
            error={errors}
            errorMsg={errors?.desc?.message}
          />

          {/* Product Price and Quantity Inputs */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <CustomInput
                label={"Product Price"}
                type={"number"}
                placeholder={"Enter product price"}
                obj={register("Price", { 
                  required: "Product price is required",  
                  valueAsNumber: true,
                  min: { value: 0, message: "Price cannot be negative" }
                })}
                fieldName={"Price"}
                error={errors}
                errorMsg={errors?.Price?.message}
              />
            </div>
            <div className="w-1/2">
              <CustomInput
                type={"number"}
                label={"Product Quantity"}
                placeholder={"Enter quantity"}
                obj={register("quantity", { 
                  required: "Product quantity is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Quantity must be at least 1" }
                })}
                fieldName={"quantity"}
                error={errors}
                errorMsg={errors?.quantity?.message}
              />
            </div>
          </div>

          {/* Product Image URL Input */}
          <CustomInput
            label={"Product Image URL"}
            type={"url"}
            placeholder={"Enter image URL"}
            obj={register("image", { 
              required: "Image URL is required"
            })}
            fieldName={"image"}
            error={errors}
            errorMsg={errors?.image?.message}
          />

          {/* Product Location Input */}
          <CustomInput
            label={"Product Location"}
            placeholder={"Enter current location"}
            obj={register("location", { 
              required: "Product location is required"
            })}
            fieldName={"location"}
            error={errors}
            errorMsg={errors?.location?.message}
          />

          {/* Product Category Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm bg-gray-50 focus:ring-2 focus:ring-orange-400 focus:border-transparent hover:border-orange-500 transition duration-150 ease-in-out"
            >
              <option value="">Select a category</option>
              {categories.map((data) => (
                <option key={data.slug} value={data.slug}>
                  {data.name}
                </option>
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
              className="w-full bg-orange-600 text-white font-semibold py-1 rounded-md hover:bg-orange-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;

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
      {/* Displaying error messages */}
      {error[fieldName] && (
        <span className="text-red-500 text-xs">{errorMsg}</span>
      )}
    </div>
  );
};
