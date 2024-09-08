import React from "react";
import './Table.css'

type TableProps = {
    keys: string[],
    list: any[],
    children: React.ReactNode[],
    actions: (data : any) => ActionType[]
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
                                    props.keys.map(key => (
                                        <td>{data[key]}</td>
                                    ))
                                }
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        <div className="icon-button" onClick={(_e) => props.actions(data)[0].onClick()}>
                                            <i className="fa fa-pencil" />
                                        </div>
                                        <div className="icon-button" onClick={(_e) => props.actions(data)[1].onClick()}>
                                            <i className="fa fa-trash" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default Table;