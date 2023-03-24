import { Button, PlusCircleIcon, RefreshIcon } from "@sapo-presentation/sapo-ui-components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectShop, getConnections } from "../../apis/settingApi";

function Setting () {

    const connections = useSelector(state => state?.setting?.connections || [])

    const dispatch = useDispatch();

    useEffect(() => {
        fetchConnection()
    }, []);

    const handleConnectShop = () => {
        dispatch(connectShop());
    }

    const fetchConnection = () => {
        dispatch(getConnections());
    }

    const renderConnections = () => {
        return connections.map((c, i) => {
            return (
                <div key={i} className="connection-item-wrapper col-2">
                    <div className="connection-item">
                        <img alt='' src='https://seeklogo.com/images/T/tiktok-logo-F8178CE216-seeklogo.com.png' />
                        <div className="connection-info">
                            <div className="connection-name">{c.name}</div>
                            <div className="connection-shop-id">{c.shop_id}</div>
                        </div>
                        <RefreshIcon />
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="setting">
            <div className="action">
                <Button 
                children='Kết nối gian hàng mới'
                startIcon={<PlusCircleIcon />}
                onClick={() => handleConnectShop()}
                />
            </div>
            <div className="connections row">
                {renderConnections()}
            </div>
        </div>
    )

}

export default Setting;