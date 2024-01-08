const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-8 text-center">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Your News App</h3>
          <p className="text-gray-400">
            Delivering the latest news to your fingertips.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Instagram
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Contact Us</h3>
          <p className="text-gray-400">info@yournewsapp.com</p>
        </div>
      </div>
      <p className="mt-6 text-gray-400">
        &copy; 2023 Your News App. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
