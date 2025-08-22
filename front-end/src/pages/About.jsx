import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div className="bg-white">
      {/* ABOUT US Section */}
      <div className="text-3xl text-center pt-12 border-t">
        <Title text1={"ABOUT"} text2={" US"} />
      </div>

      <div className="my-14 flex flex-col md:flex-row items-center gap-14 px-6 md:px-16">
        <img
          className="w-full md:max-w-[420px] rounded-xl shadow-md"
          src={assets.about_img}
          alt="About Amoura Fashion"
        />
        <div className="flex flex-col justify-center gap-5 md:w-2/3 text-gray-700 leading-relaxed">
          <p className="text-lg">
            <span className="font-semibold text-gray-900">Amoura Fashion </span>
            is where everyday comfort meets modern style. We create collections
            that are trendy, versatile, and easy to wear — perfect for work,
            weekends, and everything in between.
          </p>
          <p>
            Our goal is to bring high-quality fashion that feels effortless,
            empowering you to look confident without compromising on comfort.
          </p>
          <div>
            <b className="text-xl text-gray-900">Our Mission</b>
            <p className="mt-2">
              To design affordable, stylish, and sustainable pieces that inspire
              confidence and make everyday dressing simple yet fashionable.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US Section */}
      <div className="text-3xl text-center py-8">
        <Title text1={"WHY"} text2={" CHOOSE US"} />
      </div>

      <div className="grid md:grid-cols-3 gap-8 px-6 md:px-16 mb-20">
        <div className="border rounded-xl px-8 py-10 bg-gray-50 hover:bg-gray-100 transition">
          <b className="text-lg text-gray-900">Trendy Collections</b>
          <p className="text-gray-600 mt-3">
            Inspired by global street style and everyday essentials, our designs
            keep you fashion-forward and versatile.
          </p>
        </div>

        <div className="border rounded-xl px-8 py-10 bg-gray-50 hover:bg-gray-100 transition">
          <b className="text-lg text-gray-900">Quality & Comfort</b>
          <p className="text-gray-600 mt-3">
            We use fabrics that are soft, breathable, and durable, so you can
            feel good while looking great every day.
          </p>
        </div>

        <div className="border rounded-xl px-8 py-10 bg-gray-50 hover:bg-gray-100 transition">
          <b className="text-lg text-gray-900">Accessible Fashion</b>
          <p className="text-gray-600 mt-3">
            Stylish pieces at the right price, making it easy for everyone to
            express their own look without limits.
          </p>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  );
};

export default About;
