import { useState } from "react";
import TikTokOrderDetail from "./TiktokOrderDetail";

const { ArrowChevronBigDownIcon, Chip, CircleCheckOutlineIcon, ExtraPrintIcon, ArrowChevronBigUpIcon } = require("@sapo-presentation/sapo-ui-components");


const getTimeText = (time) => {
    var date = new Date(time * 1000);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

const getStatusLabel = (status) => {
    switch (status) {
        case 140: return 'Đã hủy';
        default: return status;
    }
}
function TikTokOrderItem(props) {
    const { tiktokOrder } = props;
    const [showDetail, setShowDetail] = useState(true);

    return (
        <div key={tiktokOrder.tiktok_order.id} className="tiktok-order-item tiktok-order-list-body">
            <div className="tiktok-order-item-info">
                <div className="tiktok-order-number">
                    <div onClick={() => setShowDetail(!showDetail)}>
                        {showDetail ? <ArrowChevronBigUpIcon /> : <ArrowChevronBigDownIcon />}
                    </div>
                    {tiktokOrder.tiktok_order.order_number}   
                    <Chip variant="success" label="Đã in" />
                </div>
                <div className="tiktok-order-issued-at">
                    {getTimeText(tiktokOrder.tiktok_order.issued_at)}
                </div>
                <div className="tiktok-order-status">
                    {getStatusLabel(tiktokOrder.tiktok_order.order_status)}
                </div>
                <div className="tiktok-order-shipping-carrier">
                    {tiktokOrder.tiktok_order.shipping_carrier}
                </div>
                <div className="tiktok-order-tracking-code">
                    {tiktokOrder.tiktok_order.tracking_code}
                </div>
                <div className="tiktok-order-action">
                    <CircleCheckOutlineIcon />
                    <ExtraPrintIcon />
                </div>
            </div>
            {showDetail ? <TikTokOrderDetail tiktokOrder={tiktokOrder}/> : null}
        </div>
    )
}
export default TikTokOrderItem;