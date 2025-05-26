'use client';

import React, { useState , useEffect} from 'react';
import { useLocale } from '../Context/LocaleContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import '../../styles/tabmenu.css';

export default function TabMenu() {
  const { messages } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // hamburger menu
  const [serviceOpen, setServiceOpen] = useState(false); // dropdown serviceproduct

  // ฟังก์ชันเช็ค active
  const isActive = (path) => path === '/' ? pathname === '/' : pathname.startsWith(path);

  // ฟังก์ชันเปิด/ปิด dropdown ด้วยการคลิก
  const toggleService = (e) => {
    e.preventDefault(); // ป้องกันการไปหน้าใหม่ตอนคลิกลิงก์หลัก
    setServiceOpen(!serviceOpen);
  };
   // เพิ่ม useEffect เพื่อตรวจจับการเปลี่ยนเส้นทาง
   useEffect(() => {
    setOpen(false);       // ปิด hamburger menu เมื่อเปลี่ยนหน้า
    setServiceOpen(false); // ปิด dropdown serviceproduct เมื่อเปลี่ยนหน้า
  }, [pathname]);


  return (
    <>
      <button className="hamburger" onClick={() => setOpen(!open)}>☰</button>

      <nav id="navmenu" className={`navmenu ${open ? 'active' : ''}`}>
        <ul className="nav-root">
          <li><Link href="/" className={isActive('/') ? 'active' : ''}>{messages.home}</Link></li>

          <li className="dropdown">
            {/* เปลี่ยนจาก Link ธรรมดาเป็นปุ่ม หรือ anchor ที่คลิกได้ */}
            <a
              href="/Serviceproduct"
              onClick={toggleService}
              className={isActive('/Serviceproduct') ? 'active' : ''}
              role="button"
              aria-expanded={serviceOpen}
              aria-haspopup="true"
            >
              {messages.serviceproduct}
            </a>

            {serviceOpen && (
              <ul className="dropdown-menu">
                <li><Link href="/Serviceproduct/product1">ผลิตภัณฑ์ 1</Link></li>
                <li><Link href="/Serviceproduct/product2">ผลิตภัณฑ์ 2</Link></li>
                <li><Link href="/Serviceproduct/product3">ผลิตภัณฑ์ 3</Link></li>
              </ul>
            )}
          </li>

          <li><Link href="/Search" className={isActive('/Search') ? 'active' : ''}>{messages.search}</Link></li>
          <li><Link href="/Editorial" className={isActive('/Editorial') ? 'active' : ''}>{messages.editorial}</Link></li>
          <li><Link href="/Faq" className={isActive('/Faq') ? 'active' : ''}>{messages.faq}</Link></li>
          <li><Link href="/Success" className={isActive('/Success') ? 'active' : ''}>{messages.success}</Link></li>
        </ul>
      </nav>
    </>
  );
}
