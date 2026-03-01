import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Event = sequelize.define(
    "Event",

    {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },

        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },

        description: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },

        event_date: {
          type: DataTypes.DATEONLY, 
          allowNull: true, 
          defaultValue: null
        },

        location: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },

        type: {
          type: DataTypes.STRING(20),
          allowNull: false,
          defaultValue: "conference",
        },

        time_start: {
          type: DataTypes.TIME,
          allowNull: false,
          defaultValue: "00:00:00",
        },

        time_end: {
          type: DataTypes.TIME,
          allowNull: false,
          defaultValue: "00:00:00",
        },

        capacity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },

        enrolled: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },

        status: {
          type: DataTypes.STRING(20),
          allowNull: false,
          defaultValue: "DRAFT",
        },
    },

    {
    tableName: "events",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

export default Event;