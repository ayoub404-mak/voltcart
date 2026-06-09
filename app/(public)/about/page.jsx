'use client'

import { assets } from "@/assets/assets";
import { ArrowRight, Check, Gem, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const values = [
    {
        title: "Innovation",
        description: "We search for clever, useful products that make daily routines faster, simpler, and more enjoyable.",
        icon: Sparkles,
        className: "bg-brand-primary/80 text-white md:col-span-2",
        iconClassName: "bg-white/15 text-white",
    },
    {
        title: "Quality",
        description: "Every featured item is chosen with durability, usability, and customer confidence in mind.",
        icon: Gem,
        className: "bg-white text-slate-800",
        iconClassName: "bg-brand-primary/10 text-brand-primary",
    },
    {
        title: "Integrity",
        description: "Clear pricing, honest merchandising, and dependable support guide every shopping experience.",
        icon: ShieldCheck,
        className: "bg-white text-slate-800 md:col-span-3",
        iconClassName: "bg-brand-secondary/10 text-brand-secondary",
    },
];

const commitments = [
    "Curated products from trusted sellers and growing local stores.",
    "A smoother cart-to-doorstep experience with transparent updates.",
    "Responsive support that treats every customer like a long-term relationship.",
];

function useRevealOnScroll() {
    const containerRef = useRef(null);

    useEffect(() => {
        const elements = containerRef.current?.querySelectorAll("[data-reveal]");

        if (!elements?.length) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("opacity-100", "translate-y-0");
                        entry.target.classList.remove("opacity-0", "translate-y-8");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.18 }
        );

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    return containerRef;
}

export default function About() {
    const revealRef = useRevealOnScroll();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleNewsletterSubmit = (event) => {
        event.preventDefault();

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

        if (!isValidEmail) {
            setMessage("Please enter a valid email address.");
            return;
        }

        console.log("Newsletter subscription:", email.trim());
        setMessage("Thanks for subscribing!");
        setEmail("");
    };

    return (
        <main ref={revealRef} className="overflow-hidden bg-slate-50 text-slate-800">
            <section data-reveal className="mx-6 translate-y-8 opacity-0 transition-all duration-700 ease-out">
                <div className="relative mx-auto my-8 flex min-h-[560px] max-w-7xl items-end overflow-hidden rounded-[2rem] bg-slate-900 px-5 py-12 sm:px-10 lg:px-16">
                    <Image
                        src={assets.about}
                        alt="VoltCart shopping experience"
                        fill
                        priority
                        className="object-cover object-right-bottom opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20" />
                    <div className="relative max-w-3xl">
                        <span className="inline-flex rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                            Our Mission
                        </span>
                        <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-6xl lg:text-about-hero">
                            Making smart shopping feel effortless.
                        </h1>
                        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                            VoltCart brings thoughtful gadgets, trusted stores, and a simpler checkout into one place so every order feels easy from discovery to delivery.
                        </p>
                    </div>
                </div>
            </section>

            <section data-reveal className="mx-6 translate-y-8 opacity-0 transition-all duration-700 ease-out">
                <div className="mx-auto grid max-w-7xl items-center gap-10 py-16 md:grid-cols-[0.95fr_1.05fr] lg:gap-16">
                    <div className="relative">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-indigo-100 shadow-2xl shadow-slate-200">
                            <Image
                                src={assets.about2}
                                alt="Curated VoltCart product"
                                fill
                                className="object-contain p-10"
                            />
                        </div>
                        <div className="absolute -bottom-6 left-5 rounded-2xl bg-white px-6 py-5 shadow-xl shadow-slate-300/60 sm:left-10">
                            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">Established</p>
                            <p className="mt-1 text-4xl font-semibold text-brand-secondary">2021</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary">Our Story</p>
                        <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-900 sm:text-5xl">
                            Built for shoppers who want less noise and better choices.
                        </h2>
                        <p className="mt-6 text-base leading-8 text-slate-600">
                            We started VoltCart with a simple idea: online shopping should feel curated, reliable, and human. From everyday accessories to standout tech, our marketplace helps customers discover products that fit their lives while giving stores a clean way to reach them.
                        </p>
                        <Link
                            href="/shop"
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition hover:scale-105 hover:bg-brand-primary-dark active:scale-95"
                        >
                            Explore products
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            <section data-reveal className="mx-6 translate-y-8 opacity-0 transition-all duration-700 ease-out">
                <div className="mx-auto max-w-7xl py-16">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-secondary">Values</p>
                        <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-5xl">What guides every VoltCart experience.</h2>
                    </div>
                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {values.map((value) => {
                            const Icon = value.icon;

                            return (
                                <article
                                    key={value.title}
                                    className={`${value.className} min-h-64 rounded-3xl p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl`}
                                >
                                    <div className={`${value.iconClassName} flex size-12 items-center justify-center rounded-2xl`}>
                                        <Icon size={22} />
                                    </div>
                                    <h3 className="mt-8 text-2xl font-semibold">{value.title}</h3>
                                    <p className="mt-4 max-w-xl leading-7 opacity-80">{value.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section data-reveal className="mx-6 translate-y-8 opacity-0 transition-all duration-700 ease-out">
                <div className="mx-auto my-12 grid max-w-7xl gap-10 overflow-hidden rounded-[2rem] bg-slate-950 px-5 py-12 text-white sm:px-10 lg:grid-cols-[1fr_0.85fr] lg:px-14 lg:py-16">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-300">Our Commitment</p>
                        <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
                            Reliable shopping, thoughtful support, and better everyday products.
                        </h2>
                        <div className="mt-8 space-y-5">
                            {commitments.map((item) => (
                                <div key={item} className="flex gap-4">
                                    <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-secondary">
                                        <Check size={16} />
                                    </span>
                                    <p className="leading-7 text-slate-300">{item}</p>
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/create-store"
                            className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 transition hover:scale-105 hover:bg-indigo-100 active:scale-95"
                        >
                            Start selling
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                    <div className="relative min-h-80 overflow-hidden rounded-[1.5rem] bg-slate-900">
                        <Image
                            src={assets.about3}
                            alt="VoltCart featured offer"
                            fill
                            className="object-contain p-10"
                        />
                    </div>
                </div>
            </section>

            <section data-reveal className="mx-6 translate-y-8 opacity-0 transition-all duration-700 ease-out">
                <div className="mx-auto max-w-4xl py-20 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary">Newsletter</p>
                    <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-5xl">Get the latest VoltCart finds.</h2>
                    <form onSubmit={handleNewsletterSubmit} className="mx-auto mt-9 flex w-full max-w-2xl flex-col gap-3 rounded-[2rem] bg-white p-2 shadow-xl shadow-slate-200 sm:flex-row">
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter your email address"
                            className="min-h-14 flex-1 rounded-full px-5 text-sm outline-none ring-brand-primary/20 focus:ring-2"
                            aria-label="Email address"
                        />
                        <button
                            type="submit"
                            className="min-h-14 rounded-full bg-brand-primary px-7 text-sm font-semibold text-white transition hover:scale-105 hover:bg-brand-primary-dark active:scale-95"
                        >
                            Subscribe
                        </button>
                    </form>
                    {message && <p className="mt-4 text-sm font-medium text-brand-secondary">{message}</p>}
                </div>
            </section>
        </main>
    );
}
