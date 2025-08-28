import { useEffect, useState, useContext } from "react";
import { db } from "../../utiles/firebase";
import { collection, getDocs, query, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AuthContext } from '../../contaxt/AuthContaxt';

dayjs.extend(relativeTime);

function BidsManage() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBids = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      if (user.uid !== "4NDC83H684QXgHJ7tFubCdsul2r2") {
        navigate("/");
        return;
      }

      try {
        const q = query(collection(db, "bids"));
        const querySnapshot = await getDocs(q);

        const bidsData = await Promise.all(
          querySnapshot.docs.map(async (bidDoc) => {
            const bid = { id: bidDoc.id, ...bidDoc.data() };

            // Fetch product
            let productData = null;
            if (bid.productId) {
              const productSnap = await getDoc(doc(db, "products", bid.productId));
              if (productSnap.exists()) {
                productData = { id: productSnap.id, ...productSnap.data() };
                // Fallback to bid.productTitle if productSnap has no title
                if (!productData.productTitle && bid.productTitle) {
                  productData.productTitle = bid.productTitle;
                }
              }
            }

            // Fetch user
            let userData = null;
            if (bid.userId) {
              const userSnap = await getDoc(doc(db, "users", bid.userId));
              if (userSnap.exists()) userData = { id: userSnap.id, ...userSnap.data() };
            }

            // Log all the bid data together
            // console.log("Complete Bid Data:", {
            //   bid,
            //   product: productData,
            //   user: userData
            // });

            return { ...bid, product: productData, user: userData };
          })
        );

        setBids(bidsData);
      } catch (error) {
        console.error("Error fetching bids:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [user, navigate]);

  if (loading) return <p className="text-center mt-5">Loading bids...</p>;
  if (bids.length === 0) return <p className="text-center mt-5">No bids found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Bids</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bids.map((bid) => (
          <div key={bid.id} className="p-4 border rounded-lg shadow bg-white">
            <h3 className="font-semibold text-lg">
              {bid.productTitle || bid.product?.productTitle || bid.product?.product || "Unknown Product"}
            </h3>
            <p className="text-gray-600">
              Bid Price: <span className="font-bold">${bid.bidPrice}</span>
            </p>
            <p>Status: <span className="capitalize">{bid.status}</span></p>
            <p className="text-sm text-gray-500">
              Placed {dayjs(bid.createdAt?.toDate?.() || bid.createdAt).fromNow()}
            </p>
            <p className="text-sm text-gray-500">
              Bidder: {bid.user?.username || bid.user?.email || "Unknown User"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BidsManage;
