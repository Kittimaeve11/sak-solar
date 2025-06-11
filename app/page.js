'use client';

import { useLocale } from './Context/LocaleContext';
import './globals.css';
import styles from './Home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import BannerSlider from './components/BannerSlider';
import { useEffect, useState } from "react";

export default function HomePage() {
  const { messages } = useLocale();
  const [contacts, setContacts] = useState([]);
  const [lang, setLang] = useState("th");
  useEffect(() => {
    fetch("/api/home-page")
      .then((res) => res.json())
      .then((data) => setContacts(data.contacts));
  }, []);
  return (
    <>
      <BannerSlider />
      <h5 className={styles.headline}>
        ติดตั้งโซลาร์เซลล์กับทีมช่างที่ได้มารฐาน <br />
        และได้รับการรับรองจากการไฟฟ้า (PEA)
      </h5>
      {/* <div className={styles["about-wrapper"]}>
          <div className={styles["highlight-section"]}>
            <Image
              src="/images/logosak-solar.png"                 
              alt="Saksiame Solar Logo"
              width={100}
              height={100}
              className="highlight-logo"
              priority
            />
            <h2>บริษัท ศักดิ์สยาม โซลาร์ เอ็นเนอร์ยี่ จำกัด</h2>
            <h5>ในเครือ บริษัท ศักดิ์สยามลิสซิ่ง จำกัด (มหาชน)</h5>

            <div className={styles["highlight-text"]}>
              <h4>เรามุ่งมั่นให้บริการติดตั้งระบบพลังงานแสงอาทิตย์</h4>
              <h4>ด้วยอุปกรณ์ และทีมช่างที่มีคุณภาพให้กับภาคธุรกิจและภาคประชาชน</h4>
              <h4>ก๊าซคาร์บอนไดออกไซด์ ลดปริมาณก๊าซเรือนกระจก และยังสอดคล้องกับ</h4>
              <h4>นโยบายด้านพลังงานทดแทนสําคัญยังช่วยประหยัดค่าไฟฟ้าของธุรกิจ</h4>
              <h4>และบ้านเรือน ลงทุนเพียงครั้งเดียวช่วยประหยัดเงินได้ถึง 30 ปี </h4>
              <h4>และคืนทุนได้ในระยะเวลาแค่ 3-4 ปี</h4>
            </div>
          </div>
        </div>
 */}

      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/HomePagelayer 1.jpg"
            alt="Saksiame Solar About"
            width={1910}
            height={710}
            priority
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          {/* <Link href="/more" className={styles.overlayLink}>
            {'>> ดูเพิ่มเติม'}          </Link> */}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* ปุ่มเปลี่ยนภาษา */}
        <div className="mb-6">
          <button onClick={() => setLang("th")} className="mr-2 px-4 py-2 bg-gray-200 rounded">
            ภาษาไทย
          </button>
          <button onClick={() => setLang("en")} className="px-4 py-2 bg-gray-200 rounded">
            English
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {contacts.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow text-center">
              <img
                src={item.image}
                alt={item.SubjectENG}
                className="w-14 h-14 mx-auto mb-4"
              />
              <p className="text-orange-500 font-semibold">
                {lang === "th" ? item.SubjectTH : item.SubjectENG}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* <main className="layout-container">
</main> */}
    </>
  );
}
