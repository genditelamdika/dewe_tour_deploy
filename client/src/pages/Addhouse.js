import { Col, Form, Row } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Addcountry from "../pages/Addcountry"
// import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function Addhouse() {
  const [amenities, setAmenities] = useState([]); //Store all category data
  let navigate = useNavigate();

  // data yang akan dikirimkan ke backend
  const [form, setForm] = useState({
    propertyname: "",
    city: "",
    amenities_id: [],
    address: "",
    price: "",
    tor: "",
    bedroom: "",
    bathroom: "",
    image: "",
  }); //Store product data

  // Fetching category data
  const getAmenities = async () => {
    try {
      const response = await API.get("/amenities");
      setAmenities(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

    // For handle if category selected
    const handleChangeCategoryId = (e) => {
      const id = e.target.value;
      const checked = e.target.checked;
  
      if (checked) {
        // Save category id if checked
        setForm({ ...form, amenities_id: [...form.amenities_id, id] });
      } else {
        // Delete category id from variable if unchecked
        let newAmenitiesId = form.amenities_id.filter((amenitiesId) => {
          return amenitiesId != id;
        });
        setForm({ ...form, amenities_id: newAmenitiesId });
      }
    };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
    }
  };
   const MySwal = withReactContent(Swal);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      // Store data with FormData as object
      const formData = new FormData();
      formData.set("propertyname", form.propertyname);
      formData.set("amenities", Number(form.amenities_id));
      formData.set("city", form.city);
      formData.set("address", form.address);
      formData.set("price", Number(form.price));
      formData.set("tor", form.tor);
      
      formData.set("bedroom", Number(form.bedroom));
      formData.set("bathroom", Number(form.bathroom));
      formData.set("image", form.image[0], form.image[0].name);

      // Insert product data
      const response = await API.post("/house", formData, config);
      console.log("add product success : ", response);
      MySwal.fire({
    title: <strong>Ah Yang Benerr</strong>,
    html: <i>You clicked the button!</i>,
    icon: 'success'
    })
      navigate("/");
    } catch (error) {
      console.log("add product failed : ", error);
      console.log(form);
    }
  });

  useEffect(() => {
    getAmenities();
  }, []);

  // const MySwal = withReactContent(Swal);
  // let navigate = useNavigate();
  // const handleButtonClick = () => {
  // MySwal.fire({
  //   title: <strong>Ah Yang Benerr</strong>,
  //   html: <i>You clicked the button!</i>,
  //   icon: 'success'
  //   })
  //       navigate("/Trip");
  // };
  return (
    <>
      <div className="bg-white text-dark py-5" style={{ padding: "0px 170px" }}>
        <div className="flex">

        <h5 className="fw-bold mb-5 ">Add Trip</h5>

        </div>
        <Form className="secondary" onSubmit={(e) => handleSubmit.mutate(e)}>
          <p>Title</p>
          <Row className="mb-4">
            <Col md={12} lg={8} xl={9}>
              <Form.Control
                type="text"
                placeholder="amenities"
                style={{
                  width: "1010px",
                  background: "rgba(195, 195, 195, 0.5)",
                  height: "40px",
                  color: "black",
                }}
                onChange={handleChange}
                name="amenities"
              />
            </Col>
          </Row>

          <div className="card-form-input mt-4 px-2 py-1 pb-2">
                <div
                  className="text-secondary mb-1"
                  style={{ fontSize: '15px' }}
                >
                  Category
                </div>
                {amenities.map((item, index) => (
                  <label className="checkbox-inline me-4" key={index}>
                    <input
                      type="checkbox"
                      value={item.id}
                      onClick={handleChangeCategoryId}
                    />{' '}
                    {item.name}
                  </label>
                ))}
              </div>

          <p>Acomodation</p>
          <Row className="mb-4">
            <Col md={12} lg={8} xl={9}>
              <Form.Control
                type="text"
                placeholder="Title"
                style={{
                  width: "1010px",
                  background: "rgba(195, 195, 195, 0.5)",
                  height: "40px",
                  color: "black",
                }}
                onChange={handleChange}
                name="acommodation"

                // name="title"
                // onChange={handleChangeFilm}
                // value={dataFilm?.title}
              />
            </Col>
          </Row>

          <p>Transportasion</p>
          <Row className="mb-4">
            <Col md={12} lg={8} xl={9}>
              <Form.Control
                type="text"
                placeholder="Transportatio"
                style={{
                  width: "1010px",
                  background: "rgba(195, 195, 195, 0.5)",
                  height: "40px",
                  color: "black",
                }}
                onChange={handleChange}
                name="transportation"

                // name="title"
                // onChange={handleChangeFilm}
                // value={dataFilm?.title}
              />
            </Col>
          </Row>

          <p>Eat</p>
          <Row className="mb-4">
            <Col md={12} lg={8} xl={9}>
              <Form.Control
                type="text"
                placeholder="eat"
                style={{
                  width: "1010px",
                  background: "rgba(195, 195, 195, 0.5)",
                  height: "40px",
                  color: "black",
                }}
                onChange={handleChange}
                name="eat"
              />
            </Col>
          </Row>

          <Form.Label>Pilih Tanggal</Form.Label>
          <div className="flex">
            <Form.Group controlId="datePicker">
              <Form.Control
                style={{
                  width: "300px",
                  background: "rgba(195, 195, 195, 0.5)",
                }}
                type="number"
                onChange={handleChange}
                name="day"

                // name="date"
                //   value={selectedDate}
                //   onChange={handleDateChange}
              />
            </Form.Group>
            <Form.Label style={{ marginLeft: "50px" }}>Day</Form.Label>

            <Form.Group controlId="datePicker">
              <Form.Control
                style={{
                  width: "300px",
                  marginLeft: "50px",
                  background: "rgba(195, 195, 195, 0.5)",
                }}
                type="number"
                onChange={handleChange}
                name="night"

                //   value={selectedDate}
                //   onChange={handleDateChange}
              />
            </Form.Group>
            <Form.Label style={{ marginLeft: "50px" }}>Night</Form.Label>
          </div>

          <Form.Label style={{ marginTop: "10px" }}>Date Trip</Form.Label>
          <Form.Group controlId="datePicker">
            <Form.Control
              type="date"
              style={{ background: "rgba(195, 195, 195, 0.5)" }}
              onChange={handleChange}
              name="datetrip"

              //   value={selectedDate}
              //   onChange={handleDateChange}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formGridAddress1">
            <Form.Label>Price</Form.Label>
            <Form.Control
              style={{
                background: "rgba(195, 195, 195, 0.5)",
                height: "50px",
                color: "black",
              }}
              type="number"
              placeholder="price"
              onChange={handleChange}
              name="price"

              // name="price"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formGridAddress1">
            <Form.Label>Quota</Form.Label>
            <Form.Control
              style={{
                background: "rgba(195, 195, 195, 0.5)",
                height: "50px",
                color: "black",
              }}
              type="number"
              placeholder="quota"
              onChange={handleChange}
              name="quota"

              // name="quota"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formGridAddress1">
            <Form.Label>Set Quota</Form.Label>
            <Form.Control
              style={{
                background: "rgba(195, 195, 195, 0.5)",
                height: "50px",
                color: "black",
              }}
              type="number"
              placeholder="fullcounter"
              onChange={handleChange}
              name="fullcounter"

              // name="quota"
            />
          </Form.Group>

          <Form.Label>Descripton</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            style={{
              background: "rgba(196, 196, 196, 0.5)",
              marginBottom: "10px",
              resize: "none",
              height: "177px",
              color: "black",
              width: "100%",
            }}
            onChange={handleChange}
            name="description"

            // name="description"
          />
          <Form.Label>Image</Form.Label>
          <Col md={12} lg={4} xl={3}>
            <label
              htmlFor="thumbnailFilm"
              style={{
                background: "rgba(196, 196, 196, 0.5)",
                // width: "350px",
                // height: "50px",
                padding: "8px 40px 8px 40px",
                color: "yellow",
                borderRadius: "6px",
                border: "1px solid white",
                fontSize: "14px",
                fontWeight: "bold",
                width: "330px",
              }}
            >
              Attach Here
              <i
                style={{
                  color: "#FFAF00",
                  fontSize: "20px",
                  marginLeft: "8px",
                }}
              />
            </label>
            <input
              type="file"
              onChange={handleChange}
              name="image"
              // name="image"
              // onChange={handleChangeFilm}
              id="thumbnailFilm"
              hidden
            />
          </Col>

          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <Button
              //  onClick={handleButtonClick}
              type="submit"
              style={{
                width: "200px",
                height: "40px",
                // background: "yellow",
                background: "#FFAF00",

                border: "1px solid black",
                fontWeight: "bold",
              }}
            >
              Add Trip
            </Button>
          </div>
        </Form>
      </div>
      <Footer />
    </>
  );
}
export default Addhouse;