import { Button, PlusCircleIcon, RefreshIcon } from "@sapo-presentation/sapo-ui-components";
import React, { useState,useEffect } from "react";
import { connectShop, getConnections } from "../../apis/settingApi";
import { tiktokIcon } from "../../svg/svgIcon";

function Setting () {
    const [connections, setConnections] = useState([]);


    useEffect(() => {
        fetchConnection()
    }, []);

    const handleConnectShop = () => {
        connectShop();
    }

    const fetchConnection = () => {
        getConnections().then(data => {
            setConnections(data);
        });
    }

    const renderConnections = () => {
        return connections.map(c => {
            return (
                <div className="connection-item-wrapper col-2">
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