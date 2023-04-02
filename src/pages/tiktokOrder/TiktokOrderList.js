import React, { useEffect, useState } from "react";
import TikTokOrderItem from "./TiktokOrderItem";
import SelectConnection from "../../components/SelectConnection";
import { useDispatch, useSelector } from "react-redux";
import { getTikTokOrders } from "../../apis/settingApi";

const { Pagination, Button, SearchBox } = require("@sapo-presentation/sapo-ui-components");

const listStatusFilter = [
    {status: 1, label: "Tất cả đơn hàng"},
    {status: 2, label: "Chưa xử lý"},
    {status: 3, label: "Đã xử lý"},
    {status: 4, label: "Gao thành công"},
    {status: 140, label: "Đơn hủy"}
]
function TikTokOrderList (props) {
    const connections = useSelector(state => state?.setting?.connections) || [];
    const tiktokOrders = useSelector(state => state?.tiktokOrders?.orderList) || [];
    const totalOrder = useSelector(state => state?.tiktokOrders?.totalOrder);

    const [filterStatus, setFilterStatus] = useState(1);
    const [page, setPage] = useState({ id: 1,limit: 20 });
    const [query, setQuery] = useState('');
    const [selectedConnections, setSelectConnections] = useState(connections?.map(c => c.id) || []);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTikTokOrders(page.id, page.limit, selectedConnections, filterStatus, query));
    }, [page, filterStatus, query, selectedConnections]);

    const handleChangePage = (id, limit) => {
        setPage({id, limit});
    }

    const handleChangeSelectedConnection = (connectionIds) => {
        setSelectConnections(connectionIds);
    }

    const onQuery = (query) => {
       setQuery(query);
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
                    <SelectConnection 
                        handleChangeSelectedConnection={handleChangeSelectedConnection}
                    />
                    <Button
                        children={"Cập nhật dữ liệu đơn hàng"}
                    />
                </div>
                <div className="tiktok-order-filter-status">
                    {renderFilterStatus()}
                </div>
                <div className="tiktok-order-filter-search">
                    <SearchBox 
                        placeholder="Tìm kiếm theo mã đơn hàng"
                        onChange={onQuery}
                    />
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
                {
                    tiktokOrders.map(item => {
                        return <TikTokOrderItem tiktokOrder={item} />
                    })
                }
                <div className="tiktok-order-paginate">
                    <Pagination 
                        total={totalOrder}
                        limit={page.limit}
                        currentPage={page.id}
                        onChange={handleChangePage}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
export default TikTokOrderList;