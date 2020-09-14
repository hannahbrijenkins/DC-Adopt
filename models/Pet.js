const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../config/connection`);

class Pet extends Model {}

Pet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        info: {
            type: DataTypes.STRING,
            allowNull: false
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        health_conditions: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false
        },
        neutered: {
            type: DataTypes.STRING,
            allowNull:false
        },
        house_trained: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        adoption_fee: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: `pet`
    }
);

module.exports = Pet;

