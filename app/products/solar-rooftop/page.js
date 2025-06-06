import React from 'react';
import '@/styles/solar-rooftop.css';

const sampleProducts = [
  {
    brand: 'HUAWEI',
    type: 'Premium',
    items: [
      { name: 'Huawei Solar X1', price: '฿120,000' },
      { name: 'Huawei Solar X2', price: '฿135,000' },
      { name: 'Huawei Solar Hybrid', price: '฿145,000' },
      { name: 'Huawei Solar Roof Max', price: '฿160,000' },
      { name: 'Huawei Solar Plus', price: '฿175,000' },
    ],
  },
  {
    brand: 'GROWATT',
    type: 'Standard',
    items: [
      { name: 'Growatt Eco 3.0', price: '฿90,000' },
      { name: 'Growatt Pro', price: '฿105,000' },
      { name: 'Growatt S', price: '฿110,000' },
      { name: 'Growatt Advance', price: '฿115,000' },
      { name: 'Growatt Max', price: '฿120,000' },
    ],
  },
  {
    brand: 'Dey eenavance',
    type: 'Hybrid',
    items: [
      { name: 'Dey Hybrid 5000', price: '฿130,000' },
      { name: 'Dey Hybrid 6000', price: '฿145,000' },
      { name: 'Dey Smart Hybrid', price: '฿155,000' },
      { name: 'Dey Power X', price: '฿165,000' },
      { name: 'Dey Eco Hybrid', price: '฿170,000' },
    ],
  },
];

export default function SolarRooftopPage() {
  return (
    <div className="solar-page">
      <h1>Solar Rooftop</h1>

      {sampleProducts.map((brandData) => (
        <div key={brandData.brand} className="brand-section">
          <h2>{brandData.brand} - {brandData.type}</h2>
          <div className="product-list">
            {brandData.items.map((product, index) => (
              <div key={index} className="product-card">
                <img src="/images/sample-product.jpg" alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
