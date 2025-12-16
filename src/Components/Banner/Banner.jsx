import React, { useEffect, useState } from "react";
import BannerImage from "../../assets/banner.jpg";
const Banner = () => {
  const initialTime = 5 * 60 * 60; // 5hrs 18000second
  const [timeLeft, setTimeLeft] = useState(() => {
    const storeTime = localStorage.getItem("remainingTime");
    return storeTime && parseInt(storeTime, 10) > 0
      ? parseInt(storeTime, 10)
      : initialTime;
  });

  const formatTime = (time) => {
    useEffect(() => {
      if (timeLeft <= 0) return;
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            localStorage.setItem("remainingTime", 0);
            return 0;
          }
          const remainigTime = prev - 1;
          localStorage.setItem("remainingTime", remainigTime);
          return remainigTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }, [timeLeft]);

    const hours = Math.floor(time / 3600); // one hours = three thousand six hunderd seconds
    const minutes = Math.floor((time % 3600) / 60); // one hours = 60 minutes
    const seconds = time % 60; // one minutes = 60 seconds

    return {
      hours: String(hours).padStart(2, "0"), // 2 jo he o 5 ke left side me value de ga agar mene 2 ke jagha 3 de diya to output me 005 ayya ga or 0 ki jagha koi value de diya ("1") to 5 ke left side me 1 ayya ga (15)
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <section
      className="h-[40vh] sm:h-[40vh] md:h-[60vh] bg-cover bg-center bg-top mt-[15vh]"
      style={{ backgroundImage: `url(${BannerImage})` }}
    >
      {/* Banner */}
      <div className="max-w-[1200px] mx-auto px-7 sm:px-7 md:px-10 h-full flex flex-col justify-center gap-3">
        <h1 className="text-red-600  text-4xl sm:text-4xl md:text-7xl lg:text-9xl uppercase font-bold tracking-tight">
          Big Sale!
        </h1>

        <h2 className=" text-zinc-800 text-lg sm:text-xl md:text-xl lg:text-3xl">
          Up to 50% Off - Limited Time Only
        </h2>

        {/* Timer */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-800 flex gap-x-3 mt-3 sm:mt-5">
          <span className="text-white bg-zinc-800 sm:p-3">{hours}</span>:
          <span className="text-white bg-zinc-800 sm:p-3">{minutes}</span>:
          <span className="text-white bg-zinc-800 sm:p-3">{seconds}</span>
        </div>
      </div>
    </section>
  );
};

export default Banner;
