const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../config/connection`);

class SavedPet extends Model {}

SavedPet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: `user`,
                key: `id`
            }
        },
        pet_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: `pet`,
                key: `id`
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: `savedpet`
    }
);

module.exports = SavedPet;