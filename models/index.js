const User = require(`./User`);
const Pet = require(`./Pet`);
const SavedPet = require(`./SavedPet`);

User.hasMany(Pet, {
    foreignKey: `user_id`
});

Pet.belongsTo(User, {
    foreignKey: `user_id`
});

SavedPet.belongsTo(User, {
    foreignKey: `user_id`
});

User.hasMany(SavedPet, {
    foreignKey: `user_id`
});

Pet.hasMany(SavedPet, {
    foreignKey: `pet_id`
});

module.exports = { User, Pet, SavedPet };