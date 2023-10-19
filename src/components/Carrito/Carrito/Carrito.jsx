import { useContext } from "react";
import { useState} from "react";
import { DataContext } from "../../DataContext/DataContext";
import Table from "react-bootstrap/Table"
import React from "react";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useFormik } from "formik"
import * as Yup from "yup"
import Modal from "react-bootstrap/Modal";
import axios from "axios";


import "../../../css/carrito.css"

export const Carrito = () => {
	const { cart, setCart } = useContext(DataContext);
  const [showDiv2, setShowDiv2] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState({
    orderId: "",
    orderStatus: ""
  });
  
  const validationSchema = () =>
	    Yup.object().shape({
		    name: Yup.string()
			    .required("* Obligatory field")
			    .min(3, "Name must be at least 3 characters")
          .max(30, "The Name must have a maximum of 30 characters"),
		    phone: Yup.string()
		      .required("* Obligatory field")
		      .min(7, "The Telephone must have at least 7 characters")
          .max(25, "The Telephone must have a maximum of 25 characters"),
        checkbox: Yup.string()
          .required("* Obligatory field")     
    })

  const postUsuario = async () => {
      const order = {
        datos: formik.values,
        items: cart,
        cantidad: cart.cantidad,
        total: total(),
}

  try {
    const resp = await axios.post(
      `${import.meta.env.VITE_SERVER_URI}/api/create-Orders`,
      order
    );

  const { status, data } = resp;

  if (status === 201) {
    setOrderInfo({
      orderId: data.id,
      orderStatus: data.estado,
    });
    setShowModal(true);
    clearCart();
    formik.resetForm();
  }
} catch (error) {
  console.error("Error:", error);
}
};

  const total = () =>
    cart.reduce((acumulador, valorActual) => {
      const cantidad = valorActual.cantidad || 1;
      return acumulador + cantidad * valorActual.price;
  }, 0);
    
    const formik = useFormik({
      initialValues: {
        name: "",   
        phone: "",  
        checkbox: false,
      },
      enableReinitialize: true,
      validationSchema,
    })
    
    

    const handleSubmit = () => {
      if (cart.length === 0) {
        alert("The cart is empty. Add products before purchasing");
      } else {
        if (Object.keys(formik.values).length === 0) {
          alert(
            "Please complete all required fields correctly."
          );
        } else {
          postUsuario();
          clearCart();
          formik.resetForm();
        }
      }
    };

	const removeItemFromCart = (id) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== id));
	}

    const clearCart = () => {
    setCart([]);
    formik.resetForm();
  
    };
        return ( 
            <>
            <Table id="responsive-table1" striped bordered hover variant="dark">
            <thead >
                <tr id="tr">
                    <th>Name</th>
                    <th id="img">img</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {cart.map(product => (
                    <tr key={product.id}>
                        <td id="td" data-label="Titulo:">{product.name}</td>
                        <td id="img">
                            <img
                                height={60}
                                src={product.imagen}
                                alt={product.name}
                            />
                        </td>
                        <td id="td" data-label="Precio:">{product.price}</td>
                        <td id="td" data-label="Cantidad:">{product.cantidad}</td>
                        <td>
							              <Button variant="danger" onClick={() => removeItemFromCart(product.id)}>								
                                 Delete
                            </Button>
                        </td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td></td>
                    <td>{total()}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tfoot>
        </Table>
		    <Button variant="danger" onClick={clearCart}>
          Clear Cart
        </Button>
		<br />
    <br />
		<Form onSubmit={formik.handleSubmit} className="responsive-form1"  style={{backgroundColor:"gray", color:"white", display:"flex", flexDirection:"column", padding:"20px", border:"1px solid #ccc"}}>
        <Form.Group  className="form-group1" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            type="text"
            name="name"
            className={
              formik.errors.name &&
              formik.touched.name &&
              "error"
          }
            maxLength={30}
						minLength={3}
	 					value={formik.values.name}
	 					onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="errorMessage">{formik.errors.name}</div>
          )}
        </Form.Group>
        <Form.Group  className="form-group1" controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            type="number"
            name="phone"
            className={
              formik.errors.phone &&
              formik.touched.phone &&
              "error"
          }
            maxLength={25}
						minLength={7}
	 					value={formik.values.phone}
	 					onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <div className="errorMessage">{formik.errors.phone}</div>
          )}  
        </Form.Group>
        <Form.Group  className="form-group1" controlId="formBasicCheckbox">
          {showDiv2 &&(
          <div className="checkbox-label">
            <Form.Check 
              onChange={formik.handleChange}
              value={formik.values.checkbox}
              name="checkbox"
              type="checkbox" 
              label="Validation"
              onBlur={formik.handleBlur}
              className={
                formik.errors.checkbox &&
                formik.touched.checkbox &&
                "error"} />
            {formik.touched.checkbox && formik.errors.checkbox && (
              <div className="errorMessage">{formik.errors.checkbox}</div>)} 
          </div>
          )}
        </Form.Group>
        {showDiv2 &&(
       <div>
       <br />
        <Button 
          id="efectivo"
          variant="primary" 
          className="btn btn-info btn-block mt-4"
          style={{
            backgroundColor:"#372214",
            borderStyle:"none",
            color:"white"
          }}
          type="submit" 
          onClick={handleSubmit}
          disabled={!formik.isValid || cart.length === 0 || !formik.values.checkbox}>
          Buy
        </Button>
        <br />
        <br />
        </div>
        )}
        
    </Form>
        <Modal show={showModal} onHide={() =>setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>¡Order Successfully Placed!</p>
              <p>Approximate delay 30 minutes</p>
              <p>Order ID: {orderInfo.orderId}</p>
            </Modal.Body>
        </Modal>
        </>
    )
};