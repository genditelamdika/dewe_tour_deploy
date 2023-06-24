// import The from "../image/thewitcher.png"
import Vector1 from "../images/Vector1.png";
import Vector2 from "../images/Vector2.png";
import Vector3 from "../images/Vector3.png";
import Vector4 from "../images/Vector4.png";
import Cards from "./cards";
import Props from "./Props";
import Footer from "../components/Footer";

import { Col, Container, Image, InputGroup, Row, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Card from "react-bootstrap/Card";
// import InputGroup from 'react-bootstrap/InputGroup';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {
 const [search, setSearch] = useState("");
 const [datas,setDatas] = useState("");
 const [filteredData, setFilteredData] = useState([]);

  let { data: trips } = useQuery("tripsChache", async () => {
    const response = await API.get("/trips");
    console.log("data :", response.data);
    return response.data.data;
  });
  console.log(trips)
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const results = trips.filter((item) =>
      item.country.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(results);
  };

  return (
    <div className="bg">
      <div className="the">
        <h1 style={{ fontSize: "100px", color: "white" }}>Explore</h1>
        <p style={{ fontSize: "50px", color: "white" }}>
          Your Amazing City Together
        </p>
        <div></div>
        {/* <Stack direction="horizontal"> */}

        <p>Find great place to holiday</p>
        <Button
          style={{
            position: "absolute",
            marginLeft: "900px",
            height: "35px",
            width: "80px",
          }}
          variant="warning"
        >
          Search
        </Button>
        <Form.Control
           style={{ width: "900px" }}
           className=""
           type="search"
           placeholder="Add your item here..."
           value={search}
           onChange={handleSearch}
        />
      </div>
      <img
        className="kontol"
        style={{
          position: "fixed",
          position: "absolute",
          zIndex: -1,
          top: "0",
          width: "100%",
        }}
        src={require("../images/pantai.png")}
        alt="gambar"
      ></img>

      <div>
        <div className="card-group">
          <Cards icon={Vector2} title="Best Price Guarantee" />
          <Cards icon={Vector3} title="Travellers Love Us" />
          <Cards icon={Vector1} title="Best Travel Agent" />
          <Cards icon={Vector4} title="Our Dedicated Support" />
          <div style={{ marginLeft: "0px", padding: "50px" }}>
            {/* <Props className="text-decoration-none" value={Tour}/> */}
            <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
              Group Tour
            </h1>
          </div>
 
        </div>
        <div style={{marginTop:"700px"}}>
           <Row
            xs={3}
            md={3}
            className="g-3"
            style={{ marginTop: "0px", marginLeft: "0px",padding:"50px" }}

          >
             {filteredData.length === 0 ? (
            <p></p>
          ) : (

            filteredData?.map((item, idx) => (
              <Link className="text-decoration-none " to={`/Detail/${item.id}`}>
                <Col key={idx} >
                  <Card style={{ padding:"30px" }}>
                  <p className="text-decoration-none" style={{marginLeft:"290px",marginTop:"30px",position:"absolute",background:"white",borderRadius:"5px 0 0 5px",textAlign:"center",width:"50px",height:"30px"}}>{item.fullcounter}/{item.quota}</p>
                    <Card.Img variant="dark" src={item.image} />
                    <Card.Body>
                      <Card.Title style={{ color: "black" }}>
                        {item.title}
                      </Card.Title>
                      <div className="flex" style={{marginTop:"10px"}}>

                      <Card.Title
                        style={{
                          fontSize: "14px",
                          textDecoration: "none",
                          cursor: "pointer",
                          color: "#555555",
                        }}
                        >
                        {item.country.name}
                      </Card.Title>
                      <Card.Title
                      style={{
                        fontSize:"14px",
                        marginLeft:"200px",
                        color:"yellow",
                      }}
                      >
                        IDR.{item.price}
                      </Card.Title>

                        </div>

                    </Card.Body>
                  </Card>
                </Col>
              </Link>
          )

            )
            )
            }


          </Row>
          <Footer style={{ marginTop: "800px" }} />
        </div>
        {/* <div style={{ paddingTop: "1650px" }}>
        </div> */}
      </div>

      {/* </div> */}
    </div>
  );
}
export default Home;
