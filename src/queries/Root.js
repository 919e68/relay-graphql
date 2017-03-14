import Relay from 'react-relay';

const Root = {
  root: (Component, variables) => Relay.QL`
    query {
      root {
        ${Component.getFragment('root', {...variables})}
      }
    }
  `
}

export default Root