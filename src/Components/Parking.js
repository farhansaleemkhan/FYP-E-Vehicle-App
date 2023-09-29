import React, { useState } from "react";
import { Button, Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const Parking = ({ parking , fromDate , toDate }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row shadow">
      <div className="col-md-4">
        <img src={parking.image[0]} alt="room" className="smallimg" />
      </div>
      <div className="col-md-7">
        <h1>{parking.name}</h1>
        <b>
            <p>Rent Per Day: {parking.rentperday}</p>
          {/* <p>Max Count: {parking.maxcount}</p> */}
          <p>Phone Number: {parking.phonenumber}</p>
          <p>Type: {parking.type}</p>
        </b>
        <div style={{ float: "right" }}>
          {(fromDate && toDate) && (
            <Link to={`/book/${parking._id}/${fromDate}/${toDate}`}>
            <button className="btn btn-primary m-2">Book Now</button>
            </Link>
          )}
          <button className="btn btn-dark" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{parking.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {parking.image.map((url)=>{
                return <Carousel.Item>
                <img
                  className="d-block w-100 bigimg"
                  src={url}
                  alt="First slide"
                />
              </Carousel.Item>
            })}
          </Carousel>
          <p>{parking.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Parking;