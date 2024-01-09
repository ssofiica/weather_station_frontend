import { FC } from "react";
import { Table } from "react-bootstrap";
import './requests.css';
import { useNavigate } from "react-router-dom";


export type Props = {
    requests : {
        request_id: number;
        user: string;
        request_data: string;
        status: string;
        create_date: string;
        approve_date: string;
        end_date: string;
        moderator: string;
        temperature: number;
    }[]
};

const TableApplications:FC<Props> = ({requests}) => {
    const navigate = useNavigate()
    const toApp = (id: number) =>{
        console.log(requests)
        navigate(`/weather_station_frontend/requests/${id}`)
    }

    return(
        <Table className="table">
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>№</th>
                            <th>Статус</th>
                            <th>Создатель</th>
                            <th>Дата наблюдения</th>
                            <th>Дата создания</th>
                            <th>Дата формирования</th>
                            <th>Дата завершения</th>
                            <th>Температура</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map && requests.map((item, index) => (
                            <tr key={item.request_id} className="table-row" onClick={()=>toApp(item.request_id)}>
                                <td>{++index}</td>
                                <td>{item.status}</td>
                                <td>{item.user}</td>

                                <td>{item.request_data.split('T')[0]}</td>
                                <td>{item.create_date === null ? '-' : item.create_date.split('T')[0]}</td>
                                <td>{item.approve_date === null ? '-' : item.approve_date.split('T')[0]}</td>
                                <td>{item.end_date === null ? '-' : item.end_date.split('T')[0]}</td>
                                
                                <td>{item.temperature ===null ? '-': item.temperature}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
    )
}

export default TableApplications
