import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Checkbox,
    LoadingCircularProgress,
    Pagination,
    PlusIcon,
    SearchBox
} from "@sapo-presentation/sapo-ui-components";
import "../../style/swProduct/swProduct.scss";
import {getSwProducts} from "../../apis/swProductApi";

function SwProductWrapper(props) {

    const swProducts = useSelector(state => state.swProduct.swProducts);
    const totalProducts = useSelector(state => state.swProduct.totalProduct);
    const positionApi = useSelector(state => state?.env?.positionApi);

    const [page, setPage] = useState({ id: 1,limit: 20 });
    const [query, setQuery] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (query.length >= 3 || query.length === 0) {
            dispatch(getSwProducts(query, page.id, page.limit))
        }
    }, [query]);

    useEffect(() => {
        dispatch(getSwProducts(query, page.id, page.limit))
    }, [page]);

    const handleChangePage = (id, limit) => {
        setPage({id, limit});
    }

    const renderNotFound = () => {
        return (
            <div className="empty-list">
                <img src='https://social.dktcdn.net/facebook/files/search-empty.png' alt='' />
            </div>
        )
    }

    const isFetchProduct = positionApi.includes('getSwProducts')
    return (
        <div className="sw-product-wrapper">
            <div className="sw-product-filter-tab">
                <div className="sw-product-filer-quick">
                    <div className="sw-product-add-button">
                        <Button startIcon={<PlusIcon />} children="Thêm mới sản phẩm" />
                    </div>
                </div>
            </div>
            <div className="sw-product-filter-search">
                <SearchBox
                    placeholder="Tìm kiếm theo tên sản phẩm"
                    value={query}
                    onChange={setQuery}
                />
            </div>
            <div className="sw-product-list">
                {
                    isFetchProduct ? (
                        <div className="loading">
                            <LoadingCircularProgress />
                        </div>
                    ) : (
                        <React.Fragment>
                            <div className="sw-product-list-item sw-product-list-header">
                                <div className="sw-product-list-col-box"><Checkbox /></div>
                                <div className="sw-product-list-col-image">Ảnh</div>
                                <div className="sw-product-list-col-name">Sản phẩm</div>
                                <div className="sw-product-list-col-type">Loại</div>
                                <div className="sw-product-list-col-available">Tồn kho</div>
                            </div>
                            {
                                !swProducts?.length > 0 ? (renderNotFound()) : (
                                    swProducts.map((product, index) => {
                                        return (
                                            <div key={index} className="sw-product-list-item sw-product-list-body">
                                                <div className="main-product">
                                                    <div className="sw-product-list-col-box"><Checkbox /></div>
                                                    <div className="sw-product-list-col-image">
                                                        <img src={product.image} alt="" />
                                                    </div>
                                                    <div className="sw-product-list-col-name">{product.name}</div>
                                                    <div className="sw-product-list-col-type">Sản phẩm thường</div>
                                                    <div className="sw-product-list-col-available"></div>
                                                </div>

                                                <div className="variant">
                                                    {
                                                        product.variants?.map((variant, index) => {
                                                            return (
                                                                <div className="variant-item" key={index}>
                                                                    <div className="sw-product-list-col-box"></div>
                                                                    <div className="sw-product-list-col-image">
                                                                        <img src={variant.image} alt="" />
                                                                    </div>
                                                                    <div className="sw-product-list-col-name">
                                                                        {variant.name}
                                                                    </div>
                                                                    <div className="sw-product-list-col-type">{variant.sku}</div>
                                                                    <div className="sw-product-list-col-available">{variant.available}</div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                            }
                        </React.Fragment>
                    )
                }
                <Pagination
                    total={totalProducts}
                    limit={page.limit}
                    currentPage={page.id}
                    onChange={handleChangePage}
                />
            </div>
        </div>
    )

}
export default SwProductWrapper;