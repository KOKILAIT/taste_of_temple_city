// pages/api/welcome.js

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ message: "Welcome to our API!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
