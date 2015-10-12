
var React = require("react");
var ReactDOM = require("react-dom");
var $ = require('jquery-browserify');

var ProductRow = React.createClass({
    render: function() {
        var product = this.props.product;
        return (
            <li className="list-group-item">({product.id}) {product.title}</li> 
        );
    }
});

var Products = React.createClass({
    render: function() {
        var rows = [];
        var filterText = this.props.filterText;
        this.props.products.forEach(function(product) {
            if (product.title.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
                return;
            }
            rows.push(<ProductRow product={product} key={product.id} />);
        });
        return (
            <ul className="list-group">{rows}</ul>
        );
    }
});

var SearchBar = React.createClass({
    handleChange: function() {
        this.props.onUserInput(
            ReactDOM.findDOMNode(this.refs.filterTextInput).value
        );
    },
    render: function() {
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
});

var ProductTable = React.createClass({
    getInitialState: function() {
        return {
            filterText: "",
            products: []
        };
    },
    transformRemoteDataToLocal: function(remoteData) {
        // There is a lot of data in the ajax call, we only need a small proprtion for this widget
        var returnData = [];
        if (remoteData.worksById) {
            for (var productId in remoteData.worksById) {
                returnData.push({
                    "id": productId,
                    "title": remoteData.worksById[productId].Title.TitleText
                });
            }
        }
        return returnData;
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    products: this.transformRemoteDataToLocal(data)
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleUserInput: function(filterText) {
        this.setState({
            filterText: filterText
        });
    },
    render: function() {
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
});

module.exports = ProductTable;
