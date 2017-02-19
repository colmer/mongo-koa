const events = require('events');
const ee = new events.EventEmitter();

exports.init = app => app.use(async (ctx, next) => {
        ctx.addMessage = (message) => {
            if (!message) {
                ctx.status = 400;
                ctx.body = 'Message can\'t be empty';
                return;
            }

            ee.emit('message', ctx.request.body.message);
            ctx.body = 'Ok';
        }

        ctx.subscribe = async () => {
            await new Promise(res => {
                ee.once('message', message => {
                    ctx.body = {
                        text: message
                    };
                    res();
                });
            });
        }

        await next();
    }
);
