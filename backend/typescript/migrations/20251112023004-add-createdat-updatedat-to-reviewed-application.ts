import { DataType } from "sequelize-typescript";
import { Migration } from "../umzug";

const TABLE_NAME = "reviewed_applicant_records";

export const up: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().addColumn(TABLE_NAME, "createdAt", {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })

    await sequelize.getQueryInterface().addColumn(TABLE_NAME, "updatedAt", {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
};

export const down: Migration = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().removeColumn(TABLE_NAME, "createdAt");
    await sequelize.getQueryInterface().removeColumn(TABLE_NAME, "updatedAt");
};
