import React, { useState } from "react";
import Hero from "./Hero";
import AuctionItems from "./AuctionItems/AuctionItems";
import Categories from "./Categories";

const Home = () => {
  const [auctionItems, setAuctionItems] = useState([]);

  return (
    <div>
      <div>
        <Categories auctionItems={auctionItems} setAuctionItems={setAuctionItems} />
      </div>
      <div>
        <Hero />
      </div>
      <div className="w-[96%] mt-3 mx-auto">
        <AuctionItems auctionItems={auctionItems} setAuctionItems={setAuctionItems} />
        {/* <h1>asdfnasd</h1> */}
      </div>
    </div>
  );
};

export default Home;
