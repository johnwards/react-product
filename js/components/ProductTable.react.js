
var React = require("react");
var ReactDOM = require("react-dom");
var $ = require('jquery-browserify');

class ProductRow extends React.Component 
{
    render()
    {
        var product = this.props.product;
        return (
            <li className="list-group-item">{product.Title.TitleText}</li> 
        );
    }
}

class Products extends React.Component 
{
    render()
    {
        var rows = [];
        var filterText = this.props.filterText;
        for (let i in this.props.products)
        {
            var product = this.props.products[i];
            // Simple search in the title for the filter words
            if (product.Title.TitleText.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
                //No Match, moving on
                continue;
            }
            var rowKey = i + product.Title.TitleText;
            rows.push(<ProductRow product={product} key={rowKey} />);
        }
        return (
            <ul className="list-group">{rows}</ul>
        );
    }
}

class SearchBar extends React.Component 
{
    constructor() 
    {
        super();
        // This bubbles the change to the search input back to the callback in parent
        this.handleChange = () => 
        {
            this.props.onUserInput(
                ReactDOM.findDOMNode(this.refs.filterTextInput).value
            );
        }
    }

    render() 
    {
        return (
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search for..." 
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange} />
            </div>
        );
    }
}

class ProductTable extends React.Component 
{
    constructor() 
    {
        super()
        //Set defaults
        this.state = {
            filterText: ""
        }
        // This is called by search bar when input is entered
        // Updates the state, which causes an update to the UI
        this.handleUserInput = filterText => 
        {
            this.setState({
                filterText: filterText
            });
        }
    }

    render() 
    {
        return (
            <div>
                <SearchBar 
                    filterText={this.state.filterText}
                    onUserInput={this.handleUserInput} />
                <Products 
                    products={this.props.products} 
                    filterText={this.state.filterText} />
            </div>
        );
    }
}

module.exports = ProductTable;
