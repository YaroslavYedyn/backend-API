import {buildSchema} from 'graphql';

export const schemaQ = buildSchema(`
  type Query {
    test: String
  }
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
  
  input UserInput {
    email: String!,
    gender: String,
    password: String!,
    first_name: String!,
    last_name: String,
    photo: String,
  } 
  
  type Mutation {
    addToUser(user:UserInput):[User]!
  }
`);
