'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../Context/LocaleContext';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoMenu } from 'react-icons/io5';
import { products } from '../data/products';
import '../../styles/tabmenu.css';

export default function TabMenu() {
  const { messages } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [activeProductSlug, setActiveProductSlug] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef(null);

  const isActive = (path) => (path === '/' ? pathname === '/' : pathname.startsWith(path));
  const isInProductsSection =
    pathname.startsWith('/Serviceproduct') || pathname.startsWith('/products/');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 991px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServiceOpen(false);
    setActiveProductSlug(null);
    clearTimeout(timeoutRef.current);
  }, [pathname]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setServiceOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServiceOpen(false);
      setActiveProductSlug(null);
    }, 200);
  };

  const toggleBrandSubmenu = (slug) => {
    if (isMobile) {
      setActiveProductSlug((prev) => (prev === slug ? null : slug));
    }
  };

  return (
    <nav className="navbar">
      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <IoMenu />
      </button>

      <nav id="navmenu" className={`navmenu ${open ? 'active' : ''}`} role="navigation">
        <ul className="nav-root">
          <li>
            <Link href="/" className={isActive('/') ? 'active' : ''}>
              {messages.home}
            </Link>
          </li>

          <li
            className={`dropdown ${isInProductsSection ? 'active' : ''}`}
            onMouseEnter={() => !isMobile && handleMouseEnter()}
            onMouseLeave={() => !isMobile && handleMouseLeave()}
          >
            <a
              href="/Serviceproduct"
              onClick={(e) => {
                if (isMobile) {
                  e.preventDefault();
                  setServiceOpen(!serviceOpen);
                } else {
                  e.preventDefault();
                  setServiceOpen(true);
                }
              }}
              className={isInProductsSection ? 'active' : ''}
              role="button"
              aria-expanded={serviceOpen}
              aria-haspopup="true"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {messages.serviceproduct}
              {serviceOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </a>

            {serviceOpen && (
              <ul className="dropdown-menu level-1">
                {products.map((product) => {
                  const isCurrent = pathname.startsWith(`/products/${product.slug}`);
                  const isOpen = activeProductSlug === product.slug;
                  return (
                    <li
                      key={product.slug}
                      className={`dropdown-item ${isCurrent ? 'active' : ''}`}
                      onMouseEnter={() => !isMobile && setActiveProductSlug(product.slug)}
                      onMouseLeave={() => !isMobile && setActiveProductSlug(null)}
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        className={`dropdown-toggle ${isOpen ? 'hovered' : ''}`}
                        style={{
                          padding: '15px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          gap: '10px'  // ✅ เพิ่มช่องว่าง 10px ระหว่างข้อความกับไอคอน
                        }}
                        onClick={(e) => {
                          if (isMobile) {
                            e.preventDefault();
                            toggleBrandSubmenu(product.slug);
                          }
                        }}
                      >
                        {product.name}
                        {isMobile && (
                          <>
                            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                          </>
                        )}
                      </Link>

                      {isOpen && (
                        <ul className="brand-submenu">
                          {product.brands.map((brand) => (
                            <li key={brand.slug}>
                              <Link
                                href={`/products/${product.slug}/${brand.slug}`}
                                className={
                                  pathname === `/products/${product.slug}/${brand.slug}` ? 'active' : ''
                                }
                              >
                                {brand.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </li>

          {/* <li>
            <Link href="/Search" className={isActive('/Search') ? 'active' : ''}>
              {messages.search}
            </Link>
          </li> */}

          <li>
            <Link href="/Faq" className={isActive('/Faq') ? 'active' : ''}>
              {messages.faq}
            </Link>
          </li>

          <li>
            <Link href="/Success" className={isActive('/Success') ? 'active' : ''}>
              {messages.success}
            </Link>
          </li>
          <li>
            <Link href="/Editorial" className={isActive('/Editorial') ? 'active' : ''}>
              {messages.editorial}
            </Link>
          </li>
              
        </ul>
      </nav>
    </nav>
  );
}
