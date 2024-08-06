const User = require("../models/User");
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const login = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, sub } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        googleId: sub,
        accessToken: token,
        refreshToken: token,
      });

      await user.save();
    }

    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login };
