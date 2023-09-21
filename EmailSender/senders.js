import sender from 'nodemailer'
export const josiah = sender.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.gmail,
        pass: process.env.password
    }
})