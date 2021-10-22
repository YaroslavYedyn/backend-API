import {createModule, gql} from 'graphql-modules';

import {User} from '../../database';
import {IUser} from '../../interfaces';

export const user = createModule({
    id: 'user',
    typeDefs: [
        gql`
          input inputUser {
              email: String!,
              status: String!,
              gender: String!,
              password: String!,
              first_name: String!,
              last_name: String!,
              photo: String!,
          }
          type Mutation {
              createUser(input:inputUser):User
          }
      `
    ],
    resolvers: {
        Mutation: {
            createUser: async (a: any, {input:user}: any) => {
                console.log(user);
                console.log(a);
                const newUser: IUser = await User.create(user);

                return newUser;
            }
        }
    }
});
