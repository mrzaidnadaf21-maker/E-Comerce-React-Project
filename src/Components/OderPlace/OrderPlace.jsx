import React from "react";

const OrderPlace = ({ setOrderPlaced }) => {
  return (
    <section className=" flex justify-center items-center bg-black/95 fixed inset-0 z-40">
      <div className="bg-zinc-100 p-8 text-center w-[400px] rounded-lg border-1 border-zinc-300">
        <h2 className="text-3xl text-green-600 font-bold">Order Placed!</h2>
        <p className="text-zinc-800 my-4">Thanks For Your Purchase!</p>

        <button
          className="bg-amber-600  py-2 px-4 active:bg-amber-500 text-white rounded-lg  cursor-pointer"
          onClick={() => setOrderPlaced(false)}
        >
          Close
        </button>
      </div>
    </section>
  );
};

export default OrderPlace;
