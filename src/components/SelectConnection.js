import { useSelector } from "react-redux";

const { Dropdown } = require("@sapo-presentation/sapo-ui-components");
const { useState } = require("react")

function SelectConnection (props) {
    const connections = useSelector(state => state?.setting?.connections) || [];
    const [selects, setSelects] = useState(connections);
    const { handleChangeSelectedConnection } = props;
    const onClose = () => {
        handleChangeSelectedConnection(selects.map(connection => connection.id));
    }
    return (
        <div className="select-connection">
            <Dropdown 
                placeholder="Chọn gian hàng"
                multiple
                value={selects}
                onChange={setSelects}
                renderOption={e => e.name}
                options={connections}
                highlight={true}
                onClose={onClose}
            />
        </div>
    )
}
export default SelectConnection;