import { Button, Col, Form } from "react-bootstrap"
import Offcanvas from "react-bootstrap/Offcanvas";
import bill from "../images/bill1.png";
import iconhous from "../image/Iconhous.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "../config/api";
import { useQuery } from "react-query";


function Sidebar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [categories, setCategories] = useState([]); //Store all category data
    let navigate = useNavigate();

    let { data: amenities } = useQuery("amenitiesChache", async () => {
        const response = await API.get("/amenities");
        console.log("data :", response.data);
        return response.data.data;
      });
    return(
        <>
        <div className="">
                <Button className="bg mx-3 border-0" style={{position:"absolute"}} onClick={handleShow}>
                    <img width={25} src={bill} alt="" />
                </Button>
                {/* <img onClick={() => navigate("/")} width={150} src={iconhous} alt="" /> */}
            </div>
            <Offcanvas className="bg" style={{ width: "450px" }} show={show} onHide={handleClose}>
                <Offcanvas.Header className="bg justify-content-start gap-3 p-0 ps-3 mt-3">
                    <img onClick={() => navigate("/")} width={150} src={iconhous} alt="" />
                </Offcanvas.Header>
                <Offcanvas.Body className="bg">
                    <div className="ps-3 pt-5 d-flex flex-column gap-5">
                        <div className="d-flex flex-column gap-4">
                        <span className="color fs-4 fw-bold">Type Of Rent</span>
                        <div className="d-flex align-items-center gap-3 text-decoration-none">
                        <Button variant="outline-secondary" active>Day</Button>
                        <Button variant="outline-secondary">Month</Button>
                        <Button variant="outline-secondary">Year</Button>
                        </div>
                        <span className="color fs-4 fw-bold">Date</span>
                        <div>
                        </div>
                        <span className="color fs-4 fw-bold">Bedroom</span>
                        <div className="d-flex align-items-center gap-3 text-decoration-none">
                        <Button variant="outline-secondary">1</Button>
                        <Button variant="outline-secondary">2</Button>
                        <Button variant="outline-secondary">3</Button>
                        <Button variant="outline-secondary">4</Button>
                        <Button variant="outline-secondary">5</Button>
                        </div>

                        <span className="color fs-4 fw-bold">Bathroom</span>
                        <div className="d-flex align-items-center gap-3 text-decoration-none">
                        <Button variant="outline-secondary">1</Button>
                        <Button variant="outline-secondary">2</Button>
                        <Button variant="outline-secondary">3</Button>
                        <Button variant="outline-secondary">4</Button>
                        <Button variant="outline-secondary">5</Button>
                        </div>
                        <span className="color fs-4 fw-bold">Amenities</span>
                        {amenities?.map((item, index) => (
                  <label className="checkbox-inline me-4" key={index}  >
                    <input
                      type="checkbox"
                      value={item.id}
                    //   onClick={handleChangeCategoryId}
                    />
                    {item.name}
                  </label>
                ))} 

<span className="color fs-4 fw-bold">Budget</span>
<div className="d-flex align-items-center gap-3 text-decoration-none">

<span className="fw-bold"style={{width:"1000px"}} >Less Than IDR</span>
{/* <p>IDR</p> */}
   <Form.Control
           style={{ width: "250px" }}
           className=""
           type="search"
           placeholder="Add your item here..."
          //  value={search}
          //  onChange={handleSearch}
        />
        </div>
      
                        
                           
                            <div className="d-flex align-items-end gap-3 text-decoration-none">
                                <Button style={{marginLeft:"300px", width:"100px"}} variant="outline-primary">Aply</Button>
                            </div>
                        </div>
                        <div className="d-flex flex-column gap-3">
                            {/* {getChannels?.map((value) => {
                                return (
                                    <div key={value.id} className="d-flex align-items-center gap-3">
                                        <img onClick={() => handleChannelClick(value?.id)} style={{ width: "50px", height: "50px", objectFit: "cover" }} src={value.photo ? value.photo : Fp} alt="" />
                                        <span className="text-white fw-bold fs-6">{value.channelName}</span>
                                    </div>
                                );
                            })} */}
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

    </>

)
}
export default Sidebar