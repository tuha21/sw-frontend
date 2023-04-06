import { useEffect, useState } from "react";
import { getOrderHistories } from "../../apis/tiktokOrderApi";
import { Diot3Icon } from "@sapo-presentation/sapo-ui-components";


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
function TiktokOrderHistotyTab (props) {

    const { orderId } = props;

    const [histories, setHistories] = useState([]);

    useEffect(() => {
        getOrderHistories(orderId).then(res => {
            setHistories(res);
        });
    }, []);

    return (
        <div className="order-history-wrapper">
            {
                histories?.map(item => {
                    return (
                        <div className="order-history-item">
                            <Diot3Icon />
                            <div className="time">{getTimeText(item.update_time / 1000)}</div>
                            <div className="action">{item.description}</div>
                        </div>
                    )
                })
            }
        </div>
    )

}
export default TiktokOrderHistotyTab;