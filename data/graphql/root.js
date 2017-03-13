import {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

import { RootType } from './types/root'

const Query = {
  root: {
    type: RootType,
    resolve: () => {
      return { greetings: 'Hello World' }
    }
  },
}

export default { Queries: Query } 
