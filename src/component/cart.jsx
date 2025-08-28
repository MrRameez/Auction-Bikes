import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; 
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contaxt/AuthContaxt"; // <- apka context path
dayjs.extend(relativeTime);

function Cart({ products }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleCardClick = (id) => {
    if (user) {
      navigate(`/products/${id}`);
    } else {
      navigate("/login"); 
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {products.map(({ image, Title, id, price, desc, category, createdAt }) => (
        <div
          key={id}
          onClick={() => handleCardClick(id)}
          className="cursor-pointer h-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
          <img
            className="lg:h-48 md:h-40 h-48 w-full object-cover object-center transition-transform duration-500 hover:rotate-2"
            src={image}
            alt={Title}
          />
          <div className="p-4">
            <h2 className="tracking-widest text-xs font-semibold text-gray-500 mb-1 uppercase">
              {category}
            </h2>
            <h1 className="text-lg font-bold text-gray-800 mb-2">{Title}</h1>
            <div>
              <p className="leading-snug text-sm text-gray-600 mb-3">{desc}</p>
              <p className="leading-snug text-sm text-gray-600 mb-3">
                {dayjs(createdAt?.toDate()).fromNow()}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-indigo-600 font-bold text-base">
                ${price}
              </span>
              <span className="text-indigo-500 text-xs font-medium inline-flex items-center hover:underline">
                Learn More
                <svg
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
