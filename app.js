const ProductList = React.createClass({
  render: function() {
    return (
      <div className='ui items'>
        Basic React Component
      </div>
    );
  }
});

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);
