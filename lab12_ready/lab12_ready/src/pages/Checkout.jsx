import "./Checkout.css";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormErrors from "../components/FormErrors/FormErrors";
import { clearCart, updateProfile } from "../redux/actions";
import { useNavigate, Link } from "react-router-dom";

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
    .max(60, "Street is too long (max 60 characters)")
    .required("Street is a required field"),

  houseApartment: Yup.string()
    .trim()
    .matches(/^\d+(\/\d+)?$/, "House/Apartment is incorrect (example: 10/22)")
    .required("House/Apartment is a required field"),
});

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((s) => s.auth.currentUserId);
  const user = useSelector((s) => s.auth.users?.[userId]);
  const cartItems = useSelector((s) => s.carts[userId] || []);

  const totalSum = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const initialValues = {
    email: user?.profile?.email || userId || "",
    gender: user?.profile?.gender || "",
    phone: user?.profile?.phone ?? "",
    street: user?.profile?.street || "",
    houseApartment: user?.profile?.houseApartment || "",
  };

  if (!cartItems.length) {
    return (
      <main className="checkout-page">
        <h2>Checkout</h2>
        <p>Your cart is empty.</p>
        <Link to="/products" className="btn-dark">
          Go to products
        </Link>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-grid">
        <section className="checkout-card">
          <h2>Checkout</h2>
          <p className="hint">
            Fields: Email, Gender (select), Phone (digits only), Street, House/Apartment.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            enableReinitialize
            onSubmit={(values, helpers) => {
              dispatch(
                updateProfile({
                  userId,
                  profile: {
                    email: values.email.trim().toLowerCase(),
                    gender: values.gender,
                    phone: values.phone,
                    street: values.street.trim(),
                    houseApartment: values.houseApartment.trim(),
                  },
                })
              );

              dispatch(clearCart(userId));
              helpers.setSubmitting(false);
              navigate("/success");
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="checkout-form">
                <FormErrors errors={errors} touched={touched} />

                <label>
                  Email
                  <Field name="email" type="email" placeholder="name@gmail.com" />
                </label>

                <label>
                  Gender
                  <Field as="select" name="gender">
                    <option value="">Select...</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </Field>
                </label>

                <label>
                  Phone number (digits only)
                  <Field name="phone" type="text" inputMode="numeric" placeholder="380XXXXXXXXX" />
                </label>

                <label>
                  Street
                  <Field name="street" type="text" placeholder="Shevchenka" />
                </label>

                <label>
                  House/Apartment
                  <Field name="houseApartment" type="text" placeholder="10/22" />
                </label>

                <button className="btn-dark" type="submit" disabled={isSubmitting}>
                  Place order
                </button>
              </Form>
            )}
          </Formik>
        </section>

        <aside className="checkout-card summary">
          <h3>Order summary</h3>

          <div className="summary-list">
            {cartItems.map((item) => (
              <div className="summary-row" key={`${item.id}-${item.size}`}>
                <div className="summary-left">
                  <div className="summary-title">{item.name}</div>
                  <div className="summary-sub">
                    Size: {item.size} • Qty: {item.quantity}
                  </div>
                </div>
                <div className="summary-right">${item.price * item.quantity}</div>
              </div>
            ))}
          </div>

          <div className="summary-total">
            <span>Total:</span>
            <b>${totalSum}</b>
          </div>
        </aside>
      </div>
    </main>
  );
}
