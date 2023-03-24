import { RefreshIcon } from "@sapo-presentation/sapo-ui-components";
import { useState } from "react";
import { createIcon, drillIcon, mappingIcon } from "../../svg/svgIcon";
import ProductVariantMapping from "./ProductVariantMapping";

function ProductVariant(props) {

    const [dillStatus, setDrillStatus] = useState(false);

    const toggleVariant = () => {
        setDrillStatus(!dillStatus)
    }

    const { variant } = props;
    return (
        <div className="product-variant">
            <div className="product-variant-info">
                <div className="col-1">
                    <div className="drill-icon" onClick={() => toggleVariant()}>{drillIcon(dillStatus)}</div>
                    <div className="image-product">
                        <img src={variant.image ? variant.image : 'https://louisville.edu/history/images/noimage.jpg/'} alt="" />
                    </div>
                    <div className="info-product">
                        <div className="product-name">{variant.name}</div>
                        <div className="sku">SKU: {variant.sku}</div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="mapping-status">{variant.mapping_id === 0 ? 'Chưa liên kết' : 'Đã liên kết'}</div>
                </div>
                <div className="col-3">
                    <div className="image-product">
                        <img src='https://lacdau.com/media/product/250-1737-7e4d485812a320809c4679c0391e5359.jpg' alt="" />
                    </div>
                    <div className="info-product">
                        <div className="product-name">Mo hinh Son Goku Genkidama - 2023</div>
                        <div className="sku">SKU: {variant.sku}</div>
                    </div>
                </div>
                <div className="col-4">
                    {mappingIcon()}
                    {createIcon()}
                    <RefreshIcon />
                </div>
            </div>
            {
                dillStatus ? (
                    <div className="product-mapping-wrapper">
                        <ProductVariantMapping />
                    </div>
                ) : null
            }
        </div>
    );
}
export default ProductVariant;