const User = require('../models/user');

const index = async (ctx, next) => {
    let users = await User.find({});
    ctx.body = users;
}

const show = async (ctx, next) => {
    let user = await User.findOne({_id: ctx.params.id});

    if (user === null) {
        ctx.status = 404;
        ctx.body = 'Not found';
    } else {
        ctx.body = new User(user).getPublicFields();
    }
}

const destroy = async (ctx, next) => {
    let user = await User.findOneAndRemove({_id: ctx.params.id});
    
    if (user === null) {
        ctx.status = 404;
        ctx.body = 'Not found';
    } else {
        ctx.body = user;
    }
}

const update = async (ctx, next) => {
    await User.findOneAndUpdate(
        {_id: ctx.params.id},
        ctx.request.body,
        { new: true, runValidators: true }
    )
    .then((res) => {
        ctx.body = res;
    })
    .catch(e => {
        if (e.name === 'CastError') {
            ctx.status = 400;
            ctx.body = e.message;
        }
        
        createErrors(e, ctx);
    });
}

const create = async (ctx, next) => {
    let user = new User(ctx.request.body);

    await user.save()
        .then(() => {
            ctx.body = user.getPublicFields();
        })
        .catch((e) => {
            createErrors(e, ctx);
        });
}

function createErrors(e, ctx)  {
    if (e.name === 'MongoError' && e.code == 11000) {
        ctx.status = 400;
        ctx.body = 'Такой email уже существует';
    }

    if (e.errors && e.errors.email) {
        ctx.status = 400;
        ctx.body = e.errors.email.message
    }

    if (e.errors && e.errors.displayName) {
        ctx.status = 400;
        ctx.body = e.errors.displayName.message;
    }
}

module.exports = {
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy
}
