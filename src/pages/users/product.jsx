import { useQuery } from "react-query";
import { auth, getUserProducts, db } from "../../utiles/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Image, Button, message } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";

dayjs.extend(relativeTime);

function UserProduct() {
  const navigate = useNavigate();

  // Agar user login nahi hai to redirect karo
  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  // Agar abhi bhi user null hai to crash se bachne ke liye return kar do
  if (!auth.currentUser) {
    return null; // Ya ek loading spinner dikhado
  }

  const userId = auth.currentUser.uid;

  const {
    data: productData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", userId],
    queryFn: () => getUserProducts(userId),
  });

  let productArray = [];
  if (!productData?.empty) {
    productData?.forEach((data) =>
      productArray.push({ ...data.data(), id: data.id })
    );
  }

  const handleDelete = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      message.success("Product deleted successfully ✅");
      refetch(); // UI refresh karega
    } catch (err) {
      console.error(err);
      message.error("Error deleting product ❌");
    }
  };

  return (
    <div className="p-2 pl-4">
      <h1 className="text-3xl">Products</h1>
      {isLoading && <p>Loading...</p>}
      {productArray.length === 0 && !isLoading && <p>No products found</p>}

      {productArray.map((product) => (
        <div
          key={product.id}
          className="flex p-3 my-2 border rounded-md justify-between items-center"
        >
          <div className="flex">
            <Image src={product.image} height={100} width={100} />
            <div className="pl-2">
              <h1 className="font-semibold text-2xl">{product.title}</h1>
              <h1 className="font-normal text-md">{product.desc}</h1>
              <h1 className="font-light text-sm">
                {dayjs().to(product.createdAt.toDate())}
              </h1>
            </div>
          </div>

          {/* Delete Button */}
          <Button danger onClick={() => handleDelete(product.id)}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}

export default UserProduct;
