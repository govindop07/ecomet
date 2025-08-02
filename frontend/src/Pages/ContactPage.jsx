import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';

const ContactPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");

    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleMessage = (e) => setMessage(e.target.value);

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
        .sendForm('service_hnogn1j', 'template_moilpyd', form.current, {
            publicKey: 'CQ4Z8inI5ImUWHEOs',
        })
        .then(() => {
            setEmail("");
            setName("");
            setMessage("");
            setSuccess("Message Sent Successfully");
        }, (error) => {
            console.log('FAILED...', error.text);
        });
    };   
    
    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-12">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-center text-center mb-5">
                <h1 className="text-2xl gap-2 sm:text-3xl font-semibold text-slate-500">
                  CONTACT
                  <span className="text-blue-950"> US</span>
                </h1>
              </div>
                
                {success && <p className="text-green-600 mb-4 text-center font-medium">{success}</p>}
                
                <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6">
                    <input 
                        name='from_name'
                        type="text" 
                        placeholder='Your Name' 
                        required
                        className='h-12 rounded-lg bg-slate-200 px-4  focus:outline-none focus:ring-2 focus:ring-blue-400'
                        value={name}
                        onChange={handleName}
                    />
                    <input 
                        name='from_email'
                        type="email" 
                        placeholder='Your Email' 
                        required
                        className='h-12 rounded-lg bg-slate-200 px-4  focus:outline-none focus:ring-2 focus:ring-blue-400'
                        value={email}
                        onChange={handleEmail}
                    />
                    <textarea 
                        name='message'
                        placeholder='Message' 
                        rows="6"
                        required 
                        className='rounded-lg bg-slate-200 p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none'
                        value={message}
                        onChange={handleMessage}
                    />
                    <button 
                        type="submit" 
                        className='w-full rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg h-12 transition-colors duration-300'
                    >
                        Send
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ContactPage;
