import React, { useEffect } from "react";
import { Button, Card, message } from "antd";
import ImageCarousel from "../Layouts/ImageCarousel";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getAllProducts } from "../../actions/productAction";
import MetaData from "../../MetaData";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const { Meta } = Card;
const ProductCard = (product) => (
	<>
		<Card.Grid style={{ width: "25%", textAlign: "center" }} hoverable>
			<Meta title={product.name} description={product.description} />
			<Button type='primary'>
				<Link to={`/product/${product.id}`}>View Details</Link>
			</Button>
		</Card.Grid>
	</>
);

const Products = () => {
	const { products, error } = useSelector((state) => state.products);
	const dispatch = useDispatch();
	useEffect(() => {
		if (error) {
			message.error(error);
			dispatch(clearErrors());
		}
		dispatch(getAllProducts());
	}, [dispatch]);

	return (
		<div style={{ marginTop: "20vh" }}>
			<MetaData title='Products' />
			<h1>Products</h1>
			<Card>
				{products &&
					products.map((product, i) => (
						<>
							<ImageCarousel key={i} images={product.images} />
							<ProductCard key={product.id} product={product} />
						</>
					))}
			</Card>
		</div>
	);
};
export default Products;
