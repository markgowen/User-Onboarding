import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import axios from 'axios';

const FormSection = styled.section`
  width: 460px;
  margin: auto 100px;
  padding: 32px;
  font-weight: bold;
  background-color: #303030;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24);
`;

const NewUserForm = ({ values, errors, touched, status }) => {
  const [newUser, setNewUser] = useState([]);

  useEffect(() => {
    if (status) {
      setNewUser({ ...newUser, status });
    }
  }, [status]);

  return (
    <FormSection>
      <h1>Sign Up</h1>
      <Form>
        <Field type="text" name="name" placeholder="Name" />
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field type="email" name="email" placeholder="Email" />
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field component="select" className="role-select" name="role">
          <option>Please Choose an Option</option>
          <option value="sectionLead">Section Lead</option>
          <option value="teamLead">Team Lead</option>
          <option value="student">Student</option>
        </Field>
        <label className="checkbox-container">
          Terms of Service
          <Field
            type="checkbox"
            name="termsOfService"
            checked={values.termsOfService}
          />
          <span className="checkmark" />
        </label>
        <button>Submit</button>
      </Form>
      {newUser.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Role: {user.role}</li>
        </ul>
      ))}
    </FormSection>
  );
};

const FormikNewUserForm = withFormik({
  mapPropsToValues({ name, email, password, termsOfService }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      termsOfService: termsOfService || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(8)
      .required()
  }),
  handleSubmit(values, { setStatus }) {
    // setTimeout(() => {
    //   if (values.email === 'waffle@syrup.com') {
    //   } else {
    //   }
    // }, 2000);

    axios
      .post('https://reqres.in/api/users', values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => console.log(err.res));
  }
})(NewUserForm);
console.log(FormikNewUserForm);
export default FormikNewUserForm;
