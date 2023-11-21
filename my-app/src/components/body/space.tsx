import React, { FC } from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PhenomCard from "../card/card";
import './space.css'
import Breadcrumbs, { BreadcrumbLink } from '../breadcrumbs/bread';

const Space: FC = () => {
    const [phenoms, setPhenoms] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        fetch(`/api/phenomens/`)
          .then((response) => response.json())
          .then((jsonData) => {setPhenoms(jsonData.phenomens)
            console.log(jsonData.data)
            console.log(phenoms)})
          .catch((error) => console.error('Error fetching data:', error));
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

    return(
        <div className="space">
            <form onSubmit={handleSubmit}>
                <input value={searchValue} placeholder={"Введите название"} onChange={(event) => {setSearchValue(event.target.value)}}/>
                <button className="search-button" type="submit">Найти</button>
            </form>
            <Breadcrumbs links={breadcrumbsLinks} />
            <div className="cards container px-0">
                <div className="row row-cols-4">
                {phenoms.map((item) => (
                    <PhenomCard data={item}/>
                ))}
                </div>
            </div>
        </div>
    )
}

export default Space;