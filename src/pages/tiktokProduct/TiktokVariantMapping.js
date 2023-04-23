import { useSelector } from "react-redux";
import { bigUnMappingIcon, tiktokIcon } from "../../svg/svgIcon";
import { useEffect, useState } from "react";
import { getMappingInfo } from "../../apis/tiktokProductApi";
import { LoadingCircularProgress } from "@sapo-presentation/sapo-ui-components";

function TiktokVariantMapping(props) {
    const { variant } = props;
    const connections = useSelector(state => state.setting.connections);

    const getConnectionName = (id) => {
        return connections.filter(c => c.id === id)[0]?.name || 'TikTok Shop';
    }

    const [mappingInfo, setMappingInfo] = useState({});
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true)
        getMappingInfo(variant.id).then(res => {
            setMappingInfo(res?.data?.data)
            setLoading(false)
        })
    }, []);

    if (loading) {
        return  <div className="mapping-loading"><LoadingCircularProgress /></div>
    }

    if (!mappingInfo) {
        return <div className="un-mapping">{bigUnMappingIcon()}</div>;
    }

    const mappingVariant = mappingInfo.variant;
    return (
        mappingVariant == null ? <div className="un-mapping">{bigUnMappingIcon()}</div> : (
            <div className="mapping-product">
                <div className="mapping-header">
                    <div className="c1">Sản phẩm</div>
                    <div className="c2">Mã SKU</div>
                    <div className="c3">Giá Bán</div>
                    <div className="c4">Tồn kho</div>
                </div>
                <div className="tiktok-info">
                    <div className="c1">
                        SaleWork
                    </div>
                    <div className="c2">{mappingVariant.sku}</div>
                    <div className="c3">{mappingVariant.retail_price}</div>
                    <div className="c4">{mappingVariant.available}</div>
                </div>
                <div className="sw-info">
                    <div className="c1">
                        {tiktokIcon()}
                        &ensp;
                        {getConnectionName(variant.connection_id)}
                    </div>
                    <div className="c2">{mappingInfo.sku}</div>
                    <div className="c3">{mappingInfo.price}</div>
                    <div className="c4">{mappingInfo.quantity}</div>
                </div>
            </div>
        )
    )

}
export default TiktokVariantMapping;