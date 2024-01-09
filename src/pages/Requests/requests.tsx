import { format } from 'date-fns';
import Cookies from 'js-cookie';
import Breadcrumbs, { BreadcrumbLink } from '../../components/breadcrumbs/bread';

import axios, { AxiosResponse } from 'axios';
import { useState,  useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useIsAdmin, useIsAuth } from '../../store/slices/auth_slices'
import { setStatus, setStartDate, setEndDate, resetFilters, setUser } from '../../store/slices/search_slice'
import { AppDispatch, RootState } from "../../store/store"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoadAnimation from '../../components/LoadAnimation';

import { Link } from 'react-router-dom';
//import { useNavigate } from "react-router-dom"
import { Navbar, Form, Button, Table, InputGroup } from 'react-bootstrap';
import './requests.css'
import { ru } from 'date-fns/locale';

interface Request {
    request_id: number
    user: string
    request_data: string
    status: string
    create_date: string
    approve_date: string | null
    end_date: string | null
    moderator: string | null
    temperature: number | null
}

const RequestsPage = () => {
    const [requests, setRequests] = useState<Request[]>([])
    const [us, setUs] = useState<string>('Имя и фамилия')
    const status = useSelector((state: RootState) => state.requestFilter.status);
    const startDate = useSelector((state: RootState) => state.requestFilter.startDate);
    const endDate = useSelector((state: RootState) => state.requestFilter.endDate);
    const user = useSelector((state: RootState) => state.requestFilter.user);
    const admin = useIsAdmin()
    const dispatch = useDispatch();
    const token = Cookies.get('session_id');
    const [loaded, setLoaded] = useState(false)

    const getData = async() => {
        try{
            setLoaded(false);
            const response: AxiosResponse = await axios.get(`/api/requests/`, { 
                params: {
                    ...(status && { status: status }),
                    ...(startDate && {
                        start_date: format(new Date(startDate), 'yyyy-MM-dd HH:mm'),
                    }),
                    ...(endDate && {
                        end_date: format(new Date(endDate), 'yyyy-MM-dd HH:mm'),
                    }),
                },
                headers: {'Cookie': `session_id=${token}`},
            });
            response.data.forEach((req: Request) => {
                req.create_date = (new Date(req.create_date)).toISOString().replace("T", " ").replace("Z", "").substring(0, 16);
                req.approve_date = req.approve_date
                    ? (new Date(req.create_date)).toISOString().replace("T", " ").replace("Z", "").substring(0, 16)
                    : null;
                req.end_date = req.end_date
                    ? (new Date(req.create_date)).toISOString().replace("T", " ").replace("Z", "").substring(0, 16)
                    : null;
            });
            setRequests(response.data)
            setLoaded(true);
            console.log(requests)
        } catch(error) {
            console.log('Ошибка при получении заявок',error);
        }
    };

    useEffect(() => {
        getData()
        const intervalId = setInterval(async () => {
            getData()
        }, 7000);
        return () => clearInterval(intervalId);
    }, []);

    const handleSearch = (event: React.FormEvent<any>) => {
        event.preventDefault();
        getData();
    }

    const handleInputChange = () => {
        dispatch(setUser(us));

        const filteredRequests = requests.filter((request) => request.user === us);
        setRequests(filteredRequests);
    };

    const breadcrumbsLinks: BreadcrumbLink[] = [
        { label: 'Заявки', url: '/requests/' },
    ];

    return (
        <div className="requests">
            <Breadcrumbs links={breadcrumbsLinks}/>
            <Navbar>
                <Form className="d-flex flex-row align-items-stretch flex-grow-1 gap-2">
                    {admin && (<>
                    <InputGroup >
                        <Form.Control
                            type="user"
                            placeholder={us}
                            onChange={((event) => setUs(event.target.value))}
                        />
                        <Button onClick={handleInputChange}>Поиск</Button>
                    </InputGroup> </>)}
                    <InputGroup size='sm' className='shadow-sm'>
                        <InputGroup.Text>Статус</InputGroup.Text>
                        <Form.Select
                            defaultValue={status}
                            onChange={(status) => dispatch(setStatus(status.target.value))}>
                            <option value="">Любой</option>
                            <option value="Сформирован">Сформирован</option>
                            <option value="Завершен">Завершен</option>
                            <option value="Отклонен">Отклонен</option>
                        </Form.Select>
                    </InputGroup>
                    <div>
                        <DatePicker
                        selected={startDate ? new Date(startDate) : null}
                        onChange={(date: Date) => dispatch(setStartDate(date ? date.toISOString() : null))}
                        isClearable
                        locale={ru}
                        maxDate={endDate ? new Date(endDate) : null}
                        placeholderText='Дата начала'
                        />
                        <DatePicker
                        selected={endDate ? new Date(endDate) : null}
                        onChange={(date: Date) => dispatch(setEndDate(date ? date.toISOString() : null))}
                        minDate={new Date(startDate)}
                        isClearable
                        placeholderText='Дата окончания'
                        locale={ru}
                        />
                    </div>
                    <Button variant="primary"
                        size="sm"
                        type="button"
                        className="shadow-lg" onClick={handleSearch}>
                        Поиск
                    </Button>
                </Form>
                
            </Navbar>
            < LoadAnimation loaded={loaded}>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th className='text-center'>№</th>
                            {admin && <th className='text-center'>Создатель</th>}
                            <th className='text-center'>Статус</th>
                            <th className='text-center'>Дата наблюдения</th>
                            <th className='text-center'>Дата создания</th>
                            <th className='text-center'>Дата формирования</th>
                            <th className='text-center'>Дата завершения</th>
                            <th className='text-center'>Температура</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req, index) => (
                            <tr key={req.request_id} className='table-row'>
                                <td className='text-center'><Link to={`/weather_station_frontend/requests/${req.request_id}`}>{++index}</Link></td>
                                {admin && <td className='text-center'>{req.user}</td>}
                                <td className='text-center'>{req.status}</td>
                                <td className='text-center'>{req.request_data}</td>
                                <td className='text-center'>{req.create_date}</td>
                                <td className='text-center'>{req.approve_date}</td>
                                <td className='text-center'>{req.end_date}</td>
                                <td className='text-center'>{req.temperature}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </LoadAnimation>
        </div>
    )
}

export default RequestsPage
