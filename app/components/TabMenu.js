'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../Context/LocaleContext';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { products } from '../data/products';
import '../../styles/tabmenu.css';

export default function TabMenu() {
  const { messages } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [activeProductSlug, setActiveProductSlug] = useState(null);
  const timeoutRef = useRef(null);

  const isActive = (path) => path === '/' ? pathname === '/' : pathname.startsWith(path);
  const isInProductsSection = pathname.startsWith('/Serviceproduct') || pathname.startsWith('/products/');

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

  return (
    <>
      <button className="hamburger" onClick={() => setOpen(!open)}><IoMenu /></button>
      <nav id="navmenu" className={`navmenu ${open ? 'active' : ''}`}>
        <ul className="nav-root">
          <li><Link href="/" className={isActive('/') ? 'active' : ''}>{messages.home}</Link></li>

          <li
            className={`dropdown ${isInProductsSection ? 'active' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/Serviceproduct" legacyBehavior>
              <a
                onClick={(e) => {
                  if (!serviceOpen) {
                    e.preventDefault();
                    setServiceOpen(true);
                  }
                }}
                className={isInProductsSection ? 'active' : ''}
                role="button"
                aria-expanded={serviceOpen}
                aria-haspopup="true"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0px 0px',
                }}
              >
                {messages.serviceproduct}
                {serviceOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </a>
            </Link>

            {serviceOpen && (
              <ul className="dropdown-menu level-1">
                {products.map((product) => {
                  const isCurrentProductPage = pathname.startsWith(`/products/${product.slug}`);
                  return (
                    <li
                      key={product.slug}
                      className={`dropdown-item ${isCurrentProductPage ? 'active' : ''}`}
                      onMouseEnter={() => setActiveProductSlug(product.slug)}
                      onMouseLeave={() => setActiveProductSlug(null)}
                    >
                      <Link href={`/products/${product.slug}`} legacyBehavior>
                        <a
                          className={`dropdown-toggle ${activeProductSlug === product.slug ? 'hovered' : ''}`}
                          style={{ cursor: 'pointer', padding: '15px 20px', display: 'block' }}
                        >
                          {product.name}
                        </a>
                      </Link>

                      {activeProductSlug === product.slug && (
                        <ul className="brand-submenu">
                          {product.brands.map((brand) => (
                            <li key={brand.slug}>
                              <Link
                                href={`/products/${product.slug}/${brand.slug}`}
                                className={pathname === `/products/${product.slug}/${brand.slug}` ? 'active' : ''}
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

          <li><Link href="/Search" className={isActive('/Search') ? 'active' : ''}>{messages.search}</Link></li>
          <li><Link href="/Editorial" className={isActive('/Editorial') ? 'active' : ''}>{messages.editorial}</Link></li>
          <li><Link href="/Faq" className={isActive('/Faq') ? 'active' : ''}>{messages.faq}</Link></li>
          <li><Link href="/Success" className={isActive('/Success') ? 'active' : ''}>{messages.success}</Link></li>
          <li><Link href="/About" className={isActive('/About') ? 'active' : ''}>{messages.about}</Link></li>
        </ul>
      </nav>
    </>
  );
}
