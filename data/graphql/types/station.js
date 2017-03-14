import { 
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType
} from 'graphql'

import moment from 'moment'

const ProductFields = {
  pumpId: {
    type: GraphQLInt
  },
  name: {
    type: GraphQLString
  },
  price: {
    type: GraphQLFloat
  },
  updatedAt: {
    type: GraphQLString,
    resolve: (product) => {
      return moment(product.updatedAt).format('MM/DD/YYYY hh:mmA')
    }
  }
}

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: ProductFields
})

const ProductInput = new GraphQLInputObjectType({
  name: 'ProductInput',
  fields: ProductFields
})

const ziplineFields = {
  storeId: {
    type: GraphQLInt
  }
}

const ZiplineType = new GraphQLObjectType({
  name: 'Zipline',
  fields: ziplineFields
})

const ZiplineInput = new GraphQLInputObjectType({
  name: 'ZiplineInput',
  fields: ziplineFields
})

const StationType = new GraphQLObjectType({
  name: 'Station',
  fields: {
    _id: {
      type: GraphQLID
    },
    ownerId: {
      type: GraphQLID
    },
    geohash: {
      type: GraphQLString
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve: (station) => {
        return station.products
      }
    },
    currency: {
      type: GraphQLString
    }, 
    phoneNumber: {
      type: GraphQLString
    },
    address: {
      type: GraphQLString
    },
    lat: {
      type: GraphQLFloat
    },
    lng: {
      type: GraphQLFloat
    },
    brand: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (station) => {
        return moment(station.updatedAt).format('MM/DD/YYYY hh:mmA')
      }
    },
    fullAddress: {
      type: GraphQLString
    },
    zipline: {
      type: ZiplineType
    },
    pumpIds: {
      type: new GraphQLList(GraphQLInt),
      resolve: (station) => {
        return station.pumpIds
      }
    },
    readyForSale: {
      type: GraphQLBoolean
    }
  }
})

const StationInput = new GraphQLInputObjectType({
  name: 'StationInput',
  fields: {
    _id: {
      type: GraphQLID
    },
    ownerId: {
      type: GraphQLID
    },
    geohash: {
      type: GraphQLString
    },
    products: {
      type: new GraphQLList(ProductInput)
    },
    currency: {
      type: GraphQLString
    }, 
    phoneNumber: {
      type: GraphQLString
    },
    address: {
      type: GraphQLString
    },
    lat: {
      type: GraphQLFloat
    },
    lng: {
      type: GraphQLFloat
    },
    brand: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    },
    fullAddress: {
      type: GraphQLString
    },
    zipline: {
      type: ZiplineInput
    },
    pumpIds: {
      type: new GraphQLList(GraphQLInt)
    },
    readyForSale: {
      type: GraphQLBoolean
    }
  }
})

export { StationType, StationInput }