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
    <div className="">
      {/* top */}

      {/* swiper */}
      <Swiper
        className="mb-2"
        navigation
        spaceBetween={10} // Adds space between slides
        slidesPerView={1} // Show 1 image per slide
        loop={true} // Enables infinite looping of slides
        autoplay={{ delay: 3000 }} // Autoplay feature with a 3-second delay
        effect="fade" // Smooth fading effect between slides
        speed={1000} // Transition speed
        pagination={{ clickable: true }} // Allows clicking on pagination bullets
      >
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                  height: "350px",
                  borderRadius: "10px", // Rounded corners for the image
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow effect
                  position: "relative", // Helps for overlay text (if needed)
                }}
              >
                {/* Optionally, you can add text overlays or titles here */}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* listing results for offer, sale and rent max-w-6xl mx-auto */}
      <div>
        <Link to={`/search`} className="bg-red-500 text-white p-2 rounded-md">
          Start Exploring
        </Link>
      </div>
      <div className=" px-20 flex flex-col gap-8">
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
