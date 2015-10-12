
var ReactDOM = require("react-dom");
var React = require("react");

var ProductTable = require("./components/ProductTable.react");

ReactDOM.render(
    <ProductTable url="data/products.json" />,
    document.querySelector(".js-product-search")
);
