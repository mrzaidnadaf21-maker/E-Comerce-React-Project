import React from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
const Cart = ({
  activePanel,
  handleClose,
  cart,
  removeItem,
  quantityIncrement,
  quantityDecrement,
  subTotal,
  shippingFee,
  orderTotal,
  setOrderSummary,
}) => {
  return (
    <div
      className={`flex flex-col justify-between gap-5 bg-zinc-100 fixed top-0 right-0 bottom-0 left-auto z-40 w-[400px] border-l border-zinc-400 py-4 transform transition-transform duration-400
        ${activePanel === "cart" ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* heading */}
      <div className="px-10">
        <h3 className="text-3xl font-bold text-zinc-800 text-center">
          Your Cart
        </h3>
      </div>

      {/* cart items */}
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto no-scrollbar">
        {cart.length === 0 ? (
          <p className="text-red-800 font-bold text-center">
            Your Cart is empty
          </p>
        ) : (
          cart.map((product, index) => {
            return (
              <div
                className={`flex items-center gap-3 px-5 py-1 border-y-1 border-zinc-300
              ${index % 2 === 0 ? "bg-amber-200" : "bg-white"}`}
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

                    {/* delete icon */}
                    <button
                      className="w-7 h-7 bg-red-600 rounded-full text-white flex justify-center items-center mr-[25px] cursor-pointer active:bg-red-500"
                      onClick={() => removeItem(product)}
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="flex justify-between">
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

                    {/* plus minus button */}
                    <div className="flex gap-2">
                      <button
                        className="w-7 h-7 bg-amber-500 rounded-full text-white flex justify-center items-center text-[14px] cursor-pointer active:bg-amber-500"
                        onClick={() => quantityDecrement(product)}
                      >
                        <FaMinus />
                      </button>

                      <span>{product.quantity}</span>
                      <button
                        className="w-7 h-7 bg-amber-500 rounded-full text-white flex justify-center items-center text-[14px] cursor-pointer active:bg-amber-500"
                        onClick={() => quantityIncrement(product)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* cart total */}
      <div className="px-5 border-y border-zinc-800 ">
        <div className="flex justify-between pt-2 ">
          <span className="text-zinc-800">Subtotal</span>
          <span className="text-zinc-800">${subTotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-zinc-800">Shipping & Handlings</span>
          <span className="text-zinc-800">${shippingFee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between py-1 border-t border-zinc-800">
          <span className="font-bold text-lg text-amber-600">Order Total</span>
          <span className="font-bold text-lg text-amber-600">
            ${orderTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* buttons */}
      <div className="flex gap-x-2 px-10 ">
        <button
          className="bg-amber-600 text-white bottom-4 flex-1 h-[7vh] cursor-pointer active:bg-amber-500"
          onClick={handleClose}
        >
          Close
        </button>

        <button
          className={`text-white flex-1 h-[7vh] ${
            cart.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-amber-600"
          }`}
          disabled={cart.length === 0}
          onClick={() => setOrderSummary(true)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
