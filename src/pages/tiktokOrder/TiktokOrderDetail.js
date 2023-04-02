import { useState } from "react"
import TikTokOrderItemTab from "./TiktokOrderItemTab";
import '../../style/tiktokOrderDetail.scss';

const tabs = [
    {id: 1, label: 'Sản phẩm trong đơn'},
    {id: 2, label: 'Lịch sử giao hàng'}
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