import { useQuery } from "react-query";
import { auth, db } from "../../utiles/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

dayjs.extend(relativeTime);

async function getUserBids(userId) {
  if (!userId) return [];
  const q = query(collection(db, "bids"), where("userId", "==", userId));
  const snap = await getDocs(q);

  if (snap.empty) return [];

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

function UserBids() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      } else {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const { data: bidsArray = [], isLoading } = useQuery({
    queryKey: ["bids", userId],
    queryFn: () => getUserBids(userId),
    enabled: !!userId, // only run when logged in
  });

  if (isLoading) {
    return <p className="text-gray-400">Loading your bids...</p>;
  }

  if (!bidsArray.length) {
    return <p className="text-gray-400">No bids found</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">Your Bids</h2>
      <ul className="space-y-3">
        {bidsArray.map((bid) => (
          <li
            key={bid.id}
            className="p-3 bg-gray-800 rounded-lg text-white shadow"
          >
            <p>Product: {bid.productTitle || "Unknown"}</p>
            <p>Bid Price: $ {bid.bidPrice}</p>
            <p className="text-sm text-gray-400">
              {bid.createdAt?.toDate
                ? dayjs(bid.createdAt.toDate()).fromNow()
                : "No timestamp"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserBids;
