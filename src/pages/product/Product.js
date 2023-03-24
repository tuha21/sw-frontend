import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelProducts } from "../../apis/settingApi";
import "../../style/product.scss"
import { tiktokIcon } from "../../svg/svgIcon";
import ProductItem from "./ProductItem";

function Product () {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChannelProducts());
    }, [])

    const channelProducts = useSelector(state => state?.channelProduct?.channelProducts || [])

    return (
        <div className="products-wrapper">
            <div className="products-filter">
                <div className="connections-filter">
                    <div className="connections-select-info">
                        <div>{tiktokIcon()}</div>
                        <div className="total-seleted">{"6 gian hàng"}</div>
                    </div>
                </div>
                <div className="products-action">
                    <button className="btn-quick-mapping">Liên kết nhanh</button>
                    <button className="btn-crawl-product">Cập nhật dữ liệu sản phẩm</button>
                </div>
            </div>
            <div className="product-quick-filter">
                <div className="filter-tab">
                    <span className="active">Tất cả sản phẩm</span>
                    <span>Đã liên kết</span>
                    <span>Chưa liên kết</span>
                </div>
                <div className="filter-text">
                    <input placeholder="Tìm kiếm theo mã sản phẩm, tên sản phẩm" />
                </div>
            </div>
            <div className="product-list">
                <div className="product-header">
                    <div className="col-1">Sản phẩm</div>
                    <div className="col-2">Trạng thái liên kết</div>
                    <div className="col-3">Sản phẩm liên kết</div>
                    <div className="col-4">Thao tác</div>
                </div>
                <div className="product-body">
                    {channelProducts.map((v, i) => {
                        return <ProductItem channelProduct={v} />
                    })}
                </div>
            </div>
        </div>
    )

}

export default Product;