import React from "react";
import { connectShop } from "../../apis/settingApi";
import { tiktokIcon } from "../../svg/svgIcon";

function Setting () {

    const handleConnecShop = () => {
        connectShop();
    }

    return (
        <div className="setting">
            <button onClick={() => handleConnecShop()}>Kết nối gian hàng mới</button>
            <div className="connection-item">
                <div>{tiktokIcon()}</div>
            </div>
        </div>
    )

}

export default Setting;