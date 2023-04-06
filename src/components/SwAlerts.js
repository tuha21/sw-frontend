import '../style/modal/swAlert.scss';
import {useSelector} from "react-redux";

function SwAlerts () {

    const alerts = useSelector(state => state.env.alerts)

    return (
        <div className="sw-alerts-wrapper">
            <div className="sw-alerts">
                {
                    alerts.map((alert, index) => {
                        return (
                            <div className={`sw-alert ${alert.type}`} key={index}>{alert.value}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default SwAlerts;