import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBath, FaBed, FaChair, FaParking } from "react-icons/fa";

const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="cover image"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300 rounded-lg"
        />
        <div className=" p-2">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-red-700 hover:text-green-700" />
            <p className="hover:text-green-700">{listing.address}</p>
          </div>
          <h3 className="font-bold">Description:</h3>
          <p className=" text-sm line-clamp-3">{listing.description}</p>

          {listing.offer
            ? listing.discountPrice?.toLocaleString("en-US")
            : listing.regularPrice?.toLocaleString("en-US")}
          {listing.type === "rent" && "/ week"}

          <div>
            <div>
              <ul className="text-slate-700 font-semibold text-sm flex gap-4 flex-wrap">
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
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
