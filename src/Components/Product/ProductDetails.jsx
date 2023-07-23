import { useEffect } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../MetaData";
import Loader from "../Layouts/Loader/Loader";
import { getProductDetails } from "../../actions/productAction";
import ImageCarousel from "../Layouts/ImageCarousel";
import { message } from "antd";

const ProductDetails = ({ match }) => {
	const { product, loading, error } = useSelector(
		(state) => state.productDetails
	);
	console.log("product: ", product);
	const dispatch = useDispatch();

	useEffect(() => {
		if (error) {
			message.error(error);
			dispatch(clearErrors());
		}
		dispatch(getProductDetails(match.params.id));
	}, [dispatch, match.params.id, error]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title={product.name} />
					<div className='ProductDetails'>
						<ImageCarousel id={product.id} images={product.images} />

						<div>
							<h2>{product.name}</h2>
							<p style={{ fontSize: "15px" }}>Product # {product.id}</p>

							<div className='detailsBlock-3'>
								<h1>{`Price:  ₹${product.price}`}</h1>

								<h2>{`Category: ${product.category_id}`}</h2>

								<p style={{ fontSize: "15px" }}>
									Status:
									<b
										className={
											product.in_stock == 0 ? "redColor" : "greenColor"
										}>
										{product.in_stock == 0 ? "Out Of Stock" : "In Stock"}
									</b>
								</p>
							</div>

							<div className='detailsBlock-4'>
								Description : <p>{product.description}</p>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default ProductDetails;
