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
  Table,
  FormControl 
} from '@sketchpixy/rubix'

class Companies extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  }

  render() {
    let companies = this.props.companies.companies

    let rows = companies.map((company, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{company.name}</td>
          <td>{company.email}</td>
        </tr>
      )
    })

    let table = (
      <Table responsive>
        <thead>
          <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    )

    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{paddingTop: 0}}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>Companies Page</h3>
                  {table}
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