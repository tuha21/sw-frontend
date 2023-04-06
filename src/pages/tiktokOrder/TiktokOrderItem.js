import React, { useState } from "react";
import TikTokOrderDetail from "./TiktokOrderDetail";
import { useDispatch } from "react-redux";
import ConfirmModal from "../../components/modal/ConfirmModal";
import {confirmOrder, printOrder} from "../../apis/tiktokOrderApi";
const { ArrowChevronBigDownIcon, Chip, CircleCheckOutlineIcon, ExtraPrintIcon, ArrowChevronBigUpIcon, Diot3Icon } = require("@sapo-presentation/sapo-ui-components");


const getTimeText = (time) => {
    const date = new Date(time * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    return day + '/' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}

const getStatusLabel = (status) => {
    switch (status) {
        case 100: return 'Chờ thanh toán';
        case 111: return 'Chờ vận chuyển';
        case 112: return 'Chờ giao hàng';
        case 121: return 'Đang giao hàng';
        case 122: return 'Đã giao hàng';
        case 130: return 'Hoàn thành';
        case 140: return 'Đã hủy';
        default: return status;
    }
}

function TikTokOrderItem(props) {
    const { tiktokOrder } = props;
    const { tiktok_order } = tiktokOrder;

    const [showDetail, setShowDetail] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const printOrderTiktok = () => {
        dispatch(printOrder(tiktok_order.id));
    }

    const onSubmitConfirm = (type) => {
        dispatch(confirmOrder(type, tiktok_order.id))
    }

    return (
        <div key={tiktok_order.id} className="tiktok-order-item tiktok-order-list-body">
            {showModal ? <ConfirmModal closeModal={setShowModal} onSubmit={onSubmitConfirm}/> : null}
            <div className="tiktok-order-item-info">
                <div className="tiktok-order-number">
                    <div onClick={() => setShowDetail(!showDetail)}>
                        {showDetail ? <ArrowChevronBigUpIcon /> : <ArrowChevronBigDownIcon />}
                    </div>
                    {tiktok_order.order_number}
                    {tiktok_order.has_print ? <Chip variant="success" label="Đã in" /> : null}
                </div>
                <div className="tiktok-order-issued-at">
                    {getTimeText(tiktok_order.issued_at)}
                </div>
                <div className="tiktok-order-status">
                    {getStatusLabel(tiktok_order.order_status)}
                </div>
                <div className="tiktok-order-shipping-carrier">
                    {tiktok_order.shipping_carrier}
                </div>
                <div className="tiktok-order-tracking-code">
                    {tiktok_order.tracking_code}
                </div>
                <div className={`tiktok-order-payment ${tiktok_order.payment_method ? "active" : ""}`}>
                    <Diot3Icon />
                </div>
                <div className="tiktok-order-action">
                    <CircleCheckOutlineIcon onClick={() => setShowModal(true)}/>
                    <ExtraPrintIcon onClick={() => printOrderTiktok()} />
                </div>
            </div>
            {showDetail ? <TikTokOrderDetail tiktokOrder={tiktokOrder}/> : null}
        </div>
    )
}
export default TikTokOrderItem;