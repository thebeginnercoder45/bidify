import { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // For countdown

dayjs.extend(relativeTime);

const auctionItems = [
  {
    id: 1,
    name: "Vintage Watch",
    img: "https://images.squarespace-cdn.com/content/v1/5d6c01b8387da8000156ac34/511548ac-ff52-4783-8285-44450269b8a4/3_730ac04c-2179-4f88-a312-f081ab4f7514_1024x1024%402x.png",
    description:
      "A classic Swiss-made watch from the 1950s, featuring a leather strap and gold casing. Perfect for collectors who appreciate fine vintage timepieces.",
    date: "2024-10-10",
    endTime: "2024-10-15T14:00:00",
    initialPrice: 5000,
  },
  {
    id: 2,
    name: "Antique Painting",
    img: "https://cdn.magicdecor.in/com/2023/10/28172651/Stylized-Tree-Modern-Artwork-Oil-Painting-Wallpaper-for-Wall.jpg",
    description:
      "A stunning 19th-century landscape painting with vivid detail, framed in solid oak. Ideal for art lovers and collectors of fine antiques.",
    date: "2024-10-15",
    endTime: "2024-10-18T17:00:00",
    initialPrice: 15000,
  },
  {
    id: 3,
    name: "Rare Coin",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS32B7LS-YHWamaI563UurlB5xgMr2G8lQO4Q&s",
    description:
      "An ancient Roman coin from 200 BC, remarkably preserved. A highly sought-after piece for numismatists and history enthusiasts.",
    date: "2024-10-20",
    endTime: "2024-10-25T20:00:00",
    initialPrice: 2000,
  },
  {
    id: 4,
    name: "Old Camera",
    img: "https://pehchaanstreetschool.org/wp-content/uploads/2020/06/product-g.jpg",
    description:
      "An early 20th-century Kodak camera in good condition with brass fittings and a folding bellows design. A must-have for vintage camera collectors.",
    date: "2024-10-25",
    endTime: "2024-10-30T12:00:00",
    initialPrice: 8000,
  },
  {
    id: 5,
    name: "Classic Car Model",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMCLTauLaQwlBGuMBb_P3czG5lhmwrpxe6vQ&s",
    description:
      "A die-cast model of a 1960s sports car with intricate detailing and chrome accents. Perfect for car enthusiasts and collectors.",
    date: "2024-11-01",
    endTime: "2024-11-05T18:00:00",
    initialPrice: 12000,
  },
  {
    id: 6,
    name: "Historic Manuscript",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvPP9iKZw6S9RoEYA00z5_E_lcVRM8hu1njw&s",
    description:
      "An 18th-century manuscript with handwritten notes from a famous philosopher. A rare find for collectors of historical documents.",
    date: "2024-11-05",
    endTime: "2024-11-10T10:00:00",
    initialPrice: 25000,
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [remainingTime, setRemainingTime] = useState("");

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % auctionItems.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? auctionItems.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const endTime = dayjs(auctionItems[currentIndex].endTime);
      const diff = endTime.diff(dayjs());
      if (diff > 0) {
        setRemainingTime(endTime.fromNow());
      } else {
        setRemainingTime("Auction ended");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  return (
    <div className=" h-[78vh] flex flex-col mt-5">
      <div className="w-4/5 h-[100%] bg-gray-100 rounded-2xl mx-auto p-3 relative overflow-hidden">
        <div className="flex justify-between">
          <h1 className="bg-blue-200 rounded-2xl flex items-center text-gray-700 text-sm px-2  font-semibold">
            Upcoming Auctions
          </h1>
          <div className=" flex items-center gap-x-3">
            <button
              className="p-1 bg-gray-200 rounded-full shadow"
              onClick={handlePrev}
            >
              <IoIosArrowBack className="text-black text-2xl" />
            </button>
            <button
              className="p-1 bg-gray-200 rounded-full shadow"
              onClick={handleNext}
            >
              <IoIosArrowForward className="text-black text-2xl" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center h-full justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={auctionItems[currentIndex].id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute"
            >
              <div className="flex justify-between p-7">
                <div>
                  <h2 className="text-3xl font-semibold">
                    {auctionItems[currentIndex].name}
                  </h2>
                  <p className="mt-2 text-gray-600 pr-20">
                    {auctionItems[currentIndex].description}
                  </p>
                </div>
                <img
                  src={auctionItems[currentIndex].img}
                  alt={auctionItems[currentIndex].name}
                  className="rounded-2xl w-96 h-64 object-cover mx-auto shadow-lg border border-gray-300"
                />
              </div>

              <div className="text-center  p-7">
                <div className=" flex justify-between">
                  <div className="flex gap-x-4">
                    <p className="mt-2 text-gray-500">
                      Auction Date:{" "}
                      <span className="block text-black">
                        {auctionItems[currentIndex].date}
                      </span>
                    </p>
                    <p className="mt-2 text-gray-500">
                      End Time:{" "}
                      <span className="block text-black">{remainingTime}</span>
                    </p>
                    <p className="mt-2 text-gray-500">
                      Starting Price:{" "}
                      <span className="block text-black">
                        ₹{auctionItems[currentIndex].initialPrice}
                      </span>
                    </p>
                  </div>
                  <button className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600">
                    Place Bid
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Hero;
