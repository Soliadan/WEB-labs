import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import FormErrors from "../components/FormErrors/FormErrors";
import { clearCart } from "../redux/actions";
import "./Checkout.css";

const checkoutSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Email is incorrect (example: name@gmail.com)")
    .max(60, "Email is too long (max 60 characters)")
    .required("Email is a required field"),

  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Gender must be selected")
    .required("Gender is a required field"),

  phone: Yup.string()
    .matches(/^\d+$/, "Phone must contain only digits")
    .min(9, "Phone is too short (min 9 digits)")
    .max(15, "Phone is too long (max 15 digits)")
    .required("Phone is a required field"),

  street: Yup.string()
    .trim()
    .min(2, "Street name is too short")
    .max(80, "Street name is too long (max 80 characters)")
    .required("Street is a required field"),

  house: Yup.string()
    .trim()
    .matches(/^\d+(\/\d+)?$/, "Example: 12 or 12/45")
    .required("House / apartment is a required field"),
});

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((s) => s.carts["guest"] || []);

  const totalSum = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cartItems]
  );

  if (!cartItems.length) {
    return (
      <div className="page-with-footer">
        <Header />
        <main className="page-inner checkout-page">
          <h1>Checkout</h1>
          <p>Your cart is empty.</p>
          <Link className="btn-dark" to="/products">
            Go to products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-with-footer">
      <Header />
      <main className="page-inner checkout-page">
        <h1>Checkout</h1>

        <div className="checkout-grid">
          <section className="checkout-form-card">
            <h2>Customer info</h2>

            <Formik
              initialValues={{
                email: "",
                gender: "",
                phone: "",
                street: "",
                house: "",
              }}
              validationSchema={checkoutSchema}
              onSubmit={(values) => {
                dispatch(clearCart());
                navigate("/success");
              }}
            >
              {({ errors, touched }) => (
                <Form className="checkout-form">
                  <FormErrors errors={errors} touched={touched} />

                  <label className="field">
                    <span>Email</span>
                    <Field name="email" placeholder="name@gmail.com" />
                  </label>

                  <label className="field">
                    <span>Gender</span>
                    <Field as="select" name="gender">
                      <option value="">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Field>
                  </label>

                  <label className="field">
                    <span>Phone (digits only)</span>
                    <Field name="phone" placeholder="380xxxxxxxxx" />
                  </label>

                  <label className="field">
                    <span>Street name</span>
                    <Field name="street" placeholder="Shevchenko" />
                  </label>

                  <label className="field">
                    <span>House / apartment</span>
                    <Field name="house" placeholder="12 or 12/45" />
                  </label>

                  <button className="btn-dark" type="submit">
                    Submit order
                  </button>
                </Form>
              )}
            </Formik>
          </section>

          <aside className="checkout-summary-card">
            <h2>Order summary</h2>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size || "default"}`}
                  className="summary-row"
                >
                  <div>
                    <b>{item.name}</b>
                    <div className="summary-sub">
                      {item.size || "-"} • x{item.quantity}
                    </div>
                  </div>
                  <div>${item.price * item.quantity}</div>
                </div>
              ))}
            </div>

            <div className="summary-total">
              <span>Total:</span>
              <b>${totalSum}</b>
            </div>

            <Link className="btn" to="/cart">
              Back to cart
            </Link>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
