import React, { FC } from "react";
import { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import Breadcrumbs, { BreadcrumbLink } from '../breadcrumbs/bread';
import { Button, Card } from 'react-bootstrap'
import './space.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './PhenomCard.css'
import image  from './1.png'
import korzina from '../../assets/korzina.png'
import { phenomens } from '../../mockData'
import { useIsAuth} from '../../store/slices/auth_slices'

const Space: FC = () => {
    const [phenoms, setPhenoms] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [draft, setDraft] = useState(0)
    const auth = useIsAuth()

    useEffect(() => {
        fetch(`/api/phenomens/`)
          .then((response) => response.json())
          .then((jsonData) => {setPhenoms(jsonData.phenomens)
            setDraft(jsonData.draft.request_id)
            console.log(jsonData.draft.request_id)
            console.log(phenoms)})
          .catch((error) => {
            console.log(phenomens)
            setPhenoms(phenomens)
            console.error('Error fetching data:', error)
            });
      }
    ,[]);

    const searchHandler = async () => {
         try {
            const response = await fetch(`/api/phenomens/?value=${searchValue}`);
            const jsonData = await response.json();
            setPhenoms(jsonData.phenomens);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(searchValue)
        searchHandler();
    }

    const breadcrumbsLinks: BreadcrumbLink[] = [
        { label: 'Природные явления', url: '/phenomens/' },
    ];

    const addToDraft = (id: number) => async () => {
        console.log("Добавление")
        let au = localStorage.getItem('auth');
        if (!au) {
            return
        }
        try {
            const response: AxiosResponse = await axios.post(`/api/phenomens/add/${id}/`, { 'value': 0});
            console.log(response.data);
            setDraft(response.data)
            console.log("Добавилось")
        } catch(error) {
            console.error("Error ", error);
        }
    }

    return(
        <div className="space">
            <form>
                <input value={searchValue} placeholder={"Введите название"} onChange={(event) => {setSearchValue(event.target.value)}}/>
                <button className="search-button" type="button" onClick={handleSubmit}>Найти</button>
            </form>
            {auth && <Link to={`/weather_station_frontend/requests/${draft}`}>
                <button className="korzina" disabled={draft==0}>
                </button>
            </Link>}

            <Breadcrumbs links={breadcrumbsLinks} />

            <div className="cards container px-0">
                <div className="row row-cols-4">
                {phenoms.map((item) => (
                    <div className="col">
                    <Card className="phenom-card px-3 py-1 mb-2">
                        <Card.Img className="phenom-image" src={image} height={120} width={198}  />
                        <Card.Body className="py-1 px-0">                
                            <div className="phenom-title ps-1">
                                <Card.Title>{item.phenom_name}</Card.Title>
                            </div>
                            <Button className="card-button me-2 align-self-center" href={"/weather_station_frontend/phenomens/" + item.phenom_id} target="_blank" variant="primary">Подробнее</Button>
                            {auth && <Button variant="btn kor" onClick={addToDraft(item.phenom_id)}>В корзину</Button> }
                        </Card.Body>
                    </Card>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default Space;