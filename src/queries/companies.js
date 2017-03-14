import Relay from 'react-relay';

const Companies = {
  companies: (Component, variables) => Relay.QL`
    query {
      viewer {
        ${Component.getFragment('companies', {...variables})}
      }
    }
  `
}

export default Companies