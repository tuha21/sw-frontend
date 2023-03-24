import {
  BrowserRouter, Route, Routes, Link
} from 'react-router-dom';
import Product from './pages/product/Product';
import Setting from './pages/setting/Setting';
import './style/app.scss';
import { orderIcon, settingIcon } from './svg/svgIcon';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getConnections } from './apis/settingApi';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchConnection()
  }, []);

  const fetchConnection = () => {
      dispatch(getConnections());
  }

  return (
    <BrowserRouter>
      <div className="app">
        <div className="siderbar">
          <div className='app-name'>SaleWork</div>
          <div className='siderbar-item active-menu'>
            {orderIcon()}
            <Link to={'/sw-frontend/tiktok-product'}>Sản phẩm</Link>
          </div>
          <div className='siderbar-item'>
            {orderIcon()}
            <Link to={'/sw-frontend/tiktok-setting'}>Đơn hàng</Link>
          </div>
          <div className='siderbar-item'>
            {settingIcon()}
            <Link to={'/sw-frontend/tiktok-setting'}>Cấu hình</Link>
          </div>
        </div>
        <div className="body">
          <div className="topbar">
            <span>{"Sàn TMĐT > Sản phẩm"}</span>
          </div>
          <div className='content'>
            <Routes>
              <Route path='/' element={<Setting />} />
              <Route path='/sw-frontend' element={<Setting />} />
              <Route path='/sw-frontend/tiktok-product' element={<Product />} />
              <Route path='/sw-frontend/tiktok-setting' element={<Setting />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
