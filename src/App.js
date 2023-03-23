import {
  BrowserRouter, Route, Routes, Link
} from 'react-router-dom';
import Product from './pages/product/Product';
import Setting from './pages/setting/Setting';
import './style/app.scss';
import { orderIcon, settingIcon } from './svg/svgIcon';
import React, { useState } from 'react';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="siderbar">
          <div className='app-name'>SaleWork</div>
          <div className='siderbar-item active-menu'>
            {orderIcon()}
            <Link to={'/home/tiktok-product'}>Sản phẩm</Link>
          </div>
          <div className='siderbar-item'>
            {orderIcon()}
            <Link to={'/home/tiktok-setting'}>Đơn hàng</Link>
          </div>
          <div className='siderbar-item'>
            {settingIcon()}
            <Link to={'/home/tiktok-setting'}>Cấu hình</Link>
          </div>
        </div>
        <div className="body">
          <div className="topbar">
            <span>{"Sàn TMĐT > Sản phẩm"}</span>
          </div>
          <div className='content'>
            <Routes>
              <Route path='/' element={<Product />} />
              <Route path='/home/tiktok-product' element={<Product />} />
              <Route path='/home/tiktok-setting' element={<Setting />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
