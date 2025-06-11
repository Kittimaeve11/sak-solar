"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Footer.module.css";
import { menuItems } from "../config/footer";

export default function Footer() {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => setSocials(data.socials || []))
      .catch(() => setSocials([]));
  }, []);

  const iconPath = useMemo(
    () => ({
      facebook: "/images/facebook.png",
      instagram: "/images/instagram.png",
      tiktok: "/images/tiktok.png",
      line: "/images/line.png",
      youtube: "/images/youtube.png",
    }),
    []
  );

  // เอาแค่ 2 หมวดแรก (บริการสินเชื่อ, เกี่ยวกับบริษัท)
  const firstTwoMenus = menuItems.slice(0, 2);

  // หาหมวด นโยบาย
  const policyMenu = menuItems.find((item) => item.title === "นโยบาย");

  // หาหมวด ติดต่อเรา
  const contactMenu = menuItems.find((item) => item.title === "ติดต่อเรา");

  return (
    <div>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          {/* แสดง 2 คอลัมน์แรก */}
          {firstTwoMenus.map(({ title, items }) => (
            <div key={title} className={styles.column}>
              <h4>{title}</h4>
              <ul>
                {items.map(({ label, href }, i) => (
                  <li key={href || label + i}>
                    {href ? <Link href={href}>{label}</Link> : <span>{label}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* คอลัมน์ที่ 3 รวม นโยบาย + ติดต่อเรา */}
          <div className={styles.column}>
            {/* นโยบาย */}
            {policyMenu && (
              <>
                <h4>{policyMenu.title}</h4>
                <ul>
                  {policyMenu.items.map(({ label, href }, i) => (
                    <li key={href || label + i}>
                      {href ? <Link href={href}>{label}</Link> : <span>{label}</span>}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* ติดต่อเรา */}
            {contactMenu && (
              <>
                <h4>{contactMenu.title}</h4>
                <ul>
                  {contactMenu.items.map(({ label }, i) => (
                    <li key={label + i}>
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
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
              </>
            )}
          </div>
        </div>
      <div className={styles.footerBottomImage}></div>

      </footer>

      <div className={styles.footerBottomWrapper}>
        <div className={styles.footerBottom}>
          © 2025 Copyright: Saksiam Leasing Public Company Limited. All Rights Reserved.
          <div className={styles.logoGroup}>
            <Image
              src="/images/logo3.8549861c.png"
              alt="โลโก้สีส้ม"
              width={100}
              height={40}
            />
            <Image
              src="/images/Logo-of-the-Provincial-Electricity-Authority-of-Thailand.png"
              alt="โลโก้การไฟฟ้าส่วนภูมิภาค"
              width={100}
              height={40}
            />
            <Image
              src="/images/ERCNewLogo.png"
              alt="โลโก้กกพ"
              width={100}
              height={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
