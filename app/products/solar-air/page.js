// app/products/solar-air/page.js
'use client';

import '@/styles/solar-air.css';
import Image from 'next/image';

const sampleProducts = [
  {
    brand: 'sinclair',
    items: [
      { name: 'Sinclair Solar Air 1', img: '/images/sinclair1.jpg' },
      { name: 'Sinclair Solar Air 2', img: '/images/sinclair2.jpg' },
      { name: 'Sinclair Solar Air 3', img: '/images/sinclair3.jpg' },
      { name: 'Sinclair Solar Air 4', img: '/images/sinclair4.jpg' },
      { name: 'Sinclair Solar Air 5', img: '/images/sinclair5.jpg' },
    ],
  },
  {
    brand: 'LONGI',
    items: [
      { name: 'LONGI Solar Air 1', img: '/images/longi1.jpg' },
      { name: 'LONGI Solar Air 2', img: '/images/longi2.jpg' },
      { name: 'LONGI Solar Air 3', img: '/images/longi3.jpg' },
      { name: 'LONGI Solar Air 4', img: '/images/longi4.jpg' },
      { name: 'LONGI Solar Air 5', img: '/images/longi5.jpg' },
    ],
  },
];

export default function SolarAirPage() {
  return (
    <div className="solar-air-container">
      <h1 className="title">Solar Air Products</h1>
      {sampleProducts.map((brand) => (
        <section key={brand.brand} className="brand-section">
          <h2 className="brand-name">{brand.brand}</h2>
          <div className="product-grid">
            {brand.items.map((item, index) => (
              <div key={index} className="product-card">
                <Image src={item.img} alt={item.name} width={200} height={200} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
