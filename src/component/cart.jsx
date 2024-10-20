import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015
dayjs.extend(relativeTime);


function Cart({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {products.map(({ image, Title, id, Price, desc, category, createdAt }) => (
        <div key={id} className="text-gray-600">
          <div className="p-2">
            <div className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <img
                className="lg:h-36 md:h-32 h-36 w-full object-cover object-center transition-transform duration-500 hover:rotate-2"
                src={image}
                alt={Title}
              />
              <div className="p-4">
                <h2 className="tracking-widest text-xs font-semibold text-gray-500 mb-1 uppercase">
                  {category}
                </h2>
                <h1 className="text-lg font-bold text-gray-800 mb-2">
                  {Title}
                </h1>
                <div>
                  <p className="leading-snug text-sm text-gray-600 mb-3">
                    {desc}
                  </p>
                  <p className="leading-snug text-sm text-gray-600 mb-3">
                    {dayjs().to(createdAt && createdAt.toDate().toDateString()) }
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-bold text-base">${Price}</span>
                  <a className="text-indigo-500 text-xs font-medium inline-flex items-center hover:underline">
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
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
