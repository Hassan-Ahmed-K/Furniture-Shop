import transporter from "../SMTP_Setup.js"

export const send_email = async (req, res) => {
    console.log("req.body: ", req.body);
    const {to, subject, message} = req.body;


    try{
        await transporter.sendMail({
            from: process.env.GMAIL_EMAIL,
            to,
            subject,
            text: message,
        });

        res.status(200).json({message: "Email sent Successfully" });

    } catch(err){
        res.status(500).json({message: "Error sending email", error: err.message})
    }
}