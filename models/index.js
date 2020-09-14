const User = require(`./User`);
const Post = require(`./Post`);
const Pet = require(`./Pet`);

User.hasMany(Post, {
    foreignKey: `user_id`
});

Post.belongsTo(User, {
    foreignKey: `user_id`
});

Pet.belongsTo(User, {
    foreignKey: `user_id`
});

module.exports = { User, Post, Pet };