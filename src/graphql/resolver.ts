import {User} from '../database';
import {IUser} from '../interfaces';

export const resolver = {
    test: () => 'hello graphql',
    addToUser: async ({user}: any) => {
        const newUser: IUser = await User.create(user);

        console.log(newUser);

        return User.find();
    }
};
