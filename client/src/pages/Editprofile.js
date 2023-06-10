import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import Row from "react-bootstrap/Row";
import { InputGroup } from "react-bootstrap";
// import { BsPlus } from "react-icons/bs";
import Button from "react-bootstrap/Button";
// import { IoMdAttach } from "react-icons/io";
import { API } from "../config/api";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useMutation } from "react-query";
import { UserContext } from "../context/userContext";
function Editprofile() {

    let navigate = useNavigate();
    const { id } = useParams();
  
    const [state] = useContext(UserContext)

     // function untuk meng-handle perubahan dalam form
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    // password: "",
    address: "",
    phone: "",
    image:""
  })
  
  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
    }
  };

    // function untuk meng-update channel
    const handleUpdate = useMutation(async (e) => {
        try {
            e.preventDefault()

            // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
    
          const formData = new FormData()
    
          formData.append("fullname", form.fullname)
          formData.append("email", form.email)
        //   formData.append("password", form.password)
          formData.append("address", form.address)
          formData.append("phone", form.phone)
          formData.append("image", form.image)
    
          const response = await API.patch(`/user/${state?.user.id}`, formData,config)
          if (response.status == 200) {
            Swal.fire(
              'Change Saved',
              'Update Success',
              'success'
            )
          }
          navigate('/Profile')
        } catch (err) {
          alert("Update Failed")
          console.log(err)
        }
      })
    return(
        <div className="position-relative">
        <div
        className=" position-absolute mw-100  " style={{top:"130px", left:"280px"}}>
        <h5 className="fw-bold Text-white mb-5 ">Add Film</h5>
        <Form  className="secondary"  onSubmit={(e) => handleUpdate.mutate(e)} >
          <Row className="mb-4">
            <Col md={12} lg={8} xl={9}>
              <Form.Control
                type="text"
                placeholder="fullname"
                style={{
                  background: "rgba(210, 210, 210, 0.25)",
                  height: "50px",
                  color: "white",
                  width: "600px"
                }}
                name="fullname"
                id="fullname"
                onChange={handleChange}
                value={form?.fullname}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={12} lg={8} xl={9}>
              <Form.Control
                type="text"
                placeholder="email"
                style={{
                  background: "rgba(210, 210, 210, 0.25)",
                  height: "50px",
                  color: "white",
                  width: "600px"
                }}
                name="email"
                id="email"
                onChange={handleChange}
                // value={form?.title}
              />
            </Col>
          </Row>

          {/* <Row className="mb-4">
            <Col md={12} lg={8} xl={9}>
              <Form.Control
                type="text"
                placeholder="password"
                style={{
                  background: "rgba(210, 210, 210, 0.25)",
                  height: "50px",
                  color: "white",
                  width: "600px"
                }}
                name="password"
                id="password"
                onChange={handleChange}
                // value={form?.title}
              />
            </Col>
          </Row> */}

          <Row className="mb-4">
            <Col md={12} lg={8} xl={9}>
              <Form.Control
                type="text"
                placeholder="phone"
                style={{
                  background: "rgba(210, 210, 210, 0.25)",
                  height: "50px",
                  color: "white",
                  width: "600px"
                }}
                name="phone"
                id="phone"
                onChange={handleChange}
                // value={form?.title}
              />
            </Col>
          </Row>




          <Form.Control
            as="textarea"
            rows={3}
            placeholder="address"
            style={{
              background: "rgba(210, 210, 210, 0.25)",
              marginBottom: "30px",
              resize: "none",
              height: "177px",
              color: "white",
            }}
            id="address"
            name="address"
            onChange={handleChange}
            // value={form?.description}
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

          {/* episode */}

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button
              type="submit"
              style={{
                width: "800px",
                height: "40px",
                background: "orange",
                border: "1px solid black",
                fontWeight: "bold",
                marginTop: "20px"
              }}
              >
              Add
            </Button>
          </div>
        </Form>
      </div>
        </div>
    )
}
export default Editprofile