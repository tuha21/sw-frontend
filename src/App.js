import {
  Route, Routes, Link, useLocation
} from 'react-router-dom';
import Product from './pages/product/Product';
import Setting from './pages/setting/Setting';
import './style/app.scss';
import { breakCrumbIcon, orderIcon, settingIcon } from './svg/svgIcon';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getConnections } from './apis/settingApi';
import TikTokOrder from './pages/tiktokOrder/TiktokOrder';
import Processing from './pages/modal/Processing';
import SwProductWrapper from './pages/sw-product/SwProductWrapper';

function App() {
  const location = useLocation();

  const dispatch = useDispatch();

  const [pathTitle, setPathTitle] = useState('');

  useEffect(() => {
    switch (location.pathname) {
      case '/sw-frontend/tiktok-product':
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
      case '/sw-frontend/product':
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
      <div className="siderbar">
        <div className='app-name'>SaleWork</div>
        <div className={`siderbar-item ${isCurrentPath('/sw-frontend/product') ? 'active-menu' : ''}`}>
          {settingIcon()}
          <Link to={'/sw-frontend/product'}>Sản phẩm</Link>
        </div>
        <div className={`siderbar-item ${isCurrentPath('/sw-frontend/order') ? 'active-menu' : ''}`}>
          {settingIcon()}
          <Link to={'/sw-frontend/order'}>Đơn hàng</Link>
        </div>
        <div className={`siderbar-item ${isCurrentPath('/sw-frontend/tiktok-product') ? 'active-menu' : ''}`}>
          {orderIcon()}
          <Link to={'/sw-frontend/tiktok-product'}>Sản phẩm TikTokShop</Link>
        </div>
        <div className={`siderbar-item ${isCurrentPath('/sw-frontend/tiktok-order') ? 'active-menu' : ''}`}>
          {orderIcon()}
          <Link to={'/sw-frontend/tiktok-order'}>Đơn hàng TikTokShop</Link>
        </div>
        <div className={`siderbar-item ${isCurrentPath('/sw-frontend/tiktok-setting') ? 'active-menu' : ''}`}>
          {settingIcon()}
          <Link to={'/sw-frontend/tiktok-setting'}>Cấu hình</Link>
        </div>
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
            <Route path='/sw-frontend/tiktok-product' element={<Product />} />
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
