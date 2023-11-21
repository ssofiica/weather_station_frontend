import { FC } from "react";
import { useEffect } from "react";
import { Button, Card } from 'react-bootstrap'
import './PhenomCard.css'
import image  from './1.png'

interface Props {
    data: {
        phenom_name: string;
        phenom_id: number;
        image: string;
        unit: string;
        description: string;
      };
}

const PhenomCard: FC<Props> = (props) => {
    useEffect(() => {
        console.log(props)
        console.log(props.data)
      }, []);
    
    return(
    <div className="col">
    <Card className="phenom-card px-3 py-1 mb-2">
        <Card.Img className="phenom-image" src={image} height={120} width={198}  />
        <Card.Body className="py-1 px-0">                
            <div className="phenom-title ps-1">
                <Card.Title>{props.data.phenom_name}</Card.Title>
            </div>
            <Button className="card-button me-4 align-self-center" href={"phenomens/" + props.data.phenom_id} target="_blank" variant="primary">Подробнее</Button>
            <button className="btn btn-outline-danger align-self-center">Удалить</button>
        </Card.Body>
    </Card>
    </div>
    )
}

export default PhenomCard;

