'use client'

import {
    Facebook,
    Globe2,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Send,
    Share2,
} from "lucide-react";
import { useState } from "react";

const initialForm = {
    name: "",
    email: "",
    subject: "",
    message: "",
};

const contactInfo = [
    {
        label: "Email Us",
        value: "support@voltcart.com",
        icon: Mail,
    },
    {
        label: "Call Us",
        value: "+1-212-456-7890",
        icon: Phone,
    },
    {
        label: "Our Office",
        value: "794 San Francisco, CA 94102",
        icon: MapPin,
    },
];

const socials = [
    { label: "Website", icon: Globe2, href: "https://voltcart.com" },
    { label: "Share", icon: Share2, href: "/" },
    { label: "Instagram", icon: Instagram, href: "https://www.instagram.com" },
    { label: "Facebook", icon: Facebook, href: "https://www.facebook.com" },
];

export default function Contact() {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));

        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: "",
        }));
        setSuccessMessage("");
    };

    const validateForm = () => {
        const nextErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.name.trim()) {
            nextErrors.name = "Full name is required.";
        }

        if (!form.email.trim()) {
            nextErrors.email = "Email address is required.";
        } else if (!emailRegex.test(form.email.trim())) {
            nextErrors.email = "Please enter a valid email address.";
        }

        if (!form.subject.trim()) {
            nextErrors.subject = "Subject is required.";
        }

        if (!form.message.trim()) {
            nextErrors.message = "Message is required.";
        }

        return nextErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const nextErrors = validateForm();

        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            setSuccessMessage("");
            return;
        }

        console.log("Contact form submitted:", form);
        setSuccessMessage("Message sent successfully!");
        setForm(initialForm);
        setErrors({});
    };

    return (
        <main className="overflow-hidden bg-slate-50 text-slate-950">
            <section className="mx-6">
                <div className="mx-auto max-w-7xl pb-20 pt-14 sm:pt-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary">Contact Us</p>
                        <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 sm:text-6xl">
                            Get in touch
                        </h1>
                        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                            {"We're here to help. Whether you have questions about a product, shipping, or just want to say hi, our team is ready to assist."} 
                       </p>
                    </div>

                    <div className="mt-12 grid gap-6 lg:grid-cols-12">
                        <aside className="rounded-[1.75rem] bg-[#dbeafe] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-8 lg:col-span-5">
                            <h2 className="text-2xl font-semibold text-brand-primary">Contact Information</h2>
                            <div className="mt-8 space-y-6">
                                {contactInfo.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div key={item.label} className="flex items-center gap-4">
                                            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-brand-primary shadow-sm">
                                                <Icon size={20} />
                                            </span>
                                            <div>
                                                <p className="text-sm text-slate-600">{item.label}</p>
                                                <p className="mt-1 font-semibold text-slate-950">{item.value}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-12 flex flex-wrap gap-3">
                                {socials.map((social) => {
                                    const Icon = social.icon;

                                    return (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            aria-label={social.label}
                                            className="flex size-11 items-center justify-center rounded-full border border-brand-primary text-brand-primary transition hover:scale-110 hover:bg-brand-primary hover:text-white"
                                        >
                                            <Icon size={18} />
                                        </a>
                                    );
                                })}
                            </div>
                        </aside>

                        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
                            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                                <div className="group">
                                    <label htmlFor="name" className="text-sm font-medium text-slate-950 transition group-focus-within:text-brand-primary">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                                    />
                                    {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="group">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-950 transition group-focus-within:text-brand-primary">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                                    />
                                    {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                                </div>

                                <div className="group">
                                    <label htmlFor="subject" className="text-sm font-medium text-slate-950 transition group-focus-within:text-brand-primary">
                                        Subject
                                    </label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder="How can we help?"
                                        className="mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                                    />
                                    {errors.subject && <p className="mt-2 text-sm text-red-500">{errors.subject}</p>}
                                </div>

                                <div className="group">
                                    <label htmlFor="message" className="text-sm font-medium text-slate-950 transition group-focus-within:text-brand-primary">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Write your message here..."
                                        rows={6}
                                        className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-brand-primary focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                                    />
                                    {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-brand-primary px-6 text-sm font-semibold text-white transition hover:scale-[1.02] hover:opacity-90 active:scale-95"
                                >
                                    Send Message
                                    <Send size={18} />
                                </button>

                                {successMessage && (
                                    <p className="rounded-lg bg-brand-secondary/10 px-4 py-3 text-sm font-medium text-brand-secondary">
                                        {successMessage}
                                    </p>
                                )}
                            </form>
                        </section>

                        <section className="group relative min-h-[320px] overflow-hidden rounded-[1.75rem] bg-slate-900 shadow-sm grayscale transition duration-500 hover:grayscale-0 lg:col-span-12">
                            <iframe
                                title="VoltCart HQ location map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2616.7203648329887!2d-7.6156121099497005!3d33.030260962078366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda61aabf2a6a8b9%3A0xe6a579c28d993de9!2sFacult%C3%A9%20des%20sciences%20et%20techniques!5e1!3m2!1sar!2sma!4v1780778798125!5m2!1sar!2sma"
                                className="absolute inset-0 h-full w-full border-0"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            
                        </section>
                    </div>
                </div>
            </section>
        </main>
    );
}
