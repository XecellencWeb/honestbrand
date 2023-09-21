export const generateMessageText = (message)=>{
    return `<html>
    <body style="font-family: Arial, sans-serif; background-color: #f0f0f0; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.1); border-radius: 5px;">
            <div style="background-color: powderblue; color: #ffffff; padding: 10px; text-align: center;">
                <h1 style="color:#fff;line-height:1.1">${message?.subject} from ${message?.email}</h1>
            </div>
            <div style="padding: 20px;">
                <p>Hello, am ${message?.name}</p>
                <p>${message?.stack}</p>
                <p>Regards, to you Sir</p>
                <p>${message?.name}</p>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #888888;">
                <p>&copy; 2023 Honest Brand</p>
            </div>
        </div>
    </body>
    </html>
    `
}