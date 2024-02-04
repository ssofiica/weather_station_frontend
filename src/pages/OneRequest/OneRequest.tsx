import axios from "axios"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useIsAdmin, useIsAuth } from '../../store/slices/auth_slices'

import {  useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { useParams, useNavigate } from "react-router-dom"
import { Navbar, Form, Button, Table, InputGroup} from 'react-bootstrap';
import Breadcrumbs, { BreadcrumbLink } from '../../components/breadcrumbs/bread';
import './onerequest.css';

interface Phenomen{
    description: string
    image: string | null
    phenom_id: number
    phenom_name: string
    status: string
    unit: string
    value: number
}

interface Request{
    request_id: number
    user: string
    request_data: string
    status: string
    create_date: string
    approve_date: string | null
    end_date: string | null
    moderator: string | null
    phenomens: any[]
}

const OneRequestPage = () => {
    const [phenomens, setPhenomens] = useState<Phenomen[]>([])
    const [save, setSave] = useState<number[]>([])
    const [pvalue, setPvalue] = useState(0)
    const [req, setReq] = useState<Request>({request_id: 0, user: '', request_data: '', status: '', create_date: '',
        approve_date: '',
        end_date: '',
        moderator: '',
        phenomens: []})
    const {id} = useParams()
    const admin = useIsAdmin()
    const token = Cookies.get('session_id');
    const navigate = useNavigate()

    const getPhenomens = async () => {
        try {
            const resp = await axios.get(`/api/requests/${id}/`, {headers: {'Cookie': `session_id=${token}`}})
            console.log((req.create_date).toString().replace("T", " ").replace("Z", "").substring(0, 16))
            setPhenomens(resp.data.phenomens)
            setReq(resp.data)
            
        } catch (error) {
            console.log("Ошибка в получении заявки", error)
        }
    }

    useEffect(() => {
        getPhenomens()
    },[])

    const deleteRecord = (phenom: number) => async() => {
        try {
            const resp = await axios.delete(`/api/phenom_record/delete/${phenom}/${id}/`, {headers: {'Cookie': `session_id=${token}`}})
            setPhenomens(phenomens.filter(item => item.phenom_id !== phenom));
        } catch (error) {
            console.log("Ошибка в получении заявки", error)
        }
    }

    const updateRecord = (phenom: number) => async() => {
        try {
            const resp = await axios.put(`/api/phenom_record/edit_value/${phenom}/${id}/`, {
                headers: {'Cookie': `session_id=${token}`},
                pvalue
            })
            setSave(save.filter(item => item !== phenom));
            getPhenomens()
        } catch (error) {
            console.log("Ошибка в получении заявки", error)
        }
    }

    const creatorStatus = (status: string) => async() => {
        try {
            const resp = await axios.put(`/api/requests/${req.request_id}/creator_change_status/`, {
                headers: {'Cookie': `session_id=${token}`},
                status
            })
            if (status==='Удален'){
                navigate('/weather_station_frontend/phenomens/');
            } else {
                setSave([])
                getPhenomens()
            }
        } catch (error) {
            console.log("Ошибка в получении заявки", error)
        }
    }

    const adminStatus = (status: string) => async() => {
        try {
            const resp = await axios.put(`/api/requests/${req.request_id}/moderator_change_status/`, {
                headers: {'Cookie': `session_id=${token}`},
                status
            })

            getPhenomens()
        } catch (error) {
            console.log("Ошибка в получении заявки", error)
        }
    }

    const breadcrumbsLinks: BreadcrumbLink[] = [
        { label: 'Наблюдения', url: '/requests/' },
        { label: `${req.request_data}` || '', url: `/requests/${id}` },
    ];

    return(
        <>
        <div className="m"><Breadcrumbs links={breadcrumbsLinks}/></div>
        <div className="request">
            <h5 className="title">Наблюдение</h5>
            <Table className='request-data'>
                <thead>
                    <tr>
                        <th>Статус</th>
                        <th>Дата наблюдения</th>
                        <th>Дата создания</th>
                        {req.status==='Сформирован' &&
                            <th>Дата формирования</th>}
                        {req.status==='Завершен' && (<>
                            <th>Дата формирования</th>
                            <th>Дата завершения</th></> )}
                        {admin && (     
                            <th>Создатель</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{req.status}</td>
                        
                        <td>
                            {req.status==='Черновик' ? (<>
                            <InputGroup className="">
                                <Form.Control
                                    placeholder={req.request_data}
                                />
                            </InputGroup></>) :
                            req.request_data
                            }
                        </td>
                        <td>{(req.create_date).toString().replace("T", " ").replace("Z", "").substring(0, 16)}</td>
                        {req.status==='Сформирован' && 
                            <td>{req.approve_date ? (new Date(req.approve_date)).toISOString().replace("T", " ").replace("Z", "").substring(0, 16) : null}</td>
                        }
                        {req.status==='Завершен' && (<>
                            <td>{req.approve_date ? (new Date(req.approve_date)).toISOString().replace("T", " ").replace("Z", "").substring(0, 16) : null}</td>
                            <td>{req.end_date ? (new Date(req.end_date)).toISOString().replace("T", " ").replace("Z", "").substring(0, 16): null}</td>
                        </>)}
                        {admin && ( <>    
                            <td>{req.user}</td>
                        </>
                        )}
                    </tr>
                </tbody>
            </Table>
            <Table className='phenoms'>
                <thead>
                    <tr >
                        <th>Явление</th>
                        <th>Показатель</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {phenomens.map((item, index) => (
                        <tr key={item.phenom_id}>
                            <td>{item.phenom_name}</td>
                            <td>
                            {admin ? (item.value).toString() : (
                            <InputGroup className="">
                                <Form.Control
                                    onChange={(event) => {
                                        setSave((save)=> [...save, item.phenom_id]);
                                        setPvalue(parseFloat(event.target.value)); 
                                    }}
                                    placeholder={(item.value).toString()}
                                />
                                <InputGroup.Text>{item.unit}</InputGroup.Text>
                            </InputGroup>
                            )
                            }
                            </td>
                            <td>
                                {req.status==='Черновик' && <Button className="danger-button" onClick={deleteRecord(item.phenom_id)}>Удалить</Button>}
                                {save.includes(item.phenom_id) &&
                                    <Button className="dark-button" onClick={updateRecord(item.phenom_id)}>
                                        Сохранить</Button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {admin && req.status==='Сформирован' &&(
                <div className="btn-group">
                <Button className="dark-button" onClick={adminStatus('Завершен')}>Завершить</Button>
                <Button className="danger-button" onClick={adminStatus('Отклонен ')}>Отклонить</Button>
                </div>)}
            {!admin && req.status=='Черновик' && (
                <div className="btn-group">
                <Button className="dark-button w-100" onClick={creatorStatus('Сформирован')}>Сформировать</Button>
                <Button className="danger-button m" onClick={creatorStatus('Удален')}>Удалить</Button>
                </div>
                )
            }
            
        </div>
        </>
    )
}

export default OneRequestPage