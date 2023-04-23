import { CloseIcon, Pagination, SearchBox } from "@sapo-presentation/sapo-ui-components";
import { useEffect, useState } from "react";
import '../../style/modal/manualMappingModal.scss';
import { useDispatch } from "react-redux";
import { getSwProductsToMap } from "../../apis/swProductApi";
import { manualMap } from "../../apis/tiktokProductApi";

function ManualMapingModal(props) {

    const { setOpenList, tiktokVariantId } = props;

    const [page, setPage] = useState({ id: 1, limit: 5 });
    const [query, setQuery] = useState('');
    const [fethching, setFetching] = useState(false);
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0);


    useEffect(() => {
        setFetching(true);
        getSwProductsToMap(query, page.id, page.limit).then(res => {
            if (res?.data?.data) {
                setData(res.data.data.products)
                setTotal(res.data.data.total)
            }
        })
        setFetching(false);
    }, [query, page])

    const dispatch = useDispatch();

    const onQuery = (query) => {
        setQuery(query);
    }

    const handleChangePage = (id, limit) => {
        setPage({ id, limit });
    }

    const onManualMapping = (variantId) => {
        dispatch(manualMap(tiktokVariantId, variantId));
    }

    const renderVariant = (product) => {
        return product.variants.map((value, index) => {
            return (
                <div className="product-item-mapping" onClick={() => onManualMapping(value.id)}>
                    <div className="image"><img alt="" src={value.image} /></div>
                    <div className="product-infosss">
                        <div className="product-name">{product.name}</div>
                        <div className="product-sku">
                            <div>{value.sku + ": " + value.name}</div>
                            <div>{value.retail_price} đ</div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="select-product-wrapper">
            <div className="headersss"><CloseIcon onClick={() => setOpenList(false)}/></div>
            <div className="search-box">
                <SearchBox
                    placeholder="Tìm kiếm theo mã sku"
                    onChange={onQuery}
                    value={query}
                />
            </div>
            <div className="list-product-wrapper">
                <div className="list-product">
                    {
                        data.map((value, index) => {
                            return renderVariant(value)
                        })
                    }
                </div>
                <div className="pagination">
                    <Pagination
                        total={total}
                        limit={5}
                        currentPage={page.id}
                        onChange={handleChangePage}
                    />
                </div>
            </div>
        </div>
    )

}
export default ManualMapingModal;