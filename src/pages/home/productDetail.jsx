import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  db,
  auth,
  getProductInfo,
  updateBidStatus,
  getProductBids,
} from "../../utiles/firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useQuery } from "react-query";
import { Button, message } from "antd";
import BidModal from "../../component/bidModal";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔑 Redirect if user not logged in
  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductInfo(id),
  });

  const {
    data: bidsData,
    isLoading: isLoadingBids,
    refetch: refetchBids,
  } = useQuery({
    queryKey: ["bids", id],
    queryFn: () => getProductBids(id),
  });

  const handleOnBid = () => {
    setIsModalOpen(true);
  };

  if (isLoading) return <h1>Loading...</h1>;
  if (!isLoading && !data.exists()) return <h1>Product Not Found</h1>;

  const { category, image, desc, price, Title, createdBy } = data?.data();

  let bidsArray = [];
  if (!bidsData?.empty) {
    bidsData?.forEach((data) =>
      bidsArray.push({ ...data.data(), id: data.id })
    );
  }

  // ✅ Safe check for auth.currentUser
  const isOwner = createdBy === auth.currentUser?.uid;

  const handleOnClickAcceptReject = async (bidId, status) => {
    try {
      await updateBidStatus(bidId, status);
      message.success("Bid Updated Successfully");
      refetch();
      refetchBids();
    } catch (err) {
      console.log(err);
      message.error(err.message);
    }
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden flex">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={Title}
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={image || "https://dummyimage.com/400x400"}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {Title || "Product Name"}
            </h1>
            <p className="leading-relaxed">
              {desc || "No description available."}
            </p>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${price || "0.00"}
              </span>
              <button
                disabled={isOwner}
                onClick={handleOnBid}
                className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
              >
                Add to your amount
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bid Modal */}
      <BidModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productId={id}
        refetch={refetch}
        refetchBids={refetchBids}
        price={price}
        title={Title}
      />

      {/* Bids Section */}
      <div className="w-1/2 flex flex-col mr-3">
        <h1 className="text-3xl font-bold text-center">Bids</h1>
        {bidsArray.map((bid) => (
          <div
            key={bid.id}
            className="flex p-3 my-2 border rounded-md justify-between"
          >
            <h1>{bid.bidPrice}</h1>
            <h1>{dayjs().to(bid.createdAt.toDate())}</h1>
            {isOwner && bid?.status === "pending" ? (
              <div>
                <Button
                  onClick={() => handleOnClickAcceptReject(bid.id, "accept")}
                  type="primary"
                >
                  Accept
                </Button>
                <Button
                  onClick={() => handleOnClickAcceptReject(bid.id, "reject")}
                  danger
                >
                  Reject
                </Button>
              </div>
            ) : (
              <h1>{bid?.status}</h1>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductDetail;
