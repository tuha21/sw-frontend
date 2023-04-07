import {
  Route, Routes, Link, useLocation
} from 'react-router-dom';
import TiktokProductWrapper from './pages/tiktokProduct/TiktokProductWrapper';
import Setting from './pages/setting/Setting';
import './style/app.scss';
import {boxIcon, breakCrumbIcon, cartIcon, orderIcon, settingIcon} from './svg/svgIcon';
import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import { getConnections } from './apis/settingApi';
import TikTokOrder from './pages/tiktokOrder/TiktokOrder';
import Processing from './components/modal/Processing';
import SwProductWrapper from './pages/swProduct/SwProductWrapper';
import SwAlerts from "./components/SwAlerts";
import {ArrowChevronRightIcon} from "@sapo-presentation/sapo-ui-components";

function App() {
  const location = useLocation();

  const dispatch = useDispatch();

  const [pathTitle, setPathTitle] = useState('');

  useEffect(() => {
    switch (location.pathname) {
      case '/sw-frontend/tiktok-tiktokProduct':
        setPathTitle('Sản phẩm TikTokShop');
        break;
      case '/sw-frontend/tiktok-order':
        setPathTitle('Đơn hàng TikTokShop');
        break;
      case '/sw-frontend/tiktok-setting':
        setPathTitle('Cấu hình');
        break;
      case '/sw-frontend/':
        setPathTitle('Cấu hình');
        break;
      case '/sw-frontend/tiktokProduct':
        setPathTitle('Sản phẩm');
        break;
      case '/sw-frontend/order':
        setPathTitle('Đơn hàng');
        break;
      default: setPathTitle('')
    }
  }, [location.pathname])

  useEffect(() => {
    fetchConnection()
  }, []);

  const isCurrentPath = (path) => {
    return path === location.pathname;
  }

  const fetchConnection = () => {
    dispatch(getConnections());
  }

  return (
    <div className="app">
      <SwAlerts />
      <div className="siderbar">
        <div className='app-name'>SaleWork</div>
        <div className="menu-item">
          <div className="menu-name">
            <div className="name"> {cartIcon()} Tổng quan</div>
          </div>
        </div>
        <div className="menu-item">
          <div className="menu-name">
            <div className="name">{boxIcon()} Sản phẩm</div>
            <ArrowChevronRightIcon />
          </div>
          <div className="sub-menus">
            <div className={`sub-menu ${isCurrentPath('/sw-frontend/product') ? 'active' : ''}`}>
              <div className="name"><Link to={'/sw-frontend/product'}>Danh sách sản phẩm</Link></div>
            </div>
          </div>
        </div>
        <div className="applications">KÊNH BÁN HÀNG</div>
        <div className="menu-item">
          <div className="menu-name">
            <div className="name"> {cartIcon()} Tik Tok Shop</div>
            <ArrowChevronRightIcon />
          </div>
          <div className="sub-menus">
            <div className={`sub-menu ${isCurrentPath('/sw-frontend/tiktok-product') ? 'active' : ''}`}>
              <Link to={'/sw-frontend/tiktok-product'}>Sản phẩm</Link>
            </div>
            <div className={`sub-menu ${isCurrentPath('/sw-frontend/tiktok-order') ? 'active' : ''}`}>
              <Link to={'/sw-frontend/tiktok-order'}>Đơn hàng</Link>
            </div>
          </div>
        </div>
        <div className="menu-item">
          <div className={`menu-name ${isCurrentPath('/sw-frontend/tiktok-setting') ? 'active' : ''}`}>
            <div className="name"> {settingIcon()} <Link to={'/sw-frontend/tiktok-setting'}>Cấu hình</Link></div>
          </div>
        </div>
        {/*<div className={`siderbar-item ${isCurrentPath('/sw-frontend/tiktokProduct') ? 'active-menu' : ''}`}>*/}
        {/*  {settingIcon()}*/}
        {/*  <Link to={'/sw-frontend/product'}>Sản phẩm</Link>*/}
        {/*</div>*/}
        {/*<div className={`siderbar-item ${isCurrentPath('/sw-frontend/tiktok-tiktokProduct') ? 'active-menu' : ''}`}>*/}
        {/*  {orderIcon()}*/}
        {/*  <Link to={'/sw-frontend/tiktok-product'}>Sản phẩm TikTokShop</Link>*/}
        {/*</div>*/}
        {/*<div className={`siderbar-item ${isCurrentPath('/sw-frontend/tiktok-order') ? 'active-menu' : ''}`}>*/}
        {/*  {orderIcon()}*/}
        {/*  <Link to={'/sw-frontend/tiktok-order'}>Đơn hàng TikTokShop</Link>*/}
        {/*</div>*/}
        {/*<div className={`siderbar-item ${isCurrentPath('/sw-frontend/tiktok-setting') ? 'active-menu' : ''}`}>*/}
        {/*  {settingIcon()}*/}
        {/*  <Link to={'/sw-frontend/tiktok-setting'}>Cấu hình</Link>*/}
        {/*</div>*/}
      </div>
      <div className="body">
        <div className="topbar">
          <span className="parent-title">{"Sàn TMĐT"}</span>
          {breakCrumbIcon()}
          <span className="current-title">{pathTitle}</span>
        </div>
        <div className='content'>
          <Routes>
            <Route path='/' element={<Setting />} />
            <Route path='/sw-frontend' element={<Setting />} />
            <Route path='/sw-frontend/tiktok-product' element={<TiktokProductWrapper />} />
            <Route path='/sw-frontend/tiktok-setting' element={<Setting />} />
            <Route path='/sw-frontend/product' element={<SwProductWrapper />} />
            <Route path='/sw-frontend/order' element={<TikTokOrder />} />
            <Route path='/sw-frontend/tiktok-order' element={<TikTokOrder />} />
          </Routes>
          <Processing />
        </div>
      </div>
    </div>
  );
}

export default App;
