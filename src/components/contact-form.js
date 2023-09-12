import * as React from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { Button, FormButton } from './ui';

export default function ContactForm() {
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            message: ""
        },
    });

    const onSubmit = (data) => {
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(data).toString(),
        })
            .then(() => alert("Thank you, we'll get in touch as soon as possible"))
            .catch((error) => alert(error));
        setValue("name", "");
        setValue("email", "");
        setValue("phoneNumber", "");
        setValue("message", "");
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)} name="contact" data-netlify="true" >
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Control required type="name" placeholder="Enter Full name" {...field} />
                    </Form.Group>
                )}
            />
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Control required type="email" placeholder="Enter email" {...field} />
                    </Form.Group>
                )}
            />
            <Controller
                name="message"
                control={control}
                render={({ field }) => (
                    <Form.Group className="mb-3" controlId="message">
                        <Form.Control required as="textarea" rows={4} placeholder="Message" {...field} />
                    </Form.Group>
                )}
            />
            <input type="hidden" name="form-name" value="contact" />
            <div data-netlify-recaptcha="true"></div>
            <FormButton variant="reversed" type="submit">
                Submit
            </FormButton>
        </Form>
    );
}
