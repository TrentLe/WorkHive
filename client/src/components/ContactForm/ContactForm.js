import React, { useState } from 'react'
import { ADD_CONTACT } from '../../utils/mutations';
import { useMutation } from '@apollo/client';


const ContactForm = () => {

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [addContact] = useMutation(ADD_CONTACT);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formState);
        try {
            await addContact({
                variables: { ...formState },
            });
        } catch (e) {
            console.error(e);
        }

        setFormState({
            name: "",
            email: "",
            message: "",
        });
    };




    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group d-flex justify-content-center align-items-center flex-column">
                        <label htmlFor="name" style={{ color: "#fafad2" }}>
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={formState.name}
                            name="name"
                            onChange={handleChange}
                            required
                            placeholder="Enter your name"
                            style={{ width: "200px", fontSize: "1.2rem", padding: "10px" }}
                        />
                    </div>
                    <div className="form-group d-flex justify-content-center align-items-center flex-column">
                        <label htmlFor="email" style={{ color: "#fafad2" }}>
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={formState.email}
                            name="email"
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            style={{ width: "200px", fontSize: "1.2rem", padding: "10px" }}
                        />
                    </div>
                    <div className="form-group d-flex justify-content-center align-items-center flex-column">
                        <label htmlFor="message" style={{ color: "#fafad2" }}>
                            Message
                        </label>
                        <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            required
                            placeholder="Minimum of 10 characters..."
                            style={{
                                width: "400px",
                                fontSize: "1.2rem",
                                padding: "10px",
                                height: "120px",
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{
                            borderRadius: "50px",
                            padding: "10px 20px",
                            backgroundColor: "#fafad2",
                            color: "black",
                        }}
                    >
                        DROP US A LINE
                    </button>
                </form>
            </div>
        </>
    )
}

export default ContactForm