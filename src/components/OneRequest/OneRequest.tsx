import { FC, useEffect, useState } from "react"
import { Table } from "react-bootstrap"

export type Props = {
    phenomens : {
        phenom_id: number;
        phenom_name: string;
        status: string;
        image:string;
        description: string;
        unit: number;
    }[]
}
const TableOneApplication:FC<Props> = ({phenomens}) => {
    const [phenom, setPhenom] = useState(phenomens)

    useEffect(()=>{
        setPhenom(phenomens)
        console.log(phenomens)    
    }
    ,[phenomens])

    return(
        <>
        <Table  className='tableDocs'>
                <thead>
                    <tr >
                        <th style={{ width: '5%' }}>№</th>
                        <th>Название</th>
                        <th>Статус</th>
                        <th>Описание</th>
                        <th>Единицы измерения</th>
                    </tr>
                </thead>
                <tbody>
                    {phenomens.map((item, index) => (
                        <tr key={item.phenom_id}>
                            <td>{++index}</td>
                            <td>{item.phenom_name}</td>
                            <td>{item.description}</td>
                            <td>{item.unit}</td>
                        </tr>
                    ))}
                </tbody>
                
                
            </Table>
            
        </>
    )
}

export default TableOneApplication