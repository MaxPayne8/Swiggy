import React from "react";

const ResCard = ({ data }) => {
  const {
    name,
    cuisines,
    avgRating,
    costForTwo,
    cloudinaryImageId,
    sla,
    aggregatedDiscountInfoV3,
  } = data.info;
  return (
    <div className="bg-slate-500 m-3 p-2 w-60 rounded-lg hover:cursor-pointer h-[350px] border-black border-4 hover:bg-orange-500 shadow-2xl">
      <h1 className="mb-2 font-semibold text-center">{name}</h1>
      <img
        className="w-52 h-36  rounded-xl border-2 border-black "
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
          cloudinaryImageId
        }
        alt="rest-img"
      />
      <h1 className=" truncate">Cuisines:{cuisines.join(",")}</h1>
      <h1>{avgRating}⭐</h1>
      <h1>{costForTwo}</h1>
      <h1>{sla.deliveryTime} mins</h1>
      <label>
        {aggregatedDiscountInfoV3?.header
          ? aggregatedDiscountInfoV3?.header
          : ""}
      </label>
    </div>
  );
};

export default ResCard;
