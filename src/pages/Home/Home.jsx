import React from "react";
import Banner from "./Banner/Banner";
import HowitsWork from "./HowitsWork/HowitsWork";
import Ourservices from "./Ourservices/Ourservices";
import Brands from "./Brands/Brands";
import Reviews from "./Reviews/Reviews";
import Features from "./Features/Features";
import MarAndCustomer from "./MarAndCustomer/MarAndCustomer";
import Loading from "../Loading/Loading";
const reviewsPromise = fetch("/reviews.json").then((res) => res.json());
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowitsWork></HowitsWork>
      <Ourservices></Ourservices>
      <Brands></Brands>
      <Features></Features>
      <MarAndCustomer></MarAndCustomer>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
      {/* <Loading></Loading> */}
    </div>
  );
};

export default Home;
