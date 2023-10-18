import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import Container from "react-bootstrap/Container";
import theme2 from "../../Coffe-img/theme2.png";
import "../../css/register.css"

const validationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email("It must be a valid email")
      .required("* Obligatory field")
      .min(6, "The Email must be at least 6 characters"),
    password: Yup.string()
      .required("* Obligatory field")
      .min(6, "The password must be at least 6 characters"),
    username: Yup.string()
      .required("* Obligatory field")
      .min(3, "Username must be at least 3 characters"),
    address: Yup.string()
      .required("* Obligatory field")
      .min(6, "The address must be at least 6 characters"),
  });
const initialValues = {
  email: "",
  password: "",
  username: "",
  address: "",
};

export const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: () => {
      postUsuario();
      formik.resetForm();
    },
  });

  const postUsuario = async () => {
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/api/register`,
        formik.values
      );
      const { status } = resp;

      if (status === 201) {
        alert("Registrado Exitosamente!");
        navigate("/login");
      }
    } catch (error) {
      alert("An error occurred while trying to register.");
    }
  };
  const handleSubmit = () => {
    postUsuario();
    formik.resetForm();
  };
  return (
    <>
      <div
        className="cont-form-reg"
		style={{
			backgroundImage: `url(${theme2})`,
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center center",
		  }}
      >
        <Container className="cont-form-reg">
          <Form className="formu-reg" onSubmit={formik.handleSubmit}>
            <h1 className="title-form-reg" style={{ textAlign: "center" }}>Register</h1>
            <Form.Group className="content-form-reg" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                className={
                  formik.errors.email && formik.touched.email && "error"
                }
                maxLength={30}
                minLength={6}
                placeholder="Enter email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                value={formik.values.email}
              />
              {formik.errors.email && (
                <div className="errorMessage">{formik.errors.email}</div>
              )}
            </Form.Group>
            <Form.Group className="content-form-reg" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                className={
                  formik.errors.password && formik.touched.password && "error"
                }
                maxLength={20}
                minLength={6}
                placeholder="Choose a password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && (
                <div className="errorMessage">{formik.errors.password}</div>
              )}
            </Form.Group>
            <Form.Group className="content-form-reg" controlId="formBasicUser">
              <Form.Label>User</Form.Label>
              <Form.Control
                name="username"
                className={
                  formik.errors.username && formik.touched.username && "error"
                }
                type="text"
                maxLength={20}
                minLength={3}
                placeholder="Choose a username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="errorMessage">{formik.errors.username}</div>
              )}
            </Form.Group>
            <Form.Group className="content-form-reg" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                className={
                  formik.errors.address && formik.touched.address && "error"
                }
                maxLength={30}
                minLength={6}
                placeholder="Enter your address"
                type="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="errorMessage">{formik.errors.address}</div>
              )}
            </Form.Group>
            <Button
			  className="button-form-reg"
              type="submit"
			  style={{ backgroundColor: "#794228", borderStyle: "none" }}
              onClick={handleSubmit}
              disabled={!formik.isValid}
            >
              Register
            </Button>
			<NavLink to="/login" className="text-reg">
			  Already you have an account?, Log in
            </NavLink>
          </Form>
        </Container>
      </div>
    </>
  );
};
