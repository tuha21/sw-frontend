import { useState } from "react";
import { drillIcon } from "../../svg/svgIcon";
import TiktokVariant from "./TiktokVariant";

function TiktokProductItem(props) {

    const [dillStatus, setDrillStatus] = useState(false);

    const toggleVariant = () => {
        setDrillStatus(!dillStatus)
    }

    const { channelProduct } = props;
    const { product, total_mapping } = channelProduct;
    return (
        <div className="product-item">
            <div className="main-product">
                <div className="col-1">
                    <div className="drill-icon" onClick={() => toggleVariant()}>{drillIcon(dillStatus)}</div>
                    <div className="image-product">
                        <img src={product.image ? product.image : 'https://louisville.edu/history/images/noimage.jpg/'} alt="" />
                    </div>
                    <div className="info-product">
                        <div className="product-name">{product.name}</div>
                        <div className="variant-info">{channelProduct.variants.length}&nbsp;phiên bản</div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="mapping-status">{`${total_mapping}/${channelProduct.variants.length}`}</div>
                </div>
                <div className="col-3">
                    
                </div>
                <div className="col-4">
                    
                </div>
            </div>
            {
                dillStatus ? (
                    <div className="product-vatiant-list">
                        {channelProduct?.variants?.map((v, i) => {
                            return <TiktokVariant variant={v} />
                        })}
                    </div>
                ) : null
            }
        </div>
    );
}
export default TiktokProductItem;