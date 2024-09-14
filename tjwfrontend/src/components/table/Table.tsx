import React from "react";
import './Table.css'

type TableProps = {
    keys: string[],
    list: any[],
    children: React.ReactNode[],
    actions?: (data: any) => ActionType[]
}

export type ActionType = {
    onClick: () => void
}

const Table = (props: TableProps) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    {
                        props.children.map(header => header)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.list.map((data, index) => {
                        return (
                            <tr key={index}>
                                {
                                    props.keys.map((key, index) => (
                                        <td key={index}>{data[key]}</td>
                                    ))
                                }
                                {
                                    props.actions ?
                                        <td key={'action-btn'}>
                                            <div id="action-buttons" style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                                <div id="update-button" className="icon-button"
                                                onClick={(_e) => props.actions ? props.actions(data)[0].onClick() : null}>
                                                    <i className="fa fa-pencil" />
                                                </div>
                                                <div id="delete-button" className="icon-button"
                                                onClick={(_e) => props.actions ? props.actions(data)[1].onClick() : null}>
                                                    <i className="fa fa-trash" />
                                                </div>
                                            </div>
                                        </td>
                                        : null
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Table;