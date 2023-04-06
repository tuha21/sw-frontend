import { useState } from "react"
import TikTokOrderItemTab from "./TiktokOrderItemTab";
import '../../style/tiktokOrder/tiktokOrderDetail.scss';
import TiktokOrderIMappingTab from "./TiktokOrderIMappingTab";
import TiktokOrderHistotyTab from "./TiktokOrderHistoryTab";

const tabs = [
    {id: 1, label: 'Sản phẩm trong đơn'},
    {id: 2, label: 'Liên kết sản phẩm'},
    {id: 3, label: 'Lịch sử giao hàng'}
]
function TikTokOrderDetail (props) {
    const { tiktokOrder } = props;

    const [tab, setTab] = useState(1);

    const renderTabLabels = () => {
        return tabs.map(tabItem => {
            return (
                <div key={tabItem.id} 
                    className={`tiktok-order-detail-tab-label ${tabItem.id === tab ? 'active' : ''}`}
                    onClick={() => setTab(tabItem.id)}
                >
                    {tabItem.label}
                </div>
            )
        })
    }

    const renderTabContent = () => {
        switch(tab) {
            case 1: 
                return (
                    <TikTokOrderItemTab tiktokOrder={tiktokOrder}/>
                )
            case 2:
                return (
                    <TiktokOrderIMappingTab tiktokOrder={tiktokOrder}/>
                )
            case 3:
                return (
                    <TiktokOrderHistotyTab orderId={tiktokOrder.tiktok_order.id}/>
                )
            default: return null;
        }
    }

    return (
        <div className="tiktok-order-detail-wrapper">
            <div className="tiktok-order-detail-tab-labels">
                {renderTabLabels()}
            </div>
            {renderTabContent()}
        </div>
    )
}

export default TikTokOrderDetail;