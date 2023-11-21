import { FC, useState} from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
// import { ITunesMusic, getMusicByName } from './modules/get-music-by-name'
// import { InputField } from './components/InputField'
import { PhenomCard } from './components/card'
// import './ITunesPage.css'

const ITunesPage: FC = () => {
    const [searchValue, setSearchValue] = useState('')

    const [loading, setLoading] = useState(false)

    // const [music, setMusic] = useState<ITunesMusic[]>([])

    const handleSearch = async () =>{
        await setLoading(true)
        const { results } = await getMusicByName(searchValue)
        await setMusic(results.filter(item => item.wrapperType === "track"))
        await setLoading(false)
    }

    return (
        <div className={`container ${loading && 'containerLoading'}`}>
            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}

            <InputField
                value={searchValue}
                setValue={(value) => setSearchValue(value)}
                loading={loading}
                onSubmit={handleSearch}
            />

            {!music.length && <div>
                <h1>К сожалению, пока ничего не найдено :(</h1>
            </div>}

            <Row xs={4} md={4} className="g-4">
                {music.map((item, index)=> (
                    <Col key={index}>
                        <MusicCard {...item} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default ITunesPage