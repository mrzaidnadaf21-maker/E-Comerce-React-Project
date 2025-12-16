import React from "react";
import Products from "../Products/Products";

const Wishlist = ({
  activePanel,
  handleClose,
  wishList,
  addToCart,
  clearWishlist,
}) => {
  return (
    <div>
      <div
        className={`flex flex-col justify-between gap-10 bg-zinc-100 fixed top-0 right-0 bottom-0 left-auto z-40 w-[400px]  border-l border-zinc-400 py-7 transform transition-transform  duration-400   
        ${activePanel === "wishlist" ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* heading */}
        <div className="px-10">
          <h3 className="text-3xl font-bold text-zinc-800 text-center">
            Your Wishlist
          </h3>
        </div>

        {/* cart items */}
        <div className="flex-1 flex flex-col gap-2 overflow-y-auto  no-scrollbar">
          {wishList.length === 0 ? (
            <p className="text-red-800 font-bold text-center">
              Your WishList is Empty
            </p>
          ) : (
            wishList.map((product, index) => {
              return (
                <div
                  className={`flex items-center gap-3 px-5 py-1 border-y-1 border-zinc-300
                  ${index % 2 === 0 ? "bg-amber-200" : "bg-white"}
              `}
                >
                  {/* cart image */}
                  <div className="w-20 h-20 ">
                    <img
                      src={product.image}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* product details */}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-semibold text-zinc-800 text-lg">
                        {product.name}
                      </h4>
                      <p className="text-sm text-zinc-500">
                        Added:{product.addDate}
                      </p>
                    </div>

                    <div className="flex justify-between">
                      {/* <span>$0.00</span> */}

                      <div>
                        {product.onSale && (
                          <span className="text-zinc-600 font-semibold text-lg line-through mr-4 ">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}

                        <span className="text-amber-600 font-semibold text-lg  ">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        className="bg-amber-600 text-white text-sm px-5 py-[5px] rounded-full active:bg-amber-500 cursor-pointer"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* buttons */}
        <div className="flex gap-x-2 px-10">
          <button
            className="bg-amber-600 text-white flex-1 h-[7vh] cursor-pointer active:bg-amber-500"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="bg-amber-600 text-white flex-1 h-[7vh] cursor-pointer active:bg-amber-500"
            onClick={clearWishlist}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
