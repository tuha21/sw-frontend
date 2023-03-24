import { LoadingCircularProgress } from "@sapo-presentation/sapo-ui-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelProducts } from "../../apis/settingApi";
import "../../style/product.scss"
import { tiktokIcon } from "../../svg/svgIcon";
import ProductItem from "./ProductItem";

function Product() {

    const [mappingStatus, setMappingStatus] = useState(1); // 1-all, 2-mapping, 3-not mapping
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChannelProducts(page, mappingStatus, query));
    }, [mappingStatus])

    const connections = useSelector(state => state?.setting?.connections);
    const channelProducts = useSelector(state => state?.channelProduct?.channelProducts || []);
    const positionApi = useSelector(state => state?.env?.positionApi);

    useEffect(() => {
        if (query.length >= 3 || query.length === 0) {
            dispatch(getChannelProducts(page, mappingStatus, query));
        }
    }, [query])

    const onSearch = (e) => {
        setQuery(e.target.value);
    }

    const channgeTab = (tab) => {
        setMappingStatus(tab);
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

    const isFetchProduct = positionApi.includes('getChannelProducts')
    return (
        <div className="products-wrapper">
            <div className="products-filter">
                <div className="connections-filter">
                    <div className="connections-select-info">
                        <div>{tiktokIcon()}</div>
                        <div className="total-seleted">{connections.length} gian hang</div>
                    </div>
                </div>
                <div className="products-action">
                    <button className="btn-quick-mapping">Liên kết nhanh</button>
                    <button className="btn-crawl-product">Cập nhật dữ liệu sản phẩm</button>
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
                    </>
                )
            }
        </div>
    )

}

export default Product;