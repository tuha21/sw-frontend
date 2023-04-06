import React from "react";
import { mappingIcon } from "../../svg/svgIcon";

function TiktokOrderIMappingTab(props) {
    const { tiktokOrder } = props;
    return (
        <div className="tiktok-order-item-tab">
            <div className="tiktok-order-item-item tiktok-order-item-header">
                <div className="tiktok-order-item-product">Sản phẩm trong đơn</div>
                <div className="tiktok-order-item-product">Liên kết sản phẩm</div>
                <div className="tiktok-order-item-quantity">Thao tác</div>
            </div>
            {
                tiktokOrder.tiktok_order_items.map(item => {
                    const vMap = item.variant;
                    return (
                        <div key={item.id} className="tiktok-order-item-item tiktok-order-item-body">
                            <div className="tiktok-order-item-product">
                                <img src={item.image} alt="" />
                                <div className="tiktok-order-item-product-info">
                                    <div className="tiktok-order-item-product-name">
                                        {item.name}
                                    </div>
                                    <div className="tiktok-order-item-product-sku">
                                        SKU: {item.sku}
                                    </div>
                                </div>
                            </div>
                            <div className="tiktok-order-item-product">
                                {
                                    vMap ? (
                                        <React.Fragment>
                                            <img src={vMap.image} alt="" />
                                            <div className="tiktok-order-item-product-info">
                                                <div className="tiktok-order-item-product-name">
                                                    {vMap.name}
                                                </div>
                                                <div className="tiktok-order-item-product-sku">
                                                    SKU: {vMap.sku}
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ) : 'Chưa liên kết'
                                }
                            </div>
                            <div className="tiktok-order-item-quantity">{mappingIcon()}</div>
                        </div>
                    )
                })
            }
            <div className="tiktok-order-item-item tiktok-order-item-footer">
                <div className="tiktok-order-item-amount">Tổng: {tiktokOrder.tiktok_order.total_amount}</div>
            </div>
        </div>
    )
}
export default TiktokOrderIMappingTab;