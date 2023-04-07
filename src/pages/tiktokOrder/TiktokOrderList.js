import React, { useEffect, useState } from "react";
import TikTokOrderItem from "./TiktokOrderItem";
import SelectConnection from "../../components/SelectConnection";
import { useDispatch, useSelector } from "react-redux";
import CrawlModal from "../../components/modal/CrawlModal";
import {Diot3Icon, LoadingCircularProgress} from "@sapo-presentation/sapo-ui-components";
import {crawlTiktokOrder, getDataPrint, getTikTokOrders} from "../../apis/tiktokOrderApi";

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
    const positionApi = useSelector(state => state?.env?.positionApi);

    const [filterStatus, setFilterStatus] = useState(1);
    const [page, setPage] = useState({ id: 1,limit: 20 });
    const [query, setQuery] = useState('');
    const [selectedConnections, setSelectConnections] = useState(connections?.map(c => c.id) || []);
    const [showModal, setShowModal] = useState(false);
    const [showModalPrint, setShowModalPrint] = useState(false);

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

    const onSubmitCrawl = (connectionIds, fromDate, toDate) => {
        dispatch(crawlTiktokOrder(connectionIds, fromDate, toDate));
    }

    const onSubmitPrint = (connectionIds, fromDate, toDate) => {
        dispatch(getDataPrint(connectionIds, fromDate, toDate));
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

    const renderNotFound = () => {
        return (
            <div className="empty-list">
                <img src='https://social.dktcdn.net/facebook/files/search-empty.png' alt='' />
            </div>
        )
    }

    const isFetchOrders = positionApi.includes('getTikTokOrders')
    return (
        <React.Fragment>
            <div className="tiktok-order-filter">
                {showModal ? <CrawlModal closeModal={setShowModal} onSubmit={onSubmitCrawl}/> : null}
                {showModalPrint ? <CrawlModal closeModal={setShowModalPrint} onSubmit={onSubmitPrint}/> : null}
                <div className="tiktok-order-filter-connection">
                    <SelectConnection 
                        handleChangeSelectedConnection={handleChangeSelectedConnection}
                    />
                    <div>
                        <Button
                            variant={"outlined"}
                            onClick={() => setShowModalPrint(true)}
                            children={"In báo cáo doanh thu đơn hàng"}
                        />
                        <Button
                            ml={4}
                            onClick={() => setShowModal(true)}
                            children={"Cập nhật dữ liệu đơn hàng"}
                        />
                    </div>
                </div>
                <div className="tiktok-order-filter-status">
                    {renderFilterStatus()}
                </div>
                <div className="tiktok-order-filter-search">
                    <SearchBox 
                        placeholder="Tìm kiếm theo mã đơn hàng"
                        onChange={onQuery}
                        value={query}
                    />
                </div>
            </div>
            {
                isFetchOrders ? (
                    <div className="loading">
                        <LoadingCircularProgress />
                    </div>
                ) : (
                    <div className="tiktok-order-list">
                        {
                            tiktokOrders?.length ? (
                                    <>
                                        <div className="tiktok-order-item tiktok-order-list-header">
                                            <div className="tiktok-order-item-info">
                                                <div className="tiktok-order-number">Mã đơn hàng</div>
                                                <div className="tiktok-order-issued-at">Ngày tạo</div>
                                                <div className="tiktok-order-status">Trạng thái trên sàn</div>
                                                <div className="tiktok-order-shipping-carrier">Vận chuyển</div>
                                                <div className="tiktok-order-tracking-code">Mã vận đơn</div>
                                                <div className="tiktok-order-payment">Thanh toán</div>
                                                <div className="tiktok-order-action">Thao tác</div>
                                            </div>
                                        </div>
                                        {
                                            tiktokOrders.map(item => {
                                                return <TikTokOrderItem tiktokOrder={item} />
                                            })
                                        }
                                    </>
                            ) : (renderNotFound())
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
                )
            }
        </React.Fragment>
    )
}
export default TikTokOrderList;