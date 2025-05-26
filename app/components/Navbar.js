'use client';

import React from 'react';
import { useLocale } from '../Context/LocaleContext';
import Link from 'next/link';
import '../../styles/navbar.css';

export default function Navbar() {
  const { messages, switchLocale, locale } = useLocale();

  return (
    <nav className="navbar">
      {/* กลุ่มโลโก้และชื่อบริษัท */}
      <div className="logoTitleGroup">
        <img
          src="/images/logosak-solar.png"
          alt="Saksiam Solar Logo"
        />
        <div className="companyName">
          <h1>บริษัท ศักดิ์สยาม โซลาร์ เอ็นเนอร์ยี่ จำกัด</h1>
          <h3>SAKSIAM SOLAR ENERGY CO., LTD.</h3>
        </div>
      </div>

      {/* กลุ่มภาษา + ปุ่มติดต่อเรา */}
      <div className="localeContactGroup">
        <div className="localeButtons">
          <span
            className={`localeItem ${locale === 'th' ? 'disabled' : ''}`}
            onClick={() => locale !== 'th' && switchLocale('th')}
          >
            TH
          </span>
          <span className="separator"></span>
          <span
            className={`localeItem ${locale === 'en' ? 'disabled' : ''}`}
            onClick={() => locale !== 'en' && switchLocale('en')}
          >
            ENG
          </span>
        </div>
{/* ปุ่มติดต่อเรา */}
      <Link href="/Contact/">
        <button className="contactButton">{messages.contact}</button>
      </Link>
      
    </div>
   
    </nav >
    
  );
}
