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
                        <img src='https://lacdau.com/media/product/250-1737-7e4d485812a320809c4679c0391e5359.jpg' alt="" />
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