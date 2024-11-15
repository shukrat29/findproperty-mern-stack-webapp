import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import ListingItem from "../components/ListingItem";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div className="p-2">
      {/* top */}
      <div className="g">
        <h1 className="font-bold text-slate-700 text-3xl">
          Discover Your Dream Home with Just a Click! <br />
          Find It Here!
        </h1>
        <br />
        <Link to={`/search`} className="bg-slate-500 text-white p-2 rounded-md">
          Start Exploring
        </Link>
      </div>
      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* listing results for offer, sale and rent max-w-6xl mx-auto */}
      <div className=" p-8 flex flex-col gap-8 my-10 ">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div>
              <h2 className="text-slate-700 font-semibold text-xl">
                Recent Offers
              </h2>
              <Link to={`/search?offer=true`} className="hover:text-blue-700">
                Show more offers
              </Link>
            </div>
            <div className=" flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div>
              <h2 className="text-slate-700 font-semibold text-xl">For Rent</h2>
              <Link to={`/search?type=rent`} className="hover:text-blue-700">
                More home for rents
              </Link>
            </div>
            <div className=" flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div>
              <h2 className="text-slate-700 font-semibold text-xl">
                More places for sales
              </h2>
              <Link to={`/search?offer=true`} className="hover:text-blue-700">
                Show more offers
              </Link>
            </div>
            <div className=" flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
