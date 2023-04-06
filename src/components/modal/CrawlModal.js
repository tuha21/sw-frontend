import { Button, DatePickerPlus, Dialog, DialogActions, DialogContent, DialogTitle } from "@sapo-presentation/sapo-ui-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import SelectConnection from "../SelectConnection";
import '../../style/modal/crawlModal.scss';

function CrawlModal(props) {

    const { closeModal, onSubmit } = props;

    const connections = useSelector(state => state?.setting?.connections) || [];
    const [selectedConnections, setSelectConnections] = useState(connections?.map(c => c.id) || []);
    const [value, setValue] = useState({
        firstDate: null,
        lastDate: null,
        textTransfer: null,
    });


    const handleChangeSelectedConnection = (connectionIds) => {
        setSelectConnections(connectionIds);
    }

    const onSubmitForm = () => {
        onSubmit(selectedConnections, Date.parse(value.firstDate) / 1000, Date.parse(value.lastDate) / 1000);
        closeModal(false);
    }

    return (
        <Dialog>
            <DialogTitle divider>Cập nhật dữ liệu sản phẩm</DialogTitle>
            <DialogContent>
                <div className="select-connection">
                    <SelectConnection
                        handleChangeSelectedConnection={handleChangeSelectedConnection}
                    />
                </div>
                <div className="select-time">
                    <DatePickerPlus
                        placeholder="Chọn thời gian cập nhật"
                        value={value}
                        onChange={setValue}
                        changeOnSubmit
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => closeModal(false)} variant="outlined" children={'Thoát'} />
                <Button onClick={() => onSubmitForm()} children={'Cập nhật'} />
            </DialogActions>
        </Dialog>
    )

}
export default CrawlModal;