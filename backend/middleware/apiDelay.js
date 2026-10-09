function apiDelay(req, res, next) {
  let delay = parseInt(req.query.delay, 10);

  if (Number.isNaN(delay)) delay = 0;

  delay = Math.max(0, Math.min(delay, 10000));

  setTimeout(next, delay);
}

module.exports = apiDelay;