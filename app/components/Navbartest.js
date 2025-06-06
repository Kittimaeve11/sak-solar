'use client';

import React from 'react';
import { useLocale } from '../Context/LocaleContext';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FaPhone } from 'react-icons/fa';

import Link from 'next/link';
import styles from '../../styles/Navbar.module.css';

export default function Navbar() {
    const { messages, switchLocale, locale } = useLocale();
    const pathname = usePathname();
    const isAboutPage = pathname === '/About';
    const isContactPage = pathname === '/Contact';

    return (
        <div className={styles.navWrapper}>
            <nav className={styles.navbar}>

                <div className={styles.leftSection}>
                    <div className={styles.logoContainer}>
                        <Image
                            src="/images/logo-text-copy.png"
                            alt="Logo"
                            fill
                            className={styles.logoImage}
                        />
                    </div>
                </div>

                <div className={styles.localeContactGroup}>
                    <div className={styles.localeButtons}>
                        <span
                            className={`${styles.localeItem} ${locale === 'th' ? styles.disabled : ''}`}
                            onClick={() => locale !== 'th' && switchLocale('th')}
                        >
                            TH
                        </span>

                        <span className={styles.localeDivider}> | </span>

                        <span
                            className={`${styles.localeItem} ${locale === 'en' ? styles.disabled : ''}`}
                            onClick={() => locale !== 'en' && switchLocale('en')}
                        >
                            ENG
                        </span>
                    </div>
                    {/* ✅ ปุ่มติดต่อเรา + เกี่ยวกับเรา+ โทร */}
                    <div className={styles.contactActions}>
                        <a href="tel:1487" className={styles.callLink} title="โทร 1487">
                            <FaPhone className={styles.phoneIcon} />
                            <span className={styles.phoneNumber}>1487</span>
                        </a>
                        <div className="flex items-center gap-2">
                            <Link
                                href="/About/"
                                className={`${styles.contact} ${isAboutPage ? styles.active : ''}`}
                            >
                                {messages.about}
                            </Link>

                            <span> | </span>

                            <Link
                                href="/Contact/"
                                className={`${styles.contact} ${isContactPage ? styles.active : ''}`}
                            >
                                {messages.contact}
                            </Link>
                        </div>
                    </div>
                </div >
            </nav >
        </div >

    );
}
