import sendEmail from '../middlewares/mailer.js'
import User from '../models/user.model.js'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const recover = async (req, res) => {
    await User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user)
                return res.send({
                    success:false,
                    message:
                        'The email address ' +
                        req.body.email +
                        ' is not associated with any account. Double-check your email address and try again.',
                })

            //Generate and set password reset token
            user.generatePasswordReset()

            // Save the updated user object
            user.save()
                .then((user) => {
                    // send email
                    sendEmail(user.email, "Password Reset", user.resetPasswordToken);
                    res.send({
                        success:true,
                        message:"OTP generated"
                    });
                })
                .catch((err) => res.send({ message: err.message }))
        })
        .catch((err) => res.send({ message: err.message }))
}

export const reset = async (req, res) => {
    await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
    })
        .then((user) => {
            if (!user)
                return res.status(401).json({
                    message: 'Password reset token is invalid or has expired!',
                })

            //Redirect user to form
            res.render('reset', { user })
        })
        .catch((err) => res.status(500).json({ message: err.message }))
}

export const resetPassword = async (req, res) => {
    await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() },
    }).then((user) => {
        if (!user)
            return res.status(401).json({
                message: 'Password reset token is invalid or has expired!',
            })

        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined

        user.save((err) => {
            if (err) return res.status(500).json({ message: err.message })

            // send email
            const mailOptions = {
                to: user.email,
                from: process.env.FROM_EMAIL,
                subject: 'Your password has been changed',
                text: `Hi ${user.username} \n 
                    This is a confirmation that the password for your account ${user.email} has just been changed.\n`,
            }

            sgMail.send(mailOptions, (error, result) => {
                if (error)
                    return res.status(500).json({ message: error.message })

                res.status(200).json({
                    message: 'Your password has been updated.',
                })
            })
        })
    })
}
export const findByEmail = async (req, res) => {
    const user = await User.findOne({ email: req.body.email }).lean();
    if (user) {
      return res.send({
        success: true,
        user,
      });
    } else {
      return res.send({
        success: false,
        message: 'Error, user not found',
      });
    }
  };
  