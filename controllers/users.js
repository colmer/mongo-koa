const User = require('../models/user');

const index = async (ctx, next) => {
    let users = await User.find({});
    ctx.body = users;
}

const show = async (ctx, next) => {
    let user = await User.findOne({_id: ctx.params.id});
    console.log(user);
    ctx.body = new User(user).getPublicFields();
}

const destroy = async (ctx, next) => {
    let user = await User.findOne({_id: ctx.params.id});

    ctx.body = new User(user).getPublicFields();
}

const create = async (ctx, next) => {
    let user = new User(ctx.request.body);

    await user.save()
        .catch(({errors: {email, displayName}}) => {
            if (email) {
                ctx.status = 400;
                ctx.body = email.message
            }

            if (displayName) {
                ctx.status = 400;
                ctx.body = displayName.message
            }
        });

    ctx.body = user;
}

module.exports = {
    index: index,
    show: show,
    create: create,
    destroy: destroy
}
