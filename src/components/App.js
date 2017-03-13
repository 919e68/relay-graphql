import React from 'react'
import Relay from 'react-relay'

import Footer from '../common/footer'
import Header from '../common/header'
import Sidebar from '../common/sidebar'

import { 
  Grid,
  Row,
  Col,
  MainContainer
} from '@sketchpixy/rubix'

class App extends React.Component {
  render() {
    return (
      <MainContainer {...this.props}>
        <Sidebar />
        <Header />
        <div id='body'>
          <Grid>
            <Row>
              <Col xs={12}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
        <Footer />
      </MainContainer>
    )
  }
}

export default App
