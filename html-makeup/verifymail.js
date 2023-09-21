export const generateVerifyText = (email,code)=>{
    return `<html>
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                <tr>
                  <td align="center" bgcolor="#007bff" style="padding: 20px 0; color: #fff;">
                    <h1>Account Validation</h1>
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ffffff" style="padding: 20px;">
                    <p>Hello ${email},</p>
                    <p>Thank you for signing up! To validate your account, please use the following validation code:</p>
                    <p style="font-size: 24px; font-weight: bold; background-color: #f5f5f5; padding: 10px; border-radius: 5px;">${code}</p>
                    <p>If you didn't request this validation code, you can safely ignore this email.</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" bgcolor="#007bff" style="padding: 20px; color: #fff;">
                    <p>&copy; 2023 Your Company. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            `
}