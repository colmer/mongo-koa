// in-memory store by default (use the right module instead)
const session = require('koa-generic-session');
const convert = require('koa-convert');

/*
  const sessions = {
    [id]: { count: 5 }
  }

  ctx.session.xs
*/

exports.init = app => app.use(convert(session({
  cookie: {
    signed: false
  }
})));
