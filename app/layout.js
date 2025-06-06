// app/layout.js
import { Kanit } from 'next/font/google'
import { LocaleProvider } from './Context/LocaleContext';
import Navbartest from './components/Navbartest';
import TabMenu from './components/TabMenu';
import Footer from './components/Footer';
import './globals.css';
import CookieBanner from './components/CookieBanner';

const kanit = Kanit({
  subsets: ['thai'],
  weight: ['300', '400', '600', '700'], // โหลดหลายน้ำหนัก
  display: 'swap',
});

export const metadata = {
  title: 'Saksiame Solar ศักดิ์สยามโซลาร์',
  description: 'เว็บไซต์ Saksiame Solar',
  icons: {
    icon: 'logosakico.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={kanit.className}>
      <body>
        <LocaleProvider>
          <Navbartest />
          <TabMenu />
            <main>{children}</main>   
          <CookieBanner /> 
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
