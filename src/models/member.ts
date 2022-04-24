import { Model, DataTypes, Sequelize } from "sequelize";

interface MemberAttributes {
    email : string
    pwd : string
    profile : string
}

class MemberModel extends Model<MemberAttributes> {
    public email!: string;
    public pwd!: string;
    public profile! : string;
}

export default function(sequelize: Sequelize): typeof MemberModel {
    MemberModel.init(
        {
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                primaryKey: true
            },
            pwd: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            profile: {
                type: DataTypes.STRING(255),
                allowNull: true
            }
        },
        {
            modelName: 'member',
            tableName: 'member',
            sequelize,
            timestamps: false
        }
    );

    return MemberModel;
}