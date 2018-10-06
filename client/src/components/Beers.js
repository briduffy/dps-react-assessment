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
  scroller: { height: '80vh', overflow: 'auto' }
}

class Beers extends React.Component {
  state = {beers: [], page: 1, total_pages: 0 }

  componentDidMount() {
    axios.get('/api/all_beers')
      .then( res => {
        this.setState({ beers: res.data.entries, total_pages: res.data.total_pages })
      })
  }

  loadMore = () => {
    const page = this.state.page + 1
    axios.get(`/api/all_beers?page=${page}`)
      .then( ({data}) => {
        this.setState( state => {
          return { beers: [...state.beer, ...data.entries], page: state.page +1}
        })
      })
  }

  viewBeer = (name) => {
    const { beers } = this.state
    axios.put(`/api/beer/${name}`)
  }

  render() {
    return(
      <Container>
        <Header as='h2' textAlign='center'>BEERS</Header>
          <Card.Group styles={styles.scroller} itemsPerRow={5}>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadMore}
              hasMore={this.state.page < this.state.total_pages}
              useWindow={false}
            >
              {this.state.beers.map( beer =>
                <Card color='violet' centered key={beer.id}>
                  <Card.Content>
                    <Card.Header>
                      {beer.name}
                    </Card.Header>
                    <Card.Description>
                      {beer.description}
                    </Card.Description>
                    <Card.Content extra>
                      <Button animated='vertical' primary basic size='tiny' onClick={() => this.viewBeer(beer.name)}>
                        <Button.Content hidden>View</Button.Content>
                        <Button.Content visible>
                          <Icon name='bar'/>
                        </Button.Content>
                      </Button>
                    </Card.Content>
                  </Card.Content>
                </Card>                                                
              )}
            </InfiniteScroll>
          </Card.Group>
      </Container>
    )
  }
}

export default Beers
