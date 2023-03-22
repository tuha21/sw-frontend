import { useState } from "react";
import { drillIcon } from "../../svg/svgIcon";
import ProductVariant from "./ProductVariant";

function ProductItem() {

    const [dillStatus, setDrillStatus] = useState(true);

    const toggleVariant = () => {
        setDrillStatus(!dillStatus)
    }

    return (
        <div className="product-item">
            <div className="main-product">
                <div className="col-1">
                    <div className="drill-icon" onClick={() => toggleVariant()}>{drillIcon(dillStatus)}</div>
                    <div className="image-product">
                        <img src='https://sapo.dktcdn.net/100/396/032/variants/0258d7e6fece92cbcef4b7aaedd85bba-1678359826075.png' alt="" />
                    </div>
                    <div className="info-product">
                        <div className="product-name">Mô hình Son Goku vs Freeza</div>
                        <div className="varian-info">{'3 phiên bản'}</div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="mapping-status">3/3</div>
                </div>
                <div className="col-3">
                </div>
                <div className="col-4">
                </div>
            </div>
            {
                dillStatus ? (
                    <div className="product-vatiant-list">
                        <ProductVariant />
                        <ProductVariant />
                        <ProductVariant />
                    </div>
                ) : null
            }
        </div>
    );
}
export default ProductItem;