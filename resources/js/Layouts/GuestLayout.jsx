import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
      <div>
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </Link>
      </div>
      <div className="py-2">
        <nav aria-label="breadcrumb">
          <ol className="inline-flex items-center space-x-4 rounded bg-secondary-50 px-4 py-2 text-sm font-medium">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="text-secondary-500 hover:text-secondary-600"
              >
                Home
              </Link>
            </li>
            <li className="inline-flex items-center space-x-4">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <a
                href="#"
                className="text-secondary-500 hover:text-secondary-600"
              >
                Logbooks
              </a>
            </li>
            <li
              className="inline-flex items-center space-x-4"
              aria-current="page"
            >
              <svg
                className="h-6 w-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <a
                className="text-secondary-700 hover:text-secondary-700"
                href="/entries"
              >
                List entries
              </a>
            </li>
          </ol>
        </nav>
      </div>
      <div className="w-full mx-auto container mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
