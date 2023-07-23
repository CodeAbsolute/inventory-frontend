/* eslint-disable jsx-a11y/accessible-emoji */
import { useState, useEffect } from "react";
import "./Header.css";
import { CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";

export default function Header({ history }) {
	const [isNavVisible, setNavVisibility] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);
	const dispatch = useDispatch();
	const { isAuthenticated } = useSelector((state) => state.user);

	const logoutUser = () => {
		dispatch(logout());
		message.success("Logged Out Successfully");
		if (!isAuthenticated) {
			history.push("/login");
		}
	};

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 700px)");
		mediaQuery.addEventListener("change", handleMediaQueryChange);
		handleMediaQueryChange(mediaQuery);

		return () => {
			mediaQuery.removeEventListener("change", handleMediaQueryChange);
		};
	}, []);

	const handleMediaQueryChange = (mediaQuery) => {
		if (mediaQuery.matches) {
			setIsSmallScreen(true);
		} else {
			setIsSmallScreen(false);
		}
	};

	const toggleNav = () => {
		setNavVisibility(!isNavVisible);
	};

	return (
		<header className='Header'>
			<NavLink to='/'>
				<img src={"/vite.svg"} className='Logo' alt='logo' />
			</NavLink>
			<CSSTransition
				in={!isSmallScreen || isNavVisible}
				timeout={350}
				classNames='NavAnimation'
				unmountOnExit>
				<nav className='Nav'>
					<NavLink to='/products'>Product Management</NavLink>
					<NavLink to='/users'>User Mangament</NavLink>
					<button onClick={logoutUser}>Logout</button>
				</nav>
			</CSSTransition>
			<button onClick={toggleNav} className='Burger'>
				🍔
			</button>
		</header>
	);
}
