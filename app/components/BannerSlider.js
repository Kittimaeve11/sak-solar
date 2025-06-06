"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const banners = [
  { src: "/images/test.jpg", href: "https://example.com/link1" },
  { src: "/images/Bannerhome-1.jpg", href: "https://example.com/link1" },
  { src: "/images/Bannerhome-2.jpg", href: "https://example.com/link2" },
  { src: "/images/Bannerhome-3.jpg", href: "https://example.com/link3" },
  { src: "/images/Bannerhome-4.jpg", href: "https://example.com/link4" },
  { src: "/images/Bannerhome-5.jpg", href: "https://example.com/link5" },
  { src: "/images/Bannerhome-6.jpg", href: "https://example.com/link6" },];

// ลูกศรซ้าย
function PrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: 10,
        transform: "translate(0, -50%)",
        zIndex: 10,
        // background: "rgba(0,0,0,0.4)",
        borderRadius: "50%",
        width: 36,
        height: 36,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <FaChevronLeft color="white" size={20} />
    </div>
  );
}

// ลูกศรขวา
function NextArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        right: 10,
        transform: "translate(0, -50%)",
        zIndex: 10,
        // background: "rgba(0,0,0,0.4)",
        borderRadius: "50%",
        width: 36,
        height: 36,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <FaChevronRight color="white" size={20} />
    </div>
  );
}


const settings = {
  dots: true, //เปิดดอท
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,  // เปิดลูกศร
  rtl: false,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
};


export default function BannerSlider() {
  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {banners.map(({ src, href }, index) => (
          <div key={index} className="w-full">
            <a href={href} target="_blank" rel="noopener noreferrer">
              <Image
                src={src}
                alt={`Banner ${index + 1}`}
                width={1600}
                height={450}
                style={{ width: "100%", height: "auto" }}
                priority={index === 0}
              />
            </a>
          </div>
        ))}
      </Slider>
      <style jsx>{`
  :global(.slick-dots) {
    bottom: 15px;
  }
  :global(.slick-dots li) {
    margin: 0 6px;
  }
  :global(.slick-dots li button) {
    width: 9px;
    height: 9px;
    padding: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5); /* ขาวโปร่งแสง */
    border: 2px solid transparent;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
  :global(.slick-dots li.slick-active button) {
    background: #ffffff; /* ขาวเต็ม */
    border-color: #dddddd; /* ขอบเทาอ่อน */
  }
  :global(.slick-dots li button:hover) {
    background: #ffffff; /* เวลาชี้ */
    border-color: #bbbbbb; /* ขอบเวลาชี้ */
  }
  :global(.slick-dots li button:before) {
    display: none; /* ซ่อนจุด default */
  }
`}</style>
    </div>
  );
}
