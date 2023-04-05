import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@sapo-presentation/sapo-ui-components";
import { useState } from "react";
import '../../style/confirmModal.scss';
import {HomeBoxIcon, TrolleyBoxIcon} from "../../svg/svgIcon";

function ConfirmModal(props) {

    const { closeModal, onSubmit } = props;

    const [type, setType] = useState(1);

    const onSubmitForm = () => {
        onSubmit(type);
        closeModal(false);
    }

    return (
        <Dialog>
            <DialogTitle divider>Xác nhận đơn hàng</DialogTitle>
            <DialogContent>
               <div className="confirm-content">
                   <div className={`tiktok-pick-up ${type === 1 ? 'active' : ''}`} onClick={() => setType(1)}>
                       <div><HomeBoxIcon /></div>
                       <div>
                           <div className="title">Lấy hàng</div>
                           <div>ĐVVC sẽ đến lấy hàng tại kho hàng</div>
                       </div>
                   </div>
                   <div className={`seller-pick-up ${type === 2 ? 'active' : ''}`} onClick={() => setType(2)}>
                       <div><TrolleyBoxIcon /></div>
                       <div>
                           <div className="title">Tự mang hàng ra bưu cục</div>
                           <div>Bạn cần mang hàng ra bưu cục của ĐVVC</div>
                       </div>
                   </div>
               </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => closeModal(false)} variant="outlined" children={'Thoát'} />
                <Button onClick={() => onSubmitForm()} children={'Xác nhận'} />
            </DialogActions>
        </Dialog>
    )

}
export default ConfirmModal;