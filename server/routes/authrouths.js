const authRoute = async (req, res) => {
  try {
    // also read post delete update methods can be perform
    res.json({
      status: true,
      message: "this is only for auth users",
      info: req.user,
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};
module.exports = { authRoute };
