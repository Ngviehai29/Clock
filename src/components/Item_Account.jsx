import React from 'react'

export const Item_Account = (props) => {
    const editclick = () => {
        props.editFormTrue(); //hiện form
        props.editUser(); // đẩy dữ liệu
    }
    return (
        <tr>
            <td scope="row">{props.stt + 1}</td>
            <td>{props.name}</td>
            <td>{props.tel}</td>
            <td>{props.permission}</td>
            <td>
                <div className="btn-group">
                    <div onClick={() => editclick()} className="btn btn-warning sua"><i className="fa fa-pencil" aria-hidden="true" />Sửa
                    </div>
                    <div onClick={() => props.deleteClick()} className="btn btn-danger xoa"><i className="fa fa-minus" aria-hidden="true" /> Xóa
                    </div>
                </div>
            </td>
        </tr>
    )
}
