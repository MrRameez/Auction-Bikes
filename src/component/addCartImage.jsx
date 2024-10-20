function AddCartImage({ image, Title, category, desc, Price }) {
    return (
      <div className="p-2"> 
        <article className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md transition-shadow duration-300 transform hover:scale-105 hover:shadow-lg">
          <img
            className="lg:h-36 md:h-32 h-36 w-full object-cover object-center" 
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
            <p className="leading-snug text-sm text-gray-600 mb-3"> 
              {desc}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-indigo-600 font-bold text-base">${Price}</span> 
              <a 
                className="text-indigo-500 text-xs font-medium inline-flex items-center hover:underline" 
                href="#"
              >
                Learn More
                <svg
                  className="w-4 h-4 ml-1" 
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    );
  }
  
  export default AddCartImage;
  