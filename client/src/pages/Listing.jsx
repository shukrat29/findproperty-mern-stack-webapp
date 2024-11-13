import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import ContactLandlord from "./ContactLandlord";
// import "swiper/css";
// import "swiper/css/navigation";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();

  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser.name);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7">Loading...</p>}
      {error && <p>Something went wrong</p>}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <img
                  src={url}
                  alt="cover image"
                  className="w-full h-[550px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[20%] bg-slate-200 p-1 rounded-lg z-10 right-[4%]">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-2 my-6 gap-4">
            <p className="text-lg font-semibold">
              {listing.name} - ${" "}
              {listing.offer
                ? listing?.discountedPrice?.toLocaleString("en-US")
                : listing?.regularPrice?.toLocaleString("en-US")}
              {listing.type === "rent" && "/month"}
            </p>
            <p className="flex items-center mt-4 gap-2 text-slate-700 my-2 text-sm">
              <FaMapMarkerAlt />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[160px] text-white text-center p-1 rounded-lg">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing?.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountedPrice} OFF
                </p>
              )}
            </div>

            <div className="">
              <h3 className="font-semibold">Description:</h3>
              {listing.description}
            </div>
            <ul className="text-green-900 font-semibold text-sm flex gap-4 flex-wrap">
              <li className="flex items-center gap-2">
                <FaBed className="text-lg" />
                <p>
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds`
                    : `${listing.bedrooms} bed`}
                </p>
              </li>
              <li className="flex items-center gap-2">
                <FaBath className="text-lg" />
                <p>
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths`
                    : `${listing.bathrooms} bath`}
                </p>
              </li>
              <li className="flex items-center gap-2">
                <FaParking className="text-lg" />
                <p>{listing.parking ? "Parking" : "No Parking"}</p>
              </li>
              <li className="flex items-center gap-2">
                <FaChair className="text-lg" />
                <p>{listing.furnished ? "Furnished" : "Unfurnished"}</p>
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-slate-700 text-white p-2 rounded-lg uppercase"
              >
                Contact Landlord
              </button>
            )}
            {contact && <ContactLandlord listing={listing} />}
          </div>
        </>
      )}
    </main>
  );
};

export default Listing;
