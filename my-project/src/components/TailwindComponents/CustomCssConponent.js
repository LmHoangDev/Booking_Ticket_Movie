import React from "react";
//import "./CustomCss.css";
export default function CustomCssConponent() {
  return (
    <div className="container mt-1">
      <article className="bg-gray-500 p-5 shadow-lg">
        <p className="text-4xl text-white">Responsive</p>

        <p className="card">
          To control the font size of an element at a specific breakpoint, add a
          prefix to any existing font size utility. For example, use md:text-lg
          to apply the text-lg utility at only medium screen sizes and above.
        </p>
      </article>
    </div>
  );
}
