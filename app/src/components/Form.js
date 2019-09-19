import React, { useState, useEffect } from 'react'
import { withFormik, Form, Field } from 'formik'
import styled from 'styled-components'
import * as Yup from 'yup'
import axios from 'axios'



const NewUserForm = ({ values, errors, touched, status }) => {
    const [newUser, setNewUser] = useState([]);

    useEffect(() => {
        if (status) {
            setNewUser({...newUser, status});
        }
    }, [status]);

    return (
        <Form>
            <Field type='text' name='name' placeholder='Name' />
            {touched.name && errors.name && ( <p>{errors.name}</p>)}
            <Field type='text' name='email' placeholder='Email' />
            {touched.email && errors.email && ( <p>{errors.email}</p>)}
            <Field type='text' name='password' placeholder='Password' />
            {touched.password && errors.password && ( <p>{errors.password}</p>)}
        <label>
            Terms of Service
            <Field 
                type='checkbox'
                name='terms of service'
                checked={values.termsOfService}
            />
        </label>
        <button>Submit</button>
        </Form>
    )
}

const FormikNewUserForm = withFormik({
    mapPropsToValues({ name, email, password, termsOfService }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            termsOfService: termsOfService || false,
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
    }),
    handleSubmit(values, { setStatus }) {
        axios
        .post('https://reqres.in/api/users', values)
        .then (res => {
            setStatus(res.data);
        })
        .catch(err => console.log(err.res));
    }
})(NewUserForm);

export default FormikNewUserForm;