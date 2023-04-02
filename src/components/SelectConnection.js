import { useSelector } from "react-redux";

const { Dropdown } = require("@sapo-presentation/sapo-ui-components");
const { useState } = require("react")

function SelectConnection (props) {
    const connections = useSelector(state => state?.setting?.connections) || [];
    const [selecteds, setSelecteds] = useState(connections);
    const { handleChangeSelectedConnection } = props;
    const onClose = () => {
        handleChangeSelectedConnection(selecteds.map(connection => connection.id));
    }
    return (
        <div className="select-connection">
            <Dropdown 
                placeholder="Chọn gian hàng"
                multiple
                value={selecteds}
                onChange={setSelecteds}
                renderOption={e => e.name}
                options={connections}
                highlight={true}
                onClose={onClose}
            />
        </div>
    )
}
export default SelectConnection;