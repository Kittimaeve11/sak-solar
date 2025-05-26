// app/layout.js

import { LocaleProvider } from './Context/LocaleContext';
import Navbar from './components/Navbar';
import TabMenu from './components/TabMenu';
import Footer from './components/Footer';
import './globals.css';
export const metadata = {
  title: 'Saksiame Solar ศักดิ์สยามโซลาร์',
  description: 'เว็บไซต์ Saksiame Solar',
  icons: {
    icon: 'logosakico.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LocaleProvider>
          <Navbar />
          <TabMenu />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
