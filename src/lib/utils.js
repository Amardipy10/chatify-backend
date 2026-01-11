export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: ENV.NODE_ENV === "development" ? "lax" : "none",
    secure: ENV.NODE_ENV !== "development",
  });

  return token;
};