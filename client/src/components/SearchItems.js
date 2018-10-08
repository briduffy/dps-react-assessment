import React from 'react'
import { Search } from 'semantic-ui-react'

class SearchItems extends React.Component {
  state = {term: ''}

  handleSearchChange = (e) => {
    const { name, value } = e.target
    this.setState({term})
    this.props.onSearchTermChange(term)
  }

  render() {
    return (
      <Search
        {...this.props}
        size='medium'
        fluid
        name='term'
        autofocus
        label='term'
        value={this.state.term}
        placeholder='...search.'
        onChange={e => this.handleSearchChange(e.target.value)}
      />
    )
  }
}

export default SearchItems