import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Card, Carousel, Container} from "react-bootstrap";
import travelingImage from "./traveling.png";

let MyHotel = () => {

    let [data, setData] = useState({hotelList: []})

    const [hotelIndex, setHotelIndex] = useState(0)
    const handleSelect = (selectedIndex) => {
        setHotelIndex(selectedIndex)
    }

    let location = useLocation()
    let userInfo = location.state.userInfo

    let navigate = useNavigate()

    let moveHotelOne = (id) => {
        navigate('/myHotelOne/' + id, {
            state: {
                userInfo: userInfo
            }
        })
    }


    let moveInsert = () => {
        navigate('/hotelInsert', {state: {userInfo: userInfo}})
    }


    useEffect(() => {
        let showHotelList = async () => {

            let resp = await axios
                .get('http://localhost:8080/hotel/hotelAll', {})
            console.log(userInfo)
            console.log(resp)
            if (resp.status === 200) {
                setData(resp.data)
                console.log(resp.data)

            }
        }
        showHotelList()
    }, [])
    return (
        <Container className={"mb-100"}>

            <div style={styles.cardContainer}>
                {data.hotelList
                    .filter(h => h.userId === userInfo.id) // 필터링을 추가
                    .map(h =>
                        <Card style={{width: '18rem'}}>
                            <Carousel activeIndex={hotelIndex} onSelect={handleSelect} className="carousel-container">
                                {h.imageList.length > 0 ? (
                                    h.imageList.map((hotelImages, imgIndex) => (
                                        <Carousel.Item key={imgIndex}>
                                            <div style={styles.imageContainer}>
                                                <Card.Img
                                                    src={`http://localhost:8080/hotel/${hotelImages}`}
                                                    alt={hotelImages}
                                                    style={styles.image}
                                                />
                                            </div>
                                        </Carousel.Item>
                                    ))
                                ) : (
                                    <div style={styles.imageContainer}>
                                        <Card.Img
                                            src={travelingImage}
                                            alt="기본 이미지"
                                            style={styles.image}
                                        />
                                    </div>
                                )}
                            </Carousel>

                            <Card.Body onClick={() => moveHotelOne(h.id)}>
                                <Card.Title>{h.hotelName}</Card.Title>
                                <Card.Text>

                                </Card.Text>
                                <Button style={button}>호텔 관리</Button>
                            </Card.Body>
                        </Card>
                    )}
            </div>
            <div>
                <Button style={button} onClick={moveInsert}>호텔 추가하기</Button> &emsp;
            </div>
        </Container>
    )

}
const styles = {
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    card: {
        width: '18rem',
        flex: '1 1 calc(33.333% - 1rem)', // 한 줄에 3개 배치
        boxSizing: 'border-box',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '300px', // 적절한 높이 설정
    },
    image: {
        width: '100%',
        height: '300px',
    },
};

const front = {
    image: {
        width: '100%',
        height: '200px',
        borderRadius: '8px',
        marginBottom: '10px',
        position: 'relative'
    },
}

const button = {
    backgroundColor: '#99bffd',
    borderColor: '#99bffd',
};


export default MyHotel