import { RefreshIcon } from "@sapo-presentation/sapo-ui-components";
import { useState } from "react";
import { autoMappingIcon, createIcon, drillIcon, manualMappingIcon, mappingIcon } from "../../svg/svgIcon";
import TiktokVariantMapping from "./TiktokVariantMapping";
import { useDispatch } from "react-redux";
import {quickCreate, quickMap, syncProduct, unMap} from "../../apis/tiktokProductApi";
import ManualMapingModal from "../../components/modal/ManualMappingModal";

function TiktokVariant(props) {
    const { variant } = props;

    const [dillStatus, setDrillStatus] = useState(false);
    const [openList, setOpenList] = useState(false);

    const toggleVariant = () => {
        setDrillStatus(!dillStatus)
    }

    const dispatch = useDispatch();

    const quickMapVariant = () => {
        const { id, mapping_id } = variant;
        if (mapping_id === 0) {
            dispatch(quickMap(id));
        } else {
            dispatch(unMap(id))
        }
    }

    const manualMapping = () => {
        alert("pakspkaos")
    }

    const quickCreateVariant = () => {
        const { id } = variant;
        dispatch(quickCreate(id));
    }

    const sync = () => {
        const { channel_product_id } = variant;
        dispatch(syncProduct(channel_product_id));
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
                    {variant.mapping_id ? (
                        <div onClick={() => quickMapVariant()}>{mappingIcon(1)}</div>
                    ) : (
                        <>
                        <div className="mapping-icon" onClick={() => setOpenList(true)}>
                            {manualMappingIcon()}
                            {openList ? <ManualMapingModal setOpenList={setOpenList} tiktokVariantId={variant.id}/> : null}
                        </div>
                        <div onClick={() => quickMapVariant()}>{autoMappingIcon(variant.mapping_id)}</div>
                        </>
                    )}
                    <div onClick={() => quickCreateVariant()}>{createIcon()}</div>
                    {variant.mapping_id ? <div onClick={() => sync()}><RefreshIcon /></div> : null}
                </div>
            </div>
            {
                dillStatus ? (
                    <div className="product-mapping-wrapper">
                        <TiktokVariantMapping variant={variant}/>
                    </div>
                ) : null
            }
        </div>
    );
}
export default TiktokVariant;