import { LoadingCircularProgress, Pagination } from "@sapo-presentation/sapo-ui-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { crawlTiktokProduct, getChannelProducts } from "../../apis/settingApi";
import "../../style/product.scss"
import ProductItem from "./ProductItem";
import SelectConnection from "../../components/SelectConnection";
import CrawlModal from "../modal/CrawlModal";

function Product() {

    const connections = useSelector(state => state?.setting?.connections) || [];

    const [selectedConnections, setSelectConnections] = useState(connections?.map(c => c.id) || []);
    const [mappingStatus, setMappingStatus] = useState(1); // 1-all, 2-mapping, 3-not mapping
    const [query, setQuery] = useState('');
    const [page, setPage] = useState({id: 1, limit: 20});
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChannelProducts(selectedConnections, query, mappingStatus, page.id, page.limit));
    }, [mappingStatus, page, selectedConnections, query])

    const channelProducts = useSelector(state => state?.channelProduct?.channelProducts || []);
    const positionApi = useSelector(state => state?.env?.positionApi);

    const onSearch = (e) => {
        setQuery(e.target.value);
    }

    const channgeTab = (tab) => {
        setMappingStatus(tab);
    }
    
    const handleChangePage = (id, limit) => {
        setPage({id, limit});
    }

    const handleChangeSelectedConnection = (connectionIds) => {
        setSelectConnections(connectionIds);
    }

    const renderChannelProduct = () => {
        return channelProducts.map((v, i) => {
            return <ProductItem channelProduct={v} />
        });
    }

    const renderNotFound = () => {
        return (
            <div className="empty-list">
                <img src='https://social.dktcdn.net/facebook/files/search-empty.png' alt='' />
            </div>
        )
    }

    const onSubmitCrawl = (connectionIds, fromDate, toDate) => {
        dispatch(crawlTiktokProduct(connectionIds, fromDate, toDate));
    }

    const isFetchProduct = positionApi.includes('getChannelProducts')
    return (
        <div className="products-wrapper">
            {showModal ? <CrawlModal closeModal={setShowModal} onSubmit={onSubmitCrawl}/> : null}
            <div className="products-filter">
                <div className="connections-filter">
                    <SelectConnection
                        handleChangeSelectedConnection={handleChangeSelectedConnection}
                    />
                </div>
                <div className="products-action">
                    <button className="btn-quick-mapping">Liên kết nhanh</button>
                    <button className="btn-crawl-product"
                        onClick={() => setShowModal(true)}
                    >Cập nhật dữ liệu sản phẩm</button>
                </div>
            </div>
            <div className="product-quick-filter">
                <div className="filter-tab">
                    <span className={mappingStatus === 1 ? 'active' : ''}
                        onClick={() => channgeTab(1)}
                    >Tất cả sản phẩm</span>
                    <span className={mappingStatus === 2 ? 'active' : ''}
                        onClick={() => channgeTab(2)}
                    >Đã liên kết</span>
                    <span className={mappingStatus === 3 ? 'active' : ''}
                        onClick={() => channgeTab(3)}
                    >Chưa liên kết</span>
                </div>
                <div className="filter-text">
                    <input onChange={(e) => onSearch(e)} value={query} placeholder="Tìm kiếm theo mã sản phẩm, tên sản phẩm" />
                </div>
            </div>
            {
                isFetchProduct ? (
                    <div className="loading">
                        <LoadingCircularProgress />
                    </div>
                ) : (
                    <>
                        {channelProducts.length === 0 ? (renderNotFound()) : (
                            <div className="product-list">
                                <div className="product-header">
                                    <div className="col-1">Sản phẩm</div>
                                    <div className="col-2">Trạng thái liên kết</div>
                                    <div className="col-3">Sản phẩm liên kết</div>
                                    <div className="col-4">Thao tác</div>
                                </div>
                                <div className="product-body">
                                    {renderChannelProduct()}
                                </div>
                            </div>
                        )}
                        <Pagination
                                    total={100}
                                    limit={page.limit}
                                    currentPage={page.id}
                                    onChange={handleChangePage}
                                />
                    </>
                )
            }
        </div>
    )

}

export default Product;