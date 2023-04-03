import { RefreshIcon } from "@sapo-presentation/sapo-ui-components";
import { useState } from "react";
import { createIcon, drillIcon, mappingIcon } from "../../svg/svgIcon";
import ProductVariantMapping from "./ProductVariantMapping";
import { useDispatch } from "react-redux";
import { quickCreate, quickMap } from "../../apis/settingApi";

function ProductVariant(props) {
    const { variant } = props;

    const [dillStatus, setDrillStatus] = useState(false);

    const toggleVariant = () => {
        setDrillStatus(!dillStatus)
    }

    const dispatch = useDispatch();

    const quickMapVariant = () => {
        const { id } = variant;
        dispatch(quickMap(id));
    }

    const quickCreateVariant = () => {
        const { id } = variant;
        dispatch(quickCreate(id));
    }

    const mappingVariant = variant.variant;
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
                    {mappingVariant ? (
                        <>
                        <div className="image-product">
                        <img src={mappingVariant.image} alt="" />
                    </div>
                    <div className="info-product">
                        <div className="product-name">{mappingVariant.name}</div>
                        <div className="sku">SKU: {mappingVariant.sku}</div>
                    </div>
                        </>
                    ) : '---'}
                </div>
                <div className="col-4">
                    <div onClick={() => quickMapVariant()}>{mappingIcon()}</div>
                    <div onClick={() => quickCreateVariant()}>{createIcon()}</div>
                    <div><RefreshIcon /></div>
                </div>
            </div>
            {
                dillStatus ? (
                    <div className="product-mapping-wrapper">
                        <ProductVariantMapping variant={variant}/>
                    </div>
                ) : null
            }
        </div>
    );
}
export default ProductVariant;