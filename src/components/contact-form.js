import * as React from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { FormButton } from './ui';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY;
if (typeof RECAPTCHA_KEY === 'undefined') {
    throw new Error(`Env var SITE_RECAPTCHA_KEY is undefined!`);
}

function encode(data) {
    return Object.keys(data)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
}

export default function ContactForm() {
    const recaptchaRef = React.createRef();
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            message: ""
        },
    });

    const onSubmit = (data) => {
        const recaptchaValue = recaptchaRef.current.getValue();
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
                'form-name': "contact",
                'g-recaptcha-response': recaptchaValue,
                ...data,
            }),
        })
            .then(() => alert("Thank you, we'll get in touch as soon as possible"))
            .catch((error) => alert(error));
        setValue("name", "");
        setValue("email", "");
        setValue("phoneNumber", "");
        setValue("message", "");
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            name="contact"
            data-netlify="true"
            data-netlify-recaptcha="true"
            netlify-honeypot="bot-field">
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
            <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_KEY} />
            <div data-netlify-recaptcha="true"></div>
            <FormButton variant="reversed" type="submit">
                Submit
            </FormButton>
        </Form>
    );
}
