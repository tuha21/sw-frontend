function TikTokOrderItemTab (props) {
    return (
        <div className="tiktok-order-item-tab">
            <div className="tiktok-order-item-item tiktok-order-item-header">
                <div className="tiktok-order-item-product">Sản phẩm</div>
                <div className="tiktok-order-item-quantity">Số lượng</div>
                <div className="tiktok-order-item-price">Giá bán</div>
            </div>
            <div className="tiktok-order-item-item tiktok-order-item-body">
                <div className="tiktok-order-item-product">
                    <img src="https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/e7e5e0aa95784d2f8335cda3fd58595d~tplv-o3syd03w52-origin-jpeg.jpeg?" alt=""/>
                    <div className="tiktok-order-item-product-info">
                        <div className="tiktok-order-item-product-name">
                            Túi đeo chéo nữ dáng thuyền loại 1
                        </div>
                        <div className="tiktok-order-item-product-sku">
                            SKU: 0829
                        </div>
                    </div>
                </div>
                <div className="tiktok-order-item-quantity">2</div>
                <div className="tiktok-order-item-price">100,000</div>
            </div>
            <div className="tiktok-order-item-item tiktok-order-item-footer">
                <div className="tiktok-order-item-amount">Tổng: 200,000</div>
            </div>
        </div>
    )
}
export default TikTokOrderItemTab;