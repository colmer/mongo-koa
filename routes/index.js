const Router = require('koa-router');
const router = new Router();
const users = require('../controllers/users');

router.get('/',
    async (ctx, next) => {
      ctx.body = ctx.render('./views/index.pug');
    }
);

router.get('/users', users.index);

router.get('/users/:id', users.show);

router.delete('/users/:id', users.destroy);

router.post('/users', users.create);

module.exports = router;
