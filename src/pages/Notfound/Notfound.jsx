
import { Link } from "react-router-dom";
import { Ghost } from "lucide-react";

const Notfound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Ghost className="w-24 h-24 text-gray-600 animate-pulse" />
        </div>
        <h1 className="text-7xl font-bold text-white">404</h1>
        <p className="mt-4 text-2xl font-light text-gray-400">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 text-sm font-semibold bg-white text-black rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
