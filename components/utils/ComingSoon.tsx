import Link from "next/link";
import React from "react";

interface ComingSoonProps {
  featureName: string;
  estimatedRelease?: string;
  redirectTo: string
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  featureName,
  estimatedRelease,
  redirectTo
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
          Coming Soon
        </h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {featureName}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We're working hard to bring you this exciting new feature. Stay tuned
          for updates!
        </p>
        {estimatedRelease && (
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Estimated release: {estimatedRelease}
          </p>
        )}
        <div className="mt-8">
          <div className="inline-flex rounded-md shadow">
            <Link
              href={redirectTo}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
