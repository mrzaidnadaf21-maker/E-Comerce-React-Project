import React, { useState } from "react";
import productList from "./ProductList";
import { GoHeartFill } from "react-icons/go";

const Products = ({ searchTerm, addToCart, addToWishList, wishList }) => {
  const categories = [
    "All",
    "Mens",
    "Womens",
    "Kids",
    "New Arrivals",
    "On Sale",
  ];
  const [activeTab, setActiveTab] = useState("All");

  const filteredItems = productList.filter((item) => {
    const matchesCateogry =
      activeTab === "All" ||
      (activeTab === "New Arrivals" && item.newArrival) ||
      (activeTab === "On Sale" && item.onSale) ||
      activeTab === item.category;

    //   search bar logic
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCateogry && matchesSearch;
  });
  const renderProducts = filteredItems.map((product) => {
    return (
      // Cards
      <div
        key={product.id}
        className="bg-white shadow-md hover:shadow-md transition-shadow duration-300 rounded-xl p-4 flex flex-col"
      >
        {/* Top icons */}
        <div className="flex justify-between items-center mb-2">
          <button
            className={`text-3xl cursor-pointer transition-colors duration-200
        ${
          wishList.some((item) => item.id === product.id)
            ? "text-red-500"
            : "text-gray-300"
        }`}
            onClick={() => addToWishList(product)}
          >
            <GoHeartFill />
          </button>

          {(product.onSale || product.newArrival) && (
            <span
              className={`px-3 py-1 text-white rounded-lg text-sm font-semibold
              ${product.onSale ? "bg-red-600" : "bg-green-600"}`}
            >
              {product.onSale ? "SALE" : "NEW"}
            </span>
          )}
        </div>

        {/* Product Image */}
        <div className="w-full h-52 flex justify-center items-center mb-3">
          <img
            src={product.image}
            className="h-full object-contain transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {product.name}
        </h3>

        {/* Prices */}
        <div className="flex justify-center gap-4 mt-2">
          {product.onSale && (
            <span className="text-gray-500 line-through font-medium">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}

          <span className="text-amber-600 font-semibold text-xl">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          className="mt-4 bg-amber-600 text-white text-lg py-2 rounded-lg hover:bg-amber-500 transition-colors duration-300"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    );
  });

  return (
    <section
      id="product-section"
      className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 py-10"
    >
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center mt-8">
        {categories.map((category) => {
          return (
            <button
              onClick={() => setActiveTab(category)}
              key={category}
              className={`px-4 sm:px-6 md:px-8 py-2 rounded text-sm sm:text-base cursor-pointer
              ${
                activeTab == category
                  ? "bg-amber-600 text-white"
                  : "bg-zinc-100 text-zinc-800"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Product Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-9 mt-12">
        {filteredItems.length === 0 ? (
          <p className="text-center col-span-4 text-zinc-800 font-bold ">
            No Product Found
          </p>
        ) : (
          renderProducts
        )}
      </div>
    </section>
  );
};

export default Products;
