import React, { useEffect, useState, ChangeEvent, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { Card, Row, Navbar, FloatingLabel, InputGroup, Form, Button } from 'react-bootstrap';
import image  from '../../components/body/1.png'

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

const PhenomenEdit = () => {
    let { id } = useParams()
    const [phenomen, setPhenomen] = useState<Phenomen>({phenom_id: 0, image: '', phenom_name: '', status: 'Действует', unit: '', description: ''})
    const [loaded, setLoaded] = useState<Boolean>(false)
    const [uploadimage, setUploadimage] = useState<File | null>(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [edit, setEdit] = useState<boolean>(true)
    const token = Cookies.get('session_id');


    // There is no god beyond that
    useEffect(() => {
        const getData = async () => {
            setLoaded(false);
            let data: Phenomen;
            let name: string;
            try {
                if (id == '0') {
                    data = {
                        phenom_id: 0,
                        description: '',
                        phenom_name: '',
                        status: 'Действует',
                        unit: '',
                        image: ''
                    }
                    name = 'Новое явление'
                    setEdit(true)
                } else {
                    const resp = await axios.get(`/api/phenomens/${id}/`, {headers: {'Cookie': `session_id=${token}`}})
                    console.log(resp.data.phenom_name)
                    name = resp.data.phenom_name ? resp.data.phenom_name : ''
                    data = resp.data  
                }
                setPhenomen(data);
            } finally {
                setLoaded(true);
            }
        }
        getData();

    }, [dispatch]);

    const changeString = (e: ChangeEvent<HTMLInputElement>) => {
        setPhenomen(phenomen => ({ ...phenomen, [e.target.id]: e.target.value }))
    }

    const image = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("начинаем картинку менять")
        if (event.target.files && event.target.files.length > 0) {
            setUploadimage(event.target.files[0]);
            console.log("картинку установили")
        }
    }

    const save = async () => {
        setEdit(false);
        if (uploadimage){
            console.log("картинку сейчас отправим")
            const formData = new FormData();
            formData.append('file', uploadimage);
            const resp = await axios.post(`/api/phenomens/add_image/${id}/`, formData)
            console.log(resp.data)
            navigate('/weather_station_frontend/phenomens/');
        }
        else {console.log(`проблемы с загрузкой фотки ${uploadimage}`)}
        // if (id == '0') {
        //     const resp = await axios.post(`/api/phenomens/`, phenomen, { headers: { 'Cookie': `session_id=${token}`, } })
        //     console.log(resp.data)
        //     setPhenomen(resp.data)
        // } else {
        //     const resp = await axios.put(`/api/phenomens/${phenomen.phenom_id}/`, phenomen, { headers: { 'Cookie': `session_id=${token}`, } })
        //     console.log(resp.data)
        //     setPhenomen(resp.data)
        // }
    }

    const get = async () =>{
        const resp = await axios.get(`/api/phenomens/${id}/`, {headers: {'Cookie': `session_id=${token}`}})
        setPhenomen(resp.data)
    }

    const cancel = () => {
        setEdit(false)
        get();
        navigate('/weather_station_frontend/phenomens/edit/');
    }
    const breadcrumbsLinks: BreadcrumbLink[] = [
        { label: 'Редактирование природных явлений', url: '' },
        { label: `${phenomen.phenom_name}` || '', url: `` },
    ];

    return (
        <LoadAnimation loaded={loaded}>
                <>
                    <div className='m'><Breadcrumbs links={breadcrumbsLinks}/></div>
                    <div className='fin mb-3'>
                        <Row className='m-0'>
                                <Form noValidate validated={edit}>
                                    <Card.Body className='flex-grow-1'>
                                        <InputGroup hasValidation className='mb-1'>
                                            <InputGroup.Text className='c-input-group-text'>Название</InputGroup.Text>
                                            <Form.Control id='phenom_name' required type='text' value={phenomen.phenom_name} readOnly={!edit} onChange={changeString} />
                                        </InputGroup>
                                        <FloatingLabel
                                            label="Описание"
                                            className="mb-3">
                                            <Form.Control
                                                id='description'
                                                value={phenomen.description}
                                                as="textarea"
                                                className='h-25'
                                                readOnly={!edit}
                                                required
                                                onChange={changeString} />
                                        </FloatingLabel>
                                        <InputGroup className='mb-1'>
                                            <InputGroup.Text className='c-input-group-text'>Единицы измерения</InputGroup.Text>
                                            <Form.Control id='unit' required value={phenomen.unit} readOnly={!edit} onChange={changeString} />
                                        </InputGroup>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Label>Выберите картинку</Form.Label>
                                            <Form.Control type="file" onChange={image}/>
                                        </Form.Group>
                                    </Card.Body>
                                    {edit && (
                                        <div className="btn-group">
                                        <Button className="dark-button" variant='primary' type='button' onClick={save}>Сохранить</Button>
                                        {id != '0' && <Button className="danger-button" onClick={cancel}>Отменить</Button>}
                                        </div>
                                        )}
                                </Form>
                        
                        </Row>
                    </div>
                </ >
        </LoadAnimation>
    )
}

export default PhenomenEdit