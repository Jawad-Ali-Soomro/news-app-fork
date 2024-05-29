import { motion } from "framer-motion";
import React from "react";
const HeroSection = () => {
  return (
    <React.Fragment>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <section className="px-2 py-32 bg-background md:px-0">
          <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
            <div className="flex flex-wrap items-center sm:-mx-3">
              <div className="w-full md:w-1/2 md:px-3">
                <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                  <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-2xl xl:text-2xl">
                    <p className="text-indigo-800">Discover the World through ArticleHub -</p>
                    Your Personalized News Experience
                  </h1>
                  <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                    Stay informed with the latest news from around the world. Our app brings you real-time updates on
                    current events, politics, technology, entertainment, and more. Whether {"you're"} interested in
                    global headlines or niche topics, ArticleHub has you covered.
                  </p>
                  <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                    <button className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto">
                      Explore
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 ml-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1={5} y1={12} x2={19} y2={12} />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                    <a
                      href="#_"
                      className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                  <img src="https://images.unsplash.com/photo-1498049860654-af1a5c566876?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </React.Fragment>
  );
};

export default HeroSection;
