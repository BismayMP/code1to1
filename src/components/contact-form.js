import * as React from 'react';
import { Form } from 'react-bootstrap';
import { FormButton } from './ui';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_KEY = process.env.SITE_RECAPTCHA_KEY;
if (typeof RECAPTCHA_KEY === 'undefined') {
    throw new Error(`Env var SITE_RECAPTCHA_KEY is undefined!`);
}

export default function ContactForm() {
    const recaptchaRef = React.createRef();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        const recaptchaValue = recaptchaRef.current.getValue();
        const body = new URLSearchParams({
            'form-name': "contact",
            'g-recaptcha-response': recaptchaValue,
            name,
            email,
            message
        }).toString();
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body
        })
            .then(() => alert("Thank you, we'll get in touch as soon as possible"))
            .catch((error) => alert(error));
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <Form
            onSubmit={onSubmit}
            name="contact"
            data-netlify="true"
            data-netlify-recaptcha="true"
            netlify-honeypot="bot-field">
            <Form.Group className="mb-3" controlId="name">
                <Form.Control required type="name" placeholder="Enter Full name" name="name" value={name} onChange={(event) => setName(event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Control required type="email" placeholder="Enter email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="message">
                <Form.Control required as="textarea" rows={4} placeholder="Message" name="message" value={message} onChange={(event) => setMessage(event.target.value)} />
            </Form.Group>
            <input type="hidden" name="form-name" value="contact" />
            <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_KEY} />
            <div data-netlify-recaptcha="true"></div>
            <FormButton variant="reversed" type="submit">
                Submit
            </FormButton>
        </Form>
    );
}
