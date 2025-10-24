import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <hello@tiarasdewi.com>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Contact Form Message from ${name}`,
            text: message,
            html: `
                <h3>New message from ${name}</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
    }
}
