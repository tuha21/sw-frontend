import { tiktokIcon } from "../../svg/svgIcon";

function ProductVariantMapping() {

    return (
        <div className="mapping-product">
            <div className="mapping-header">
                <div className="c1">Sản phẩm</div>
                <div className="c2">Mã SKU</div>
                <div className="c3">Giá Bán</div>
                <div className="c4">Tồn kho</div>
            </div>
            <div className="tiktok-info">
                <div className="c1">
                    {tiktokIcon()}
                    &ensp;
                    Bem Store
                </div>
                <div className="c2">GKFZ</div>
                <div className="c3">1,500,000</div>
                <div className="c4">300</div>
            </div>
            <div className="sw-info">
                <div className="c1">
                    {tiktokIcon()}
                    &ensp;
                    Bem Store
                </div>
                <div className="c2">GKFZ</div>
                <div className="c3">1,500,000</div>
                <div className="c4">300</div>
            </div>
        </div>
    )

}
export default ProductVariantMapping;