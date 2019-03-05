export default (req, res, next) => {
  res.write('ok')
  res.statusCode = 200
  res.end()
}
