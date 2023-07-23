import { Carousel } from "antd";
const contentStyle = {
	padding: "3vmax 0",
	width: "40vmax",
	height: "27vmax",
	backgroundColor: "black",
	boxShadow: "0 10px 10px rgb(0,0,0.2)"
};
const ImageCarousel = ({ images }) => {
	console.log("images: ", images);
	return (
		<>
			<Carousel
				autoplay
				style={contentStyle}
				dots={true}
				easing='ease-in-out'
				arrows={true}
				effect='scrollx'>
				{images?.map((image, i) => {
					return (
						<div>
							<img
								key={i}
								src={`http://localhost:8000/${image}`}
								alt={`product image ${i}`}
								style={{ width: "100%", height: "250px" }}
							/>
						</div>
					);
				})}
			</Carousel>
		</>
	);
};

export default ImageCarousel;
