import React from 'react';

function TableItem(props) {
    let { instance } = props;

    return (
        <tr>
            <td>{instance.InstanceId}</td>
            <td>{instance.InstanceType}</td>
            <td>{instance.PublicIP}</td>
            <td>{instance.LaunchTime}</td>
        </tr>
    )
}

export default TableItem;