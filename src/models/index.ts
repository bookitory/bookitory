import sequelize from '@database/sequelize'
import MemberModel from './member';

const DB = {
    sequelize,
    member: MemberModel(sequelize)
}

export default DB;