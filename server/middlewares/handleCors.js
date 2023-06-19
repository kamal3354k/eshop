export default function handleCors(req, res, next) {
  // Allow requests from any origin
  res.header("Access-Control-Allow-Origin", "*");

  // Allow specific headers
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Allow specific HTTP methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // Continue to the next middleware
  next();
}
