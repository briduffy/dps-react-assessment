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
  Image,
} from 'semantic-ui-react'

const styles = {
  scroller: { height: '80vh', overflow: 'auto' },
  container: { backgroundColor: 'white' },
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
      .then( ({data, headers }) => {
        this.setState( state => {
          return { beers: [...state.beers, ...data.entries], page: state.page +1}
        })
      })
  }

  render() {
    return(
      <Container styles={styles.container}>
        <Header as='h2' textAlign='center'>BEERS</Header>
          <InfiniteScroll
                pageStart={0}
                loadMore={this.loadMore}
                hasMore={this.state.page < this.state.total_pages}
                useWindow={false}
              >
            <Card.Group styles={styles.scroller} itemsPerRow={1}>
                {this.state.beers.map( (beer, b) =>
                  <Card color='violet' centered key={b}>
                    <Card.Content>
                      <Card.Header>
                        {beer.name}
                      </Card.Header>
                      <Card.Description>
                        {beer.description}
                        <Button
                          floated='right'
                          animated='vertical'
                          color='violet'
                          href={`/beer/${beer.name}`}
                          rel="noopener norefferer"
                        >
                          <Button.Content hidden>View</Button.Content>
                          <Button.Content visible>
                            <Icon name='bar'/>
                          </Button.Content>
                        </Button>
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

export default Beers
