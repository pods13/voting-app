class ProductList extends React.Component {

	state = {
		products: []
	};

	componentDidMount() {
		this.setState({
			products: Seed.products
		});
	}

	render() {
		const products = this.state.products.sort((a, b) => b.votes - a.votes);
		const productComponents = products.map(product => {
			return (
				<Product
					key={'product-' + product.id}
					id={product.id}
					title={product.title}
					description={product.description}
					url={product.url}
					productImageUrl={product.productImageUrl}
					submitterAvatarUrl={product.submitterAvatarUrl}
					votes={product.votes}
					onVote={this.handleProductUpVote}
				/>
			);
		});
		return (
			<div className='ui unstackable items'>
				{productComponents}
			</div>
		);
	}

	handleProductUpVote = (productId) => {
		const updatedProducts = this.state.products.map((product) => {
			if(product.id === productId) {
				return Object.assign({}, product, {votes: ++product.votes})
			} else {
				return product;
			}
		});

		this.setState({
			prroducts: updatedProducts
		});
	}
}

class Product extends React.Component {

	render() {
		return (
			<div className='item'>
				<div className='image'>
					<img src={this.props.productImageUrl}/>
				</div>
				<div className='middle aligned content'>
					<div className='header'>
						<a onClick={this.handleUpVote}>
							<i className='large caret up icon' />
						</a>
						{this.props.votes}
					</div>
					<div className='description'>
						<a href={this.props.url} title={this.props.title}>{this.props.title}</a>
						<p>{this.props.description}</p>
					</div>
					<div className='extra'>
						<span>Submitted by:</span>
						<img className='ui avatar image' src={this.props.submitterAvatarUrl}/>
					</div>
				</div>
			</div>
		);
	}

	handleUpVote = () => {
		this.props.onVote(this.props.id);
	}

}

ReactDOM.render(
	<ProductList/>,
	document.getElementById('content')
)
