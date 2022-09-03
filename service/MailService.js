const nodemailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendOrderDoneMail(name, email, phone, city) {
        await this.transporter.sendMail({
            from:process.env.SMTP_USER,
            to:process.env.OWNER,
            subject: `New order on ${process.env.API_URL}`,
            text: '',
            html:
                `
                    <div>
                        <h1>New order from user ${name}</h1>
                        <p>
                        User credentials: <br />
                        Name: ${name} <br />
                        Email: ${email} <br />
                        Phone: ${phone} <br />
                        City: ${city}
                         </p>
                    </div>
                `
        })
    }
}

module.exports = new MailService()