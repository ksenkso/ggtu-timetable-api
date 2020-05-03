import { BeforeSave, Column, Model, Table } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

const hashPassword = async (password) => {
    if (!password) {
        throw new Error('Password shouldn\'t be an empty string.');
    } else {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
};
@Table
export class User extends Model<User> {
    @Column
    username: string

    @Column
    password: string

    @BeforeSave
    static async updatePassword(model: User) {
        if (model.changed('password')) {
            model.password = await hashPassword(model.password);
        }
    }

    async comparePassword(pw) {
        try {
            return await bcrypt.compare(pw, this.password);
        } catch (e) {
            console.error(JSON.stringify(e));
            return false;
        }
    }

    withoutPassword() {
        const json = this.toJSON() as any;
        delete json.password;
        return json;
    }
}
