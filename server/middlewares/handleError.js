export default function handleError(err, req, res, next) {
  err && res.status(500).send(err.message);
}
