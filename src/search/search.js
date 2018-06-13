import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import Results from '../results/results';

class Search extends Component {
  state = {
    query: '',
    amount: 15,
    apiUrl: 'https://pixabay.com/api',
    apiKey: '9277766-c009666342bb29761ff6ea847',
    images: []
  };
  onTextChange = e => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === '') {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
              this.state.query
            }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then(res => this.setState({ images: res.data.hits }))
          .catch(err => console.log(err));
      }
    });
  };
  onAmountChange = (e, index, value) => this.setState({ amount: value });

  render() {
    console.log(this.state.images);
    return (
      <div id="controls">
        <TextField
          name="query"
          value={this.state.query}
          onChange={this.onTextChange}
          floatingLabelText="Search for images"
          fullwidth={true}
        />

        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={20} primaryText="20" />
          <MenuItem value={25} primaryText="25" />
          <MenuItem value={50} primaryText="50" />
          <MenuItem value={100} primaryText="100" />
          <MenuItem value={150} primaryText="150" />
          <MenuItem value={200} primaryText="200" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <Results images={this.state.images} />
        ) : null}
      </div>
    );
  }
}
export default Search;
