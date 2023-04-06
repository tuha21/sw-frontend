function TikTokOrderItemTab(props) {
    const { tiktokOrder } = props;
    const { tiktok_order_items, tiktok_order } = tiktokOrder;

    return (
        <div className="tiktok-order-item-tab">
            <div className="tiktok-order-item-item tiktok-order-item-header">
                <div className="tiktok-order-item-product">Sản phẩm</div>
                <div className="tiktok-order-item-quantity">Số lượng</div>
                <div className="tiktok-order-item-price">Giá bán</div>
            </div>
            {
                tiktok_order_items.map(item => {
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
                            <div className="tiktok-order-item-quantity">{item.quantity}</div>
                            <div className="tiktok-order-item-price">{item.price}</div>
                        </div>
                    )
                })
            }
            <div className="tiktok-order-item-item tiktok-order-item-footer">
                <div className="tiktok-order-item-amount">Tổng: {tiktok_order.total_amount}</div>
            </div>
        </div>
    )
}
export default TikTokOrderItemTab;