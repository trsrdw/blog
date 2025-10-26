"use client";
import style from "./style.module.scss";
import { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import SvgIcon from "@/lib/utils/svg";
import { Loader } from "@/components/Layout/Loader/loader";

export default function FormSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [modal, setModal] = useState<{
        show: boolean;
        type: "success" | "error" | null;
        message?: string;
    }>({ show: false, type: null });

    const [loading, setLoading] = useState(false);

    const containerVariants: Variants = {
        hidden: { y: 40, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.2 } },
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                setModal({
                    show: true,
                    type: "error",
                    message: data?.error || "Email sending failed",
                });
                setFormData({ name: "", email: "", message: "" });
                return;
            }

            setFormData({ name: "", email: "", message: "" });
            setModal({
                show: true,
                type: "success",
                message: "Thank you for reaching out — I’ll get back to you soon!",
            });
        } catch (err) {
            console.error(err);
            setModal({
                show: true,
                type: "error",
                message: "Something went wrong. Please try again later.",
            });
        } finally {
            setLoading(false);
        }
    };

    const closePopup = () => setModal({ show: false, type: null, message: undefined });

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) closePopup();
    };

    return (
        <div id="form" className={style.contact}>
            <div className={style.heading}>
                <h1>Subscribe blog for latest updates</h1>
                <p>By submitting this you will be receiving our latest updates on post.</p>
            </div>

            <motion.form
                className={style.form}
                onSubmit={handleSubmit}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
            >
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                    />
                </label>

                <label>
                    Email
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                    />
                </label>

                <label>
                    Message
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Write your message..."
                    />
                </label>

                <motion.button
                    type="submit"
                    className={style.submit}
                    whileTap={{ scale: 0.95 }}
                    disabled={loading}
                >
                    {loading ? (
                        <Loader item />
                    ) : (
                        "Send Message"
                    )}
                </motion.button>

                <AnimatePresence>
                    {modal.show && (
                        <motion.div
                            className={style.modalOverlay}
                            onClick={handleOverlayClick}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className={style.modal}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <button className={style.closeBtn} onClick={closePopup}>
                                    ✕
                                </button>

                                {modal.type === "success" ? (
                                    <>
                                        <div className={`${style.logo} ${style.success}`}>
                                            <SvgIcon url={"/check.svg"} />
                                        </div>
                                        <p>{modal.message}</p>
                                    </>
                                ) : (
                                    <>
                                        <div className={`${style.logo} ${style.error}`}>
                                            <SvgIcon url={"/xmark.svg"} />
                                        </div>
                                        <p>{modal.message}</p>
                                    </>
                                )}

                                <motion.button
                                    className={style.okBtn}
                                    onClick={closePopup}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    OK
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.form>
        </div>
    );
}
