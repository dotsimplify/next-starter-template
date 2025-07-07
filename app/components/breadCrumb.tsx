import React from "react";
import Link from "next/link";

const BreadCrumb = (props: any) => {
  return (
    <nav
      className="flex px-5 py-4 text-gray-700 bg-black "
      aria-label="BreadCrumb"
    >
      <ol className="inline-flex flex-col justify-center  space-y-1 cursor-pointer md:space-y-0 md:items-center md:flex-row md:space-x-2 ">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex p-1 items-center text-sm font-medium text-gray-100 hover:text-blue-600 "
          >
            <svg
              className="w-3 h-3 md:me-2.5 mr-1 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Home
          </Link>
        </li>
        {!props.hide && (
          <li>
            <div className="flex items-center">
              <svg
                className="block w-3 h-3 text-gray-100 md:mx-1 rtl:rotate-180 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="text-sm font-medium text-gray-100 ms-1 hover:text-blue-600 md:ms-2 ">
                King Satta Latest News
              </span>
            </div>
          </li>
        )}
        <li aria-current="page">
          <div className="flex items-center">
            <svg
              className="w-3 h-3 mx-1 text-gray-400 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="text-sm font-medium text-gray-500 ms-1 md:ms-2">
              {props.link}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default BreadCrumb;
