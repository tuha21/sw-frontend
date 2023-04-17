import {
  Button,
  DatePickerPlus,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@sapo-presentation/sapo-ui-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import SelectConnection from "../SelectConnection";
import "../../style/modal/crawlModal.scss";

function CrawlModal(props) {
  const { closeModal, onSubmit, title, hideTime } = props;

  const connections = useSelector((state) => state?.setting?.connections) || [];
  const [selectedConnections, setSelectConnections] = useState(
    connections?.map((c) => c.id) || []
  );
  const [value, setValue] = useState({
    firstDate: null,
    lastDate: null,
    textTransfer: null,
  });

  const handleChangeSelectedConnection = (connectionIds) => {
    setSelectConnections(connectionIds);
  };

  const onSubmitForm = () => {
    onSubmit(
      selectedConnections,
      Date.parse(value.firstDate) / 1000,
      Date.parse(value.lastDate) / 1000
    );
    closeModal(false);
  };

  return (
    <Dialog>
      <DialogTitle divider>{title}</DialogTitle>
      <DialogContent>
        <div className="select-connection">
          <SelectConnection
            handleChangeSelectedConnection={handleChangeSelectedConnection}
          />
        </div>
        {!hideTime ? (
          <div className="select-time">
            <DatePickerPlus
              placeholder="Chọn thời gian"
              value={value}
              onChange={setValue}
              changeOnSubmit
            />
          </div>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => closeModal(false)}
          variant="outlined"
          children={"Thoát"}
        />
        <Button onClick={() => onSubmitForm()} children={"Cập nhật"} />
      </DialogActions>
    </Dialog>
  );
}
export default CrawlModal;
