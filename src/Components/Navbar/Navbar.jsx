// import React, { useState } from "react";
import AmberLogo from "../../assets/amber-logo.png";
import { IoSearch } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { HiShoppingBag } from "react-icons/hi2";
import Wishlist from "../Wishlist/Wishlist";

const Navbar = ({
  handleScroll,
  setSearchTerm,
  isScrolled,
  handlePanel,
  totalItems,
  wishList,
}) => {
  return (
    <header
      className={`bg-white fixed top-0 left-0 right-0 z-30 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-6 max-sm:px-4 h-[14vh] max-sm:h-[13vh] sm:py-1 flex items-center">
        {/* LEFT - Logo */}
        <div className="flex-shrink-0">
          <a className="flex w-14 h-14 max-sm:w-11 max-sm:h-11 bg-zinc-100 rounded-full p-2">
            <img src={AmberLogo} className="w-full h-full object-contain" />
          </a>
        </div>

        {/* CENTER - Search Bar */}
        <div className="flex-1 flex justify-center px-3 mt-1 search-main ">
          <div className=" flex w-full max-w-[500px] p-1 rounded-full border-2 border-amber-600 search-boxs h-8 sm:h-12">
            <input
              type="text"
              placeholder="Search...."
              autoComplete="off"
              className="h-[7vh] max-sm:h-[5vh] pl-4 flex-1 focus:outline-none w-[20px]"
              onFocus={handleScroll}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="flex justify-center items-center h-full aspect-square rounded-full bg-amber-600 text-white search-icons">
              <IoSearch className="text-base" />
            </button>
          </div>
        </div>

        {/* RIGHT - Icons */}
        <div className="flex items-center gap-x-4 flex-shrink-0">
          {/* Wishlist */}
          <button
            className="text-[1.7rem] max-sm:text-[1.4rem] relative"
            onClick={() => handlePanel("wishlist")}
          >
            <GoHeartFill />
            {wishList.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white w-5 h-5 rounded-full text-[12px] flex items-center justify-center border-2 border-white">
                {wishList.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            className="text-[1.7rem] max-sm:text-[1.4rem] relative"
            onClick={() => handlePanel("cart")}
          >
            <HiShoppingBag />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white w-5 h-5 rounded-full text-[12px] flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
