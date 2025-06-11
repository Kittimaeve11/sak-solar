"use client";

import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const banners = [
  { src: "/images/Bannerhome-1.jpg", href: "https://example.com/link1" },
  { src: "/images/Bannerhome-2.jpg", href: "https://example.com/link2" },
  { src: "/images/Bannerhome-3.jpg", href: "https://example.com/link3" },
  { src: "/images/Bannerhome-4.jpg", href: "https://example.com/link4" },
  { src: "/images/Bannerhome-5.jpg", href: "https://example.com/link5" },
  { src: "/images/Bannerhome-6.jpg", href: "https://example.com/link6" },
];

function PrevArrow({ style, onClick }) {
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: 50,
        transform: "translate(0, -50%)",
        zIndex: 10,
        borderRadius: "50%",
        width: 36,
        height: 36,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <FaChevronLeft color="rgba(255, 255, 255, 0.6)" size={20} />
    </div>
  );
}

function NextArrow({ style, onClick }) {
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        right: 50,
        transform: "translate(0, -50%)",
        zIndex: 10,
        borderRadius: "50%",
        width: 36,
        height: 36,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <FaChevronRight color="rgba(255, 255, 255, 0.6)" size={20} />
    </div>
  );
}

export default function BannerSlider() {
  const sliderRef = useRef(null);
  const [initialSlide, setInitialSlide] = useState(null); // null = ยังไม่โหลด
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bannerSlideIndex");
    const index = saved !== null ? parseInt(saved) : 0;
    setInitialSlide(index);
    setIsReady(true); // พร้อมแสดง
  }, []);

  if (!isReady) return null; // ✅ ยังไม่โหลดค่าจาก localStorage อย่า render อะไรเลย

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    rtl: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    initialSlide: initialSlide, // ✅ เริ่มจากตำแหน่งที่โหลดแล้ว
    afterChange: (current) => {
      localStorage.setItem("bannerSlideIndex", current);
    },
  };

  const handleClick = (e, href) => {
    const width = e.currentTarget.offsetWidth;
    const x = e.nativeEvent.offsetX;
    const percent = x / width;

    if (percent >= 0.1 && percent <= 0.9) {
      window.open(href, "_blank");
    } else if (percent < 0.2) {
      sliderRef.current?.slickPrev();
    } else {
      sliderRef.current?.slickNext();
    }
  };

  return (
    <div className="w-full overflow-hidden" style={{ lineHeight: 0, fontSize: 0 }}>
      <Slider ref={sliderRef} {...settings}>
        {banners.map(({ src, href }, index) => (
          <div key={index}>
            <div
              onClick={(e) => handleClick(e, href)}
              style={{ cursor: "pointer", width: "100%" }}
            >
              <Image
                src={src}
                alt={`Banner ${index + 1}`}
                width={3840}
                height={1191}
                style={{ width: "100%", height: "auto" }}
                priority={index === initialSlide}
                loading={index === initialSlide ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
      </Slider>

      <style jsx>{`
        :global(.slick-dots) {
          bottom: 15px;
          opacity: 0;
          animation: fadeInDots 0.1s forwards;
        }
        :global(.slick-dots li button) {
          width: 9px;
          height: 9px;
          padding: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: 2px solid transparent;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        :global(.slick-dots li.slick-active button) {
          background: rgba(255, 255, 255, 0.89);
          border-color: #dddddd;
        }
        :global(.slick-dots li button:hover) {
          background: rgba(255, 255, 255, 0.89);
          border-color: rgba(187, 187, 187, 0.46);
        }
        :global(.slick-dots li button:before) {
          display: none;
        }
        @keyframes fadeInDots {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
