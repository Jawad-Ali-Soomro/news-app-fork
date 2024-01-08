import React from "react";

const ExploreSection = () => {
  const steps = [
    {
      title: "Step 1",
      description:
        "Download the Your News App from the App Store or Google Play.",
    },
    {
      title: "Step 2",
      description:
        "Create a personalized account to tailor your news preferences.",
    },
    {
      title: "Step 3",
      description:
        "Explore news articles from various categories and stay informed.",
    },
    {
      title: "Step 4",
      description: "Bookmark your favorite articles for easy access later on.",
    },
  ];
  return (
    <React.Fragment>
      <div className="bg-white py-12 text-center max-w-1/3">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="text-gray-600">
          Welcome to Your News App, where we strive to deliver the most reliable
          and up-to-date news to our users. Our dedicated team of journalists
          works tirelessly to bring you the latest stories from around the
          world.
        </p>
        <p className="mt-4 text-gray-600">
          Our mission is to empower you with knowledge, providing a platform
          where you can stay informed and make sense of the rapidly changing
          world.
        </p>
      </div>

      <div className="bg-gray-100 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Explore the App</h2>
        <p className="text-gray-600">
          Stay connected and informed wherever you go. Download the Your News
          App now and experience the future of news delivery.
        </p>
        <div className="mt-6">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full">
            Explore Now
          </button>
        </div>
      </div>
      <div className="bg-white py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-md shadow-md">
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ExploreSection;
