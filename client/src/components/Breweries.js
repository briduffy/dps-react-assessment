import React from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import {
  Header,
  Container,
  Card,
  Button,
  Icon,
} from 'semantic-ui-react'

const styles = {
  scroller: { height: '80vh', overflow: 'auto' },
  container: { backgroundColor: 'white' },
}

class Breweries extends React.Component {
  state = {breweries: [], page: 1, total_pages: 0 }

  componentDidMount() {
    axios.get('/api/all_breweries')
      .then( res => {
        this.setState({ breweries: res.data.entries, total_pages: res.data.total_pages })
      })
  }

  loadMore = () => {
    const page = this.state.page + 1
    axios.get(`/api/all_breweries?page=${page}`)
      .then( ({data, headers }) => {
        this.setState( state => {
          return { breweries: [...state.breweries, ...data.entries], page: state.page +1}
        })
      })
  }

  render() {
    return(
      <Container styles={styles.container}>
        <Header as='h2' textAlign='center'>BREWERIES</Header>
          <InfiniteScroll
                pageStart={0}
                loadMore={this.loadMore}
                hasMore={this.state.page < this.state.total_pages}
                useWindow={false}
              >
            <Card.Group styles={styles.scroller} itemsPerRow={1}>
                {this.state.breweries.map( (brewery, b) =>
                  <Card color='violet' centered key={b}>
                    <Card.Content>
                      <Card.Header>
                        {brewery.name}
                      </Card.Header>
                      <Card.Description>
                        <Card.Meta>
                          {brewery.description}
                        </Card.Meta>
                        <Card.Meta>
                          {brewery.website}
                        </Card.Meta>
                      </Card.Description>
                    </Card.Content>
                  </Card>                                                
                )}
              </Card.Group>
          </InfiniteScroll>
      </Container>
    )
  }
}

export default Breweries
