import React from 'react';
import PropTypes from 'prop-types';

export default class ContentSorter extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedSort: PropTypes.string.isRequired,
    selectedSecondarySort: PropTypes.string.isRequired,
    setSort: PropTypes.func.isRequired,
    setSecondarySort: PropTypes.func.isRequired,
  }

  static RenderSortOption(optionValue) {
    return (
      <option
        key={optionValue}
        value={optionValue}
      >
        {optionValue}
      </option>
    );
  }

  constructor(props) {
    super(props);

    this.setSort = this.setSort.bind(this);
    this.setSecondarySort = this.setSecondarySort.bind(this);
  }

  setSort(event) {
    this.props.setSort(event.target.value);
  }

  setSecondarySort(event) {
    this.props.setSecondarySort(event.target.value);
  }

  render() {
    const {
      options,
      selectedSort,
      selectedSecondarySort,
    } = this.props;

    return (
      <div id='content-list-sorter-container' className='border-primary container mb-2'>
        <form className='form-inline'>
          <div className='form-group mr-3'>
            <select
              id='content-list-sorter'
              className='form-control'
              value={selectedSort}
              onChange={this.setSort}
            >
              { options.map(ContentSorter.RenderSortOption) }
            </select>
            <select
              id='content-list-sorter-secondary'
              className='form-control'
              value={selectedSecondarySort}
              onChange={this.setSecondarySort}
            >
              { options.map(ContentSorter.RenderSortOption) }
            </select>
          </div>
        </form>
      </div>
    );
  }
}
