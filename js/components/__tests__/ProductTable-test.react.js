
jest.dontMock("../ProductTable.react.js");

describe("ProductTable", function() {
    it("filters list of products", function() {

        var React = require("react");
        var TestUtils = require("react-addons-test-utils");
        var ProductTable = require("../ProductTable.react.js");

        var products = {
            "0": {
                "Title": {
                    "TitleText": "This is a book about a dog"
                }
            },
            "1": {
                "Title": {
                    "TitleText": "This is a book about a CAT"
                }
            },
            "3": {
                "Title": {
                    "TitleText": "This is not a book, it is a cat"
                }
            }
        };
        var productTable = TestUtils.renderIntoDocument(
          <ProductTable products={products}/>
        );

        //We should at least have 3 products
        var productList = TestUtils.scryRenderedDOMComponentsWithTag(
            productTable,
            "li"
        );
        expect(productList.length).toEqual(3);

        //Let's test the filtering
        var filterTextInput = TestUtils.findRenderedDOMComponentWithTag(
            productTable,
            "input"
        );
        var FilterHelper = function(search, length) {
            filterTextInput.value = search;
            TestUtils.Simulate.change(filterTextInput);

            var productList = TestUtils.scryRenderedDOMComponentsWithTag(
                productTable,
                "li"
            );
            expect(productList.length).toEqual(length);
        };
        
        //We should still have 3 books
        FilterHelper("book", 3);
        //We should have 2 books
        FilterHelper("CAT", 2);
        //We should have 1 book
        FilterHelper("dog", 1);

        //Blank, we should be back to the right number
        FilterHelper("", 3);
    });
});
