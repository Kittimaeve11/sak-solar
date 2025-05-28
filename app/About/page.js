'use client';
import Image from 'next/image';
import '../../styles/about.css';

export default function Page() {
  return (
    <div className="about-wrapper">
      <div className="highlight-section">
        <Image
          src="/images/logosak-solar.png"
          alt="Saksiame Solar Logo"
          width={200}
          height={200}
          className="highlight-logo"
          priority
        />
        <h2>บริษัท ศักดิ์สยาม โซลาร์ เอ็นเนอร์ยี่ จำกัด</h2>
        <h5>ในเครือ บริษัท ศักดิ์สยามลิสซิ่ง จำกัด (มหาชน)</h5>

        <div className="highlight-text">
          <h4>เรามุ่งมั่นให้บริการติดตั้งระบบพลังงานแสงอาทิตย์</h4>
          <h4>ด้วยอุปกรณ์ และทีมช่างที่มีคุณภาพให้กับภาคธุรกิจและภาคประชาชน</h4>
          <h4>ก๊าซคาร์บอนไดออกไซด์ ลดปริมาณก๊าซเรือนกระจก และยังสอดคล้องกับ</h4>
          <h4>นโยบายด้านพลังงานทดแทนสําคัญยังช่วยประหยัดค่าไฟฟ้าของธุรกิจ</h4>
          <h4>และบ้านเรือน ลงทุนเพียงครั้งเดียวช่วยประหยัดเงินได้ถึง 30 ปี </h4>
          <h4>และคืนทุนได้ในระยะเวลาแค่ 3-4 ปี</h4>
        </div>
      </div>
    </div>
  );
}
