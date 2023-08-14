'use client';
// import { Poppins } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './global.css';

// const poppins = Poppins({
//   weight: ['400', '700'],
//   style: ['normal', 'italic'],
//   subsets: ['latin'],
//   display: 'swap',
// });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <html lang="cs" className={poppins.className}>
    <html lang="cs">
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
