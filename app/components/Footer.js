"use client";
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Footer.module.css';

const menuItems = [
  {
    title: "บริการสินเชื่อ",
    items: [
      { label: "สินเชื่อทะเบียนรถยนต์มีประกัน", href: "/loan/car-insurance" },
      { label: "สินเชื่อรถจักรยานยนต์ใหม่", href: "/loan/motorcycle" },
      { label: "สินเชื่อรถแลกเงิน (สินเชื่อเช่าซื้อ)", href: "/loan/cashback" },
      { label: "สินเชื่อทะเบียนรถ (เพื่อลงทุน)", href: "/loan/invest" },
      { label: "สินเชื่อรายย่อยเพื่อการประกอบอาชีพ", href: "/loan/small-business" },
      { label: "สินเชื่อส่วนบุคคล", href: "/loan/personal" },
      { label: "สินเชื่อที่มีหลักประกัน", href: "/loan/secured" },
      { label: "สินเชื่อไถ่ถอนรถ", href: "/loan/redeem" },
      { label: "สินเชื่อโซล่ารูฟ", href: "/loan/solar" },
      { label: "อัตราดอกเบี้ยและค่าธรรมเนียม", href: "/loan/rates" },
    ]
  },
  {
    title: "เกี่ยวกับบริษัท",
    items: [
      { label: "ประวัติบริษัท", href: "/about/history" },
      { label: "วิสัยทัศน์และพันธกิจ", href: "/about/vision" },
      { label: "สาขาให้บริการ", href: "/about/branches" },
      { label: "ข่าวและกิจกรรม", href: "/about/news" },
      { label: "คำถามที่พบบ่อย", href: "/about/faq" },
      { label: "ร่วมงานกับเรา", href: "/careers" },
      { label: "นักลงทุนสัมพันธ์", href: "/investor" },
      { label: "คณะกรรมการบริษัท", href: "/about/board" },
      { label: "คณะกรรมการตรวจสอบ", href: "/about/audit" },
      { label: "คณะกรรมการบริหารความเสี่ยง", href: "/about/risk" },
      { label: "Board Skills Matrix", href: "/about/skills-matrix" },
    ]
  },
  {
    title: "นโยบาย",
    items: [
      { label: "ประกาศความเป็นส่วนตัว", href: "/policy/privacy" },
      { label: "นโยบายการคุ้มครองข้อมูล", href: "/policy/data" },
      { label: "นโยบายการใช้งานคุกกี้", href: "/policy/cookie" },
      { label: "นโยบายการใช้งานกล้องวงจรปิด", href: "/policy/cctv" },
      { label: "นโยบายการรับเรื่องร้องเรียน", href: "/policy/complaint" },
    ]
  }
];

export default function Footer() {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setSocials(data.socials || []))
      .catch(() => setSocials([]));
  }, []);

  const iconPath = useMemo(() => ({
    facebook: "/images/facebook.png",
    youtube: "/images/youtube.png",
    line: "/images/line.png",
  }), []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {menuItems.map(({ title, items }) => (
          <div key={title} className={styles.column}>
            <h4>{title}</h4>
            <ul>
              {items.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className={`${styles.column} ${styles.contactColumn}`}>
          <h4>ติดต่อเรา</h4>
          <p>บริษัท ศักดิ์สยามลิสซิ่ง จำกัด (มหาชน)</p>
          <p>49/47 ถ.เจษฎาบดินทร์ ต.ท่าอุเทน อ.เมือง จ.อุดรดิตถ์ 53000</p>
          <p>โทรศัพท์ : 1487</p>
          <p>แฟกซ์ : 055 440 371</p>
          <p>อีเมล : saksisiam@saksisiam.co.th</p>
          <div className={styles.socialIcons}>
            {socials.map(({ id, url, icon }) => (
              <Link
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={id}
                className={styles.iconWrapper}
              >
                <Image
                  src={iconPath[icon] || "/images/default-icon.png"}
                  alt={id}
                  width={36}
                  height={36}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        © 2019 Copyright: Saksiam Leasing Public Company Limited. All Rights Reserved.
      </div>
    </footer>
  );
}
