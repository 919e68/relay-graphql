import Relay from 'react-relay';

const Root = {
  greetings: (Component, variables) => Relay.QL`
    query {
      root {
        ${Component.getFragment('root', {...variables})}
      }
    }
  `
}

export default Root