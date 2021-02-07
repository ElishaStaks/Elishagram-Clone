import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	html {
		font-size: 14px;
		box-sizing: border-box;
	}

	*, *:before, *:after {
		padding: 0;
		margin: 0;
		box-sizing: inherit;
	}

	body {
		font-family: 'Fira Sans', sans-serif;
		font-size: 1rem;
		line-height: 1.7;
		background: #18191b;
		color: #262626;
		overflow-x: hidden;
	}

	h1, h2, h3, h4, h5, h6 {
		font-weight: normal;
		color: white;
	}

	p {
		color: white;
	}

	span {
		color: white;
	}

	a {
		text-decoration: none;
		cursor: pointer;
		color: inherit;
	}

	.pointer {
		cursor: pointer;
	}

	.secondary {
		color: #B2B2B2;
	}

	.colour-red {
		color: #ED4956;
	}

	button, svg {
	  cursor: pointer;
	}

	*:focus {
	  outline: none;
	}
`;

export default GlobalStyle;
