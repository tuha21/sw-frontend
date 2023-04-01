import React, { useState } from "react";
import TikTokOrderItem from "./TiktokOrderItem";

const { Pagination, Button, SearchBox } = require("@sapo-presentation/sapo-ui-components");

const listStatusFilter = [
    {status: 'all', label: "Tất cả đơn hàng"},
    {status: 'unpaid', label: "Chưa xử lý"},
    {status: 'process', label: "Đã xử lý"},
    {status: 'shiping', label: "Gao thành công"},
    {status: 'canncelled', label: "Đơn hủy"}
]
function TikTokOrderList (props) {

    const [filterStatus, setFilterStatus] = useState('all');

    const handleChangePage = (page, limit) => {
        
    }

    const renderFilterStatus = () => {
        return listStatusFilter.map((item, index) => {
            return <div 
                        key={index} 
                        className={`tiktok-order-filter-status-tab ${filterStatus === item.status ? 'active' : ''}`}
                        onClick={() => setFilterStatus(item.status)}
                    >{item.label}
                    </div>
        })
    }

    return (
        <React.Fragment>
            <div className="tiktok-order-filter">
                <div className="tiktok-order-filter-connection">
                    <Button
                        children={"Chọn gian hàng"}
                        variant="outlined"
                    />
                    <Button
                        children={"Cập nhật dữ liệu đơn hàng"}
                    />
                </div>
                <div className="tiktok-order-filter-status">
                    {renderFilterStatus()}
                </div>
                <div className="tiktok-order-filter-search">
                    <SearchBox placeholder="Tìm kiếm theo mã đơn hàng"/>
                </div>
            </div>
            <div className="tiktok-order-list">
                <div className="tiktok-order-item tiktok-order-list-header">
                    <div className="tiktok-order-item-info">
                        <div className="tiktok-order-number">Mã đơn hàng</div>
                        <div className="tiktok-order-issued-at">Ngày tạo</div>
                        <div className="tiktok-order-status">Trạng thái trên sàn</div>
                        <div className="tiktok-order-shipping-carrier">Vận chuyển</div>
                        <div className="tiktok-order-tracking-code">Mã vận đơn</div>
                        <div className="tiktok-order-action">Thao tác</div>
                    </div>
                </div>
                <TikTokOrderItem />
                <TikTokOrderItem />
                <TikTokOrderItem />
                <TikTokOrderItem />
                <TikTokOrderItem />
                <div className="tiktok-order-paginate">
                    <Pagination 
                        total={100}
                        limit={20}
                        currentPage={1}
                        onChange={handleChangePage}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
export default TikTokOrderList;