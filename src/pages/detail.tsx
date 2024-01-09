import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import image from '../components/body/1.png'
import './detail.css'
import Breadcrumbs, { BreadcrumbLink } from '../components/breadcrumbs/bread';
import { phenomens } from '../mockData'

interface Phenom {
  phenom_name: string;
  phenom_id: number;
  image: string;
  unit: string;
  description: string;
}


const DetailsPage: FC = () => {
    const {id} = useParams()
    const [phenom, setPhenom] = useState<Phenom>({phenom_name: '', phenom_id: 0, image: '', unit: '', description: ''});
    useEffect(() => {
        fetch(`/api/phenomens/${id}/`)
          .then((response) => response.json())
          .then((jsonData) => {setPhenom(jsonData)
            console.log(jsonData)
            console.log(phenom)})
          .catch((error) => {
            if (typeof id === 'string') {
              console.log(phenomens[parseInt(id)]);
              setPhenom(phenomens[parseInt(id)]);
            } else {
              console.log('id is undefined');
            }
            console.error('Error fetching data:', error)
            });;
      }, []);

      const breadcrumbsLinks: BreadcrumbLink[] = [
        { label: 'Природные явления', url: '/phenomens.' },
        { label: phenom.phenom_name || '', url: `/phenomens/${id}` },
      ];

    return(
    <div className="detail-space">
        <Breadcrumbs links={breadcrumbsLinks} />
        <div className="back-btn my-2 ms-1">
            <a href="/weather_station_frontend/phenomens">Назад</a>
        </div>
        <div className="d-card">
            <div className="im"><img className="d-image" src={image} alt=""/></div>
            <span className="text">
                <p>{phenom.phenom_name}</p>
                <h5>{phenom.description }</h5>
                <h5>Единицы измерения: {phenom.unit}</h5>
            </span>    
        </div>
    </div>    
    )
}
export default DetailsPage