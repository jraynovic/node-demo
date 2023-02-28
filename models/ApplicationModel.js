const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
class Application extends Model {}

Application.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    company:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    applicationDate:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    contactName:{
      type: DataTypes.STRING,
    },
    contactEmail:{
      type: DataTypes.STRING,
    },
    followUpFrequency:{
      type: DataTypes.NUMBER,
    },
    lastFollowUp:{
        type: DataTypes.DATE
    },
    notes:{
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "Applications",
  }
);

module.exports = Application;