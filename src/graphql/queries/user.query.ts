import {createModule, gql} from 'graphql-modules';
import {User} from '../../database';
import {IUser} from '../../interfaces';

export const userModule = createModule({
    id: 'user-module',
    typeDefs: [
        gql`
          type User {
              _id: String,
              email: String,
              status: String,
              gender: String,
              password: String,
              first_name: String,
              last_name: String,
              photo: String,
              createAt: String,
          }

          type Query {
              getUser: User
              getUsers: [User]
              test:String
          }
      `
    ],
    resolvers: {
        Query: {
            getUser:async (id: string)=>{
                console.log(id);
                const user: IUser = await User.findOne();

                return user;
            },
            getUsers:async ()=>{
                const user: [IUser] = await User.find();

                return user;
            },
            test:()=>'hello  world!'
        }

    }

});

/* input UserInput {
    email: String!,
    gender: String,
    password: String!,
    first_name: String!,
    last_name: String,
    photo: String,
  } */
// export const schemaQ = buildSchema(`
//   type Query {
//     test: String
//   }
//
//   type Mutation {
//     addToUser(user:UserInput):[User]!
//   }
// `);
