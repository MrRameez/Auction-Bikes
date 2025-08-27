
import React from "react";
import { useQuery } from "react-query";
import { auth, db } from "../../utiles/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

async function getUserBids(userId) {
  if (!userId) return []; // user not logged in
  const q = query(collection(db, "bids"), where("userId", "==", userId));
  const snap = await getDocs(q);

  if (snap.empty) return [];

  const bids = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return bids;
}

function UserBids() {
  const userId = auth.currentUser?.uid;

  const { data: bidsArray = [], isLoading } = useQuery({
    queryKey: ["bids", userId],
    queryFn: () => getUserBids(userId),
    enabled: !!userId, // only run when logged in
  });

  console.log("Fetched Bids:", bidsArray);

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
            <p>Product: {bid.productName || "Unknown"}</p>
            <p>Bid Price: ${bid.price}</p>
            <p className="text-sm text-gray-400">
              {bid.timestamp
                ? dayjs(bid.timestamp.toDate()).fromNow()
                : "No timestamp"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserBids;
