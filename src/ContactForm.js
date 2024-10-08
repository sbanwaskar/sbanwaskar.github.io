// ContactForm.js
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("yourFormspreeID"); // Replace with your Formspree ID

  if (state.succeeded) {
    return <p>Thanks for your message!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        type="email"
        name="email"
        required
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />

      <label htmlFor="message">Your Message</label>
      <textarea
        id="message"
        name="message"
        rows="5"
        required
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />

      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
