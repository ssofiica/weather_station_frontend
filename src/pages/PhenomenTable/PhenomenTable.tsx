import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../store/slices/search_phenom_slice'
import { AppDispatch, RootState } from "../../store/store"
import { useNavigate } from "react-router-dom"
import { Navbar, Form, Button, Table, InputGroup} from 'react-bootstrap';
import Breadcrumbs, { BreadcrumbLink } from '../../components/breadcrumbs/bread';
import './style.css'

import LoadAnimation from '../../components/LoadAnimation';

interface Phenomen{
    description: string
    image: string | null
    phenom_id: number
    phenom_name: string
    status: string
    unit: string
}

const PhenomenTable = () => {
    const searchName = useSelector((state: RootState) => state.phenomFilter.name);
    const [phenomens, setPhenomens] = useState<Phenomen[]>([])
    const [loaded, setLoaded] = useState<Boolean>(false)
    const dispatch = useDispatch();
    const token = Cookies.get('session_id');

    const getPhenomens = async () => {
        try {
            const resp = await axios.get(`/api/phenomens/?value=${searchName}`, {headers: {'Cookie': `session_id=${token}`}})
            console.log(resp.data.phenomens)
            setPhenomens(resp.data.phenomens)
        } catch (error) {
            console.log("Ошибка в получении явлений", error)
        }
    }

    const handleSearch = (event: React.FormEvent<any>) => {
        event.preventDefault();
        setPhenomens([])
        getPhenomens();
    }

    useEffect(() => {
        setLoaded(false);
        const get = async () =>{
            try {
                const resp = await axios.get(`/api/phenomens/`, {headers: {'Cookie': `session_id=${token}`}})
                console.log(resp.data.phenomens)
                setPhenomens(resp.data.phenomens)
            } catch (error) {
                console.log("Ошибка в получении явлений", error)
            }
        }
        get()
        setLoaded(true);
    }, []);

    const breadcrumbsLinks: BreadcrumbLink[] = [
        { label: 'Редактирование природных явлений', url: '' }
    ];

    const deletePhenom = (id: number) => async() => {
        try {
            const resp = await axios.delete(`/api/phenomens/${id}/`, {headers: {'Cookie': `session_id=${token}`}})
            console.log(resp.data)
            if (resp.data = 'ОК'){
                setPhenomens(phenomens.filter(item => item.phenom_id !== id));
            }
        } catch (error) {
            console.log("Ошибка в получении явлений", error)
        }
    }

    return (
        <LoadAnimation loaded={loaded}>
        <div className="m"><Breadcrumbs links={breadcrumbsLinks}/></div>
        <div className="fon">
            <h4 className="title">Природные явления</h4>
            <Navbar>
                <Form className="d-flex flex-row flex-grow-1 gap-2">
                    <Form.Control
                        type="text"
                        placeholder="Поиск"
                        className="form-control-sm flex-grow-1 shadow"
                        value={searchName}
                        onChange={(e) => dispatch(setName(e.target.value))}
                    />
                    <Button 
                        variant="primary"
                        size="sm"
                        type="button"
                        className="shadow-lg"
                        onClick={handleSearch}>
                        Поиск
                    </Button>
                    <Link to={`/weather_station_frontend/phenomens/edit/${0}/`} className='btn btn-sm btn-dark ms-sm-2'>Создать</Link>
                </Form>
            </Navbar>
            {/* < LoadAnimation loaded={containers.length > 0}> */}
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th className='text-center'>Название</th>
                            <th className='text-center'>Описание</th>
                            <th className='text-center'>Статус</th>
                            <th className='text-center'>Единицы измерениц</th>
                            <th className=''></th>
                        </tr>
                    </thead>
                    <tbody>
                        {phenomens.map((phenom) => (
                            <tr key={phenom.phenom_id}>
                                <td className='text-center'>{phenom.phenom_name}</td>
                                <td className='text-center'>{phenom.description}</td>
                                <td className='text-center'>{phenom.status}</td>
                                <td className='text-center'>{phenom.unit}</td>
                                <td className='text-center align-middle p-0'>
                                    <Table className='m-0'>
                                        <tbody>
                                            <tr>
                                                <td className='py-1 border-0'>
                                                    <Link to={`/weather_station_frontend/phenomens/edit/${phenom.phenom_id}`}
                                                        className='btn btn-sm btn-outline-secondary text-decoration-none w-100' >
                                                        Редактировать
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='py-1 border-0'>
                                                    <Button
                                                        variant='outline-danger'
                                                        size='sm'
                                                        className='w-100'
                                                        onClick={deletePhenom(phenom.phenom_id)}>
                                                        Удалить
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            {/* </LoadAnimation > */}
        </div>
        </LoadAnimation>
    )
}

export default PhenomenTable