import React from "react";
import { Container, Card, Row, Col, Image, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import DCarousel from "../../components/Carousel/carousel";
import Footer from "../../components/Footer/footer";
import './home.css';
import DNavbar from "../../components/Navbar/navbar";
// import { carouselItems, images, products } from "./dummy";
import { images } from "./dummy";
import { useState, useEffect } from "react";
import axios from "axios";
import locations from '../../components/Lokasi/data';

function HomePage() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8000/api/lapangan");
      const fields = response.data;
      fields.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
      const Items = fields.map((product) => ({
        id: product.idField,
        link: `/detail/${product.idField}`,
        title: product.title,
        typeField: product.typeField,
        price: `Rp. ${product.price}`,
        location: product.location,
        rating: product.rating,
        rented: product.rented,
        imageSrc: require('../../assets/images/lapangan.jpeg'),
      }));
      setAllProducts(Items);
      const recommendations = Items.filter((product) => product.rating > 4);
      setCarouselItems(recommendations)
      setProducts(Items.slice(0, 8));
    }
    fetchData();
  }, []);

  const [selectedLocation, setSelectedLocation] = useState("Kota Semarang");

  const handleLocationChange = (eventKey) => {
    setSelectedLocation(eventKey);
  };

  function filterField(type) {
    const temp = allProducts.filter((product) => product.typeField === type);
    setProducts(temp.slice(0,8));

  }

  function filterLocation(type){
    handleLocationChange(type);
    if(type === "Kota Semarang"){
      setProducts(allProducts.slice(0,8));
      setCarouselItems(allProducts.filter((product) => product.rating > 4));
      return;
    }
    const temp = allProducts.filter((product) => product.location === type);
    setProducts(temp.slice(0,8));
    setCarouselItems(temp.filter((product) => product.rating > 4));
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <>
      <DNavbar />
      <div style={{ width: "100%", backgroundColor: "#2f2e41", color: "#ffffff", padding:"7px" }}>
        <Container className="d-flex flex-row justify-content-end align-items-center mb-2 mt-2" style={{ fontSize: "12px" }}>
          <p className="mb-0 me-2">Lokasi: </p>
          <NavDropdown
            title={<span>{selectedLocation}</span>}
            id="basic-nav-dropdown"
            align={{ xxxl: 'start' }}
          >
            {locations.map((location, index) => (
              <NavDropdown.Item key={index} onClick={()=>filterLocation(location)}>
                {location}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Container>
      </div>
      <Container className="py-5">
        <DCarousel />
        <div className="multi-carousel-card mt-5" id="recommendation">
          <h3 className="title mt-5 mb-4" >Rekomendasi Lapangan</h3>
          <div className="wrapper">
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={5000}
              keyBoardControl={true}
              customTransition="all .5s"
              transitionDuration={500}
              removeArrowOnDeviceType={['tablet', 'mobile']}
              deviceType={'desktop'}
            >
              {carouselItems.map((card) => (
                <Card key={card.id}>
                  <Card.Link href={`${card.link}`}>
                    <Card.Img variant="top" src={card.imageSrc} />
                    <Card.Body>
                      <Card.Title>{card.title} - ({card.typeField})</Card.Title>
                      <Card.Text className="price">{card.price}</Card.Text>
                      <hr className="my-4" />
                      <Card.Text className="d-flex align-items-center">
                        <FaMapMarkerAlt className="icon-location" /> {card.location}
                      </Card.Text>
                      <Card.Text className="d-flex align-items-center">
                        <FaStar className="icon-star" /> {card.rating} | Tersewa {card.rented}
                      </Card.Text>
                    </Card.Body>
                  </Card.Link>
                </Card>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="group-categories mt-5" id="category">
          <div className="categories-icons">
            <h3 className="title mt-5 mb-4">Kategori Lapangan</h3>
            <Row className="categories-logo g-5 justify-content-lg-center">
              {images.map((image, index) => (
                <Col key={index} xl={2} lg={2} md={4} sm={6} xs={6} className="d-flex justify-content-center">
                  <div className="image-wrapper image-container">
                    <Link onClick={()=>filterField(image.title)}>
                      <Image src={image.src} alt={image.alt} width={60} height={60} className="animate-image" />
                    </Link>
                  </div>
                  <div className="image-title">{image.title}</div>
                </Col>
              ))}
            </Row>
          </div>
          <div className="categories-products">
            {products.map((item) => (
              <Card key={item.id}>
                <Link to={`${item.link}`}>
                  <Card.Img variant="top" src={item.imageSrc} />
                  <Card.Body>
                    <Card.Title>{item.title} - ({item.typeField})</Card.Title>
                    <Card.Text className="price">{item.price}</Card.Text>
                    <hr className="my-4" />
                    <Card.Text className="d-flex align-items-center">
                      <FaMapMarkerAlt className="icon-location" />{" "}
                      {item.location}
                    </Card.Text>
                    <Card.Text className="d-flex align-items-center">
                      <FaStar className="icon-star" />{" "}
                      {item.rating} | Tersewa {item.rented}
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </Container >
      <Footer />
    </>
  );
}

export default HomePage;