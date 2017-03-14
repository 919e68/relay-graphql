import React from 'react'
import Relay from 'react-relay'

import {
  PanelContainer,
  Panel,
  PanelBody,
  Grid,
  Row,
  Col,
  Form,
  FormControl 
} from '@sketchpixy/rubix'

class Companies extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  }

  render() {
    let companies = this.props.companies.companies
    console.log(companies)

    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{paddingTop: 0}}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>Companies Page</h3>
                </Col>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    )
  }
}

export default Companies