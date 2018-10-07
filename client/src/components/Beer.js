import React from 'react'
import axios from 'axios'
import {
  Container,
  Card,
} from 'semantic-ui-react'

const styles = {
  container: { backgroundColor: 'white' },
}

class Beer extends React.Component {
  state = { beer: [] }

  componentDidMount() {
    const { name } = this.props.match.params
    axios.get(`api/beer/${name}`)
      .then( res => this.setState({ beer: res.data.entries[0] }) )
  }

  render() {
    const {beer} = this.state
    return (
      <Container styles={styles.container}>
        <Card.Group itemsPerRow={1}>
            <Card key={beer}>
              <Card.Header>
                {beer.name}
              </Card.Header>
              <Card.Content>
                ABV: {beer.abv}
              </Card.Content>
              <Card.Content>
                Description: {beer.description}
              </Card.Content>
            </Card>
        </Card.Group>
      </Container>
    )
  }
}

export default Beer