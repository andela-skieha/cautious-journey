class ProductList extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      products: [],
    };
    this.updateState = this.updateState.bind(this);
    this.handleProductUpVote = this.handleProductUpVote.bind(this);
    this.handleProductDownVote = this.handleProductDownVote.bind(this);
  }

  componentDidMount() {
    this.updateState();
  }

  updateState() {
    const products = Data.sort((a, b) => {
      return b.votes - a.votes;
    });
    this.setState({ products: products});
  }

  handleProductUpVote(productId) {
    Data.forEach((element) => {
      if (element.id === productId) {
        element.votes += 1;
        return;
      }
    });
    this.updateState();
  }

  handleProductDownVote(productId) {
    Data.forEach((element) => {
      if (element.id === productId) {
        element.votes -= 1;
        return;
      }
    });
    this.updateState();
  }

  render() {
    const products = this.state.products.map((product) => {
      return (
        <Product
          key={'product-' + product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitter_avatar_url={product.submitter_avatar_url}
          product_image_url={product.product_image_url}
          onUpVote={this.handleProductUpVote}
          onDownVote={this.handleProductDownVote}
        />
      );
    });

    return (
      <div className='ui items'>
        {products}
      </div>
    );
  }
};

class Product extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  handleUpVote() {
    this.props.onUpVote(this.props.id);
  }

  handleDownVote() {
    this.props.onDownVote(this.props.id);
  }

  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.product_image_url} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon' />
            </a>
            <br />
            <a onClick={this.handleDownVote}>
              <i className='large caret down icon' />
            </a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
            <p>{this.props.description}</p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitter_avatar_url}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);
