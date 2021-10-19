import {model, Model, Schema} from 'mongoose';
import {UserStatusEnum} from '../../constants';

const userSchema: Schema = new Schema<any>({
    email: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        default: UserStatusEnum.PAID,
        required: true
    },
    gender: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: false
    },
    photo: {
        type: String,
        required: false
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});

export const User: Model<any> = model('users', userSchema);
