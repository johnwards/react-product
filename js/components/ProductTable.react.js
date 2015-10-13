
var React = require("react");
var ReactDOM = require("react-dom");
var $ = require('jquery-browserify');

class ProductRow extends React.Component 
{
    render()
    {
        var product = this.props.product;
        return (
            <li className="list-group-item">({product.id}) {product.title}</li> 
        );
    }
}

class Products extends React.Component 
{
    render()
    {
        var rows = [];
        var filterText = this.props.filterText;
        this.props.products.forEach(product => {
            if (product.title.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
                return;
            }
            rows.push(<ProductRow product={product} key={product.id} />);
        });
        return (
            <ul className="list-group">{rows}</ul>
        );
    }
}

class SearchBar extends React.Component 
{
    handleChange() 
    {
        this.props.onUserInput(
            ReactDOM.findDOMNode(this.refs.filterTextInput).value
        );
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
        this.state = {
            filterText: "",
            products: new Set()
        }
    }
    
    transformRemoteDataToLocal(remoteData) 
    {
        // There is a lot of data in the ajax call, we only need a small proprtion for this widget
        var returnData = new Set();
        if (remoteData.worksById) {
            for (var productId in remoteData.worksById) {
                returnData.add({
                    "id": productId,
                    "title": remoteData.worksById[productId].Title.TitleText
                });
            }
        }
        return returnData;
    }

    componentDidMount() 
    {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: data => {
                this.setState({
                    products: this.transformRemoteDataToLocal(data)
                });
            }.bind(this),
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleUserInput(filterText) 
    {
        this.setState({
            filterText: filterText
        });
    }

    render() 
    {
        return (
            <div>
                <SearchBar 
                    filterText={this.state.filterText}
                    onUserInput={this.handleUserInput} />
                <Products 
                    products={this.state.products} 
                    filterText={this.state.filterText} />
            </div>
        );
    }
}

module.exports = ProductTable;
