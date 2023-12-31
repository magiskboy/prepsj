import { Outlet } from 'react-router-dom';

import Header from '../Header/Header.component';
import Footer from '../Footer/Footer.component';

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}