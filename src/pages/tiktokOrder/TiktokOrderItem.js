import { useState } from "react";
import TikTokOrderDetail from "./TiktokOrderDetail";

const { ArrowChevronBigDownIcon, Chip, CircleCheckOutlineIcon, ExtraPrintIcon, ArrowChevronBigUpIcon } = require("@sapo-presentation/sapo-ui-components");

function TikTokOrderItem(props) {

    const [showDetail, setShowDetail] = useState(true);

    return (
        <div className="tiktok-order-item tiktok-order-list-body">
            <div className="tiktok-order-item-info">
                <div className="tiktok-order-number">
                    <div onClick={() => setShowDetail(!showDetail)}>
                        {showDetail ? <ArrowChevronBigUpIcon /> : <ArrowChevronBigDownIcon />}
                    </div>
                    VDFHIKU454RGH   
                    <Chip variant="success" label="Đã in" />
                </div>
                <div className="tiktok-order-issued-at">
                    21/12/2023
                </div>
                <div className="tiktok-order-status">
                    Đang xử lý
                </div>
                <div className="tiktok-order-shipping-carrier">
                    Shopee Express Instant
                </div>
                <div className="tiktok-order-tracking-code">
                    VDFHIKU454RGH
                </div>
                <div className="tiktok-order-action">
                    <CircleCheckOutlineIcon />
                    <ExtraPrintIcon />
                </div>
            </div>
            {showDetail ? <TikTokOrderDetail /> : null}
        </div>
    )
}
export default TikTokOrderItem;