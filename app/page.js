'use client';

import { useLocale } from './Context/LocaleContext';
import './globals.css';
import styles from './Home.module.css';
import Image from 'next/image';
import BannerSlider from './components/BannerSlider';
import { useEffect, useState } from 'react';

const calculateSolarSize = (electricityCost, dayUsage) => {
  const usageUnits = electricityCost / 5;
  const averageDailyUnits = usageUnits / 30;
  const dayUnits = averageDailyUnits * (dayUsage / 100);
  const nightUnits = averageDailyUnits - dayUnits;
  const sizeTable = [
    { size: "1.8 kW", max: 270 },
    { size: "3.1 kW", max: 465 },
    { size: "5 kW", max: 750 },
    { size: "10 kW", max: 1500 },
    { size: "15 kW", max: 2250 },
    { size: "20 kW", max: 3000 },
    { size: "25 kW", max: 3750 },
    { size: "30 kW", max: 4500 },
    { size: "35 kW", max: 5250 },
    { size: "40 kW", max: 6000 },
  ];

  const recommended = sizeTable.find((item) => usageUnits <= item.max);
  return {
    usageUnits,
    averageDailyUnits,
    dayUnits,
    nightUnits,
    recommended: recommended?.size || "เกิน 40 kW"
  };
};

export default function HomePage() {
  const [contacts, setContacts] = useState([]);
  const { locale } = useLocale();
  // บริการฟรี
  useEffect(() => {
    fetch('/api/home-page')
      .then((res) => res.json())
      .then((data) => setContacts(data.contacts));
  }, []);

  let topContacts = [];
  let bottomContacts = [];
  const count = contacts.length;

  if (count < 6) {
    topContacts = contacts;
    bottomContacts = [];
  } else if (count === 6) {
    topContacts = contacts.slice(0, 3);
    bottomContacts = contacts.slice(3);
  } else {
    const topCount = Math.floor(count / 2);
    const bottomCount = count - topCount;
    topContacts = contacts.slice(0, topCount);
    bottomContacts = contacts.slice(topCount);
  }
  // คำนวนโวลาร์
  const [electricityCost, setElectricityCost] = useState("");
  const [dayUsage, setDayUsage] = useState(40);
  const [systemType, setSystemType] = useState("");
  const [roofArea, setRoofArea] = useState("");
  const [results, setResults] = useState(null);

  const handleClear = () => {
    setElectricityCost("");
    setDayUsage(60);
    setSystemType("");
    setRoofArea("");
    setResults(null);
  };

  const handleSubmit = () => {
    const numericCost = parseFloat(electricityCost);
    const numericRoof = parseFloat(roofArea);

    if (isNaN(numericCost)) return alert("กรุณากรอกค่าไฟฟ้าให้ถูกต้อง");
    if (!systemType) return alert("กรุณาเลือกระบบไฟฟ้า");
    if (isNaN(numericRoof)) return alert("กรุณากรอกพื้นที่หลังคาให้ถูกต้อง");

    if (systemType === "single" && (numericRoof < 9 || numericRoof > 45)) {
      return alert("ระบบไฟ 1 เฟส ต้องมีพื้นที่ระหว่าง 9-45 ตร.ม");
    }
    if (systemType === "three" && (numericRoof < 45 || numericRoof > 179)) {
      return alert("ระบบไฟ 3 เฟส ต้องมีพื้นที่ระหว่าง 45-179 ตร.ม");
    }

    const result = calculateSolarSize(numericCost, dayUsage);
    setResults(result);


  };
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
      {count < 6 ? (
        <div className={styles.gridWrapper}>
          <div className={`${styles.gridContainer} ${styles.grid5}`}>
            {topContacts.map((item) => (
              <div key={item.id} className={styles.card}>
                <img src={item.image} alt={item.SubjectENG} className={styles.icon} />
                <p className={styles.label}>
                  {locale === 'th' ? item.SubjectTH : item.SubjectENG}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.gridWrapper}>
            <div className={styles.gridContainer}>
              {topContacts.map((item) => (
                <div key={item.id} className={styles.card}>
                  <img src={item.image} alt={item.SubjectENG} className={styles.icon} />
                  <p className={styles.textfree}>
                    {locale === 'th' ? item.SubjectTH : item.SubjectENG}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.gridWrapper}>
            <div className={styles.gridContainer}>
              {bottomContacts.map((item) => (
                <div key={item.id} className={styles.card}>
                  <img src={item.image} alt={item.SubjectENG} className={styles.icon} />
                  <p className={styles.textfree}>
                    {locale === 'th' ? item.SubjectTH : item.SubjectENG}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


      <div className="layout-container">
        {/* คำนวณไฟฟ้า */}
        <div className={styles.containersolar}>
          <h2 className={styles.headersolar}>ระบบคำนวณขนาด Solar Rooftop ที่เหมาะสม</h2>
          <h6 className={styles.instructions}>วิธีใช้งาน : กรอก ข้อมูลที่ต้องการคำนวณ </h6>
          <h6 className={styles.instructions1}> 1 : กดคำนวณ<br />2 : กดคำนวณแพ็คเกจ เพื่อเปรียบเทียบแพ็คเกจที่เหมาะสม</h6>
          <h6 className={styles.instructions2}>คำแนะนำ : เพื่อให้ข้อมูล ที่คำนวนแม่นยำที่สุด กดเครียร์ข้อมูลทุกครั้งที่ต้องการคำนวณครั้งต่อไป</h6>

          <label style={{ color: '#243865', display: 'block', marginBottom: '0.5rem', marginTop: '1rem' }}>            ค่าไฟฟ้าต่อเดือน (บาท):
          </label>
          <input
            type="number"
            className={styles.formControl}
            value={electricityCost}
            onChange={e => setElectricityCost(e.target.value)}
            placeholder="กรุณากรอกค่าไฟต่อเดือน"
          />
          <label style={{ color: '#243865', display: 'block', marginBottom: '0.5rem', marginTop: '1rem' }}>
            เปอร์เซ็นต์การใช้ไฟฟ้าในช่วงกลางวันและกลางคืน</label>
          <input
            type="range"
            min="0"
            max="100"
            value={dayUsage}
            onChange={e => setDayUsage(Number(e.target.value))}
            className={styles.rangeControl}
            style={{
              background: `linear-gradient(to right, #F2780C ${dayUsage}%, #F2F2F2 ${dayUsage}%)`
            }}
          />
          <div className={styles.usageSplit}>
            <span>ช่วงกลางวัน {dayUsage} %</span>
            <span>ช่วงกลางคืน {100 - dayUsage} %</span>
          </div>

          <label style={{ color: '#243865', display: 'block', marginBottom: '0.5rem', marginTop: '1rem' }}>
            ระบบไฟฟ้า:</label>
          <select value={systemType} onChange={e => setSystemType(e.target.value)} className={styles.formControl}>
            <option value="">กรุณาเลือกระบบไฟฟ้า</option>
            <option value="single">1 เฟส</option>
            <option value="three">3 เฟส</option>
          </select>

          <label style={{ color: '#243865', display: 'block', marginBottom: '0.5rem', marginTop: '1rem' }}>
            พื้นที่หลังคาโดยประมาณ (ตร.ม):</label>
          <input type="number" className={styles.formControl} value={roofArea} onChange={e => setRoofArea(e.target.value)} />

          <div className={styles.buttonGroup}>
            <button onClick={handleSubmit} className={styles.buttonSecondary}>
              คำนวณ
            </button>
            <button onClick={handleClear} className={styles.buttonPrimary}>
              เคลียร์ข้อมูลและรีเฟรชหน้า
            </button>
          </div>
          {results && (
            <div className={`${styles.results} ${styles.fadeInUp}`}>
              <div className={`${styles.card} ${styles.fadeInUp}`}>การใช้ไฟเฉลี่ยต่อเดือน: {results.usageUnits.toFixed(2)} KW</div>
              <div className={`${styles.card} ${styles.fadeInUp}`}>การใช้ไฟเฉลี่ยต่อวัน: {results.averageDailyUnits.toFixed(2)} KW</div>
              <div className={`${styles.card} ${styles.fadeInUp}`}>การใช้ไฟช่วงกลางวัน: {results.dayUnits.toFixed(2)} KW ({dayUsage}%)</div>
              <div className={`${styles.card} ${styles.fadeInUp}`}>การใช้ไฟช่วงกลางคืน: {results.nightUnits.toFixed(2)} KW ({100 - dayUsage}%)</div>
              <div className={`${styles.card} ${styles.fadeInUp}`}>ขนาดระบบที่แนะนำ: {results.recommended}</div>
            </div>
          )}
        </div>
      </div>
      {/* <main className="layout-container">
</main> */}
    </>
  );
}
