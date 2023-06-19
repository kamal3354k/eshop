export default function handleError(err, req, res, next) {
  console.log(err);
  err &&
    res.status(400).json({
      status: err.status,
      message: err.message,
    });
}
