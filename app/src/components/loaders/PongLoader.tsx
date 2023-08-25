import styled, { keyframes } from 'styled-components';

const playAnimation = keyframes`
  0% {
    -webkit-transform: translate(-50%, -50%) translate(-850%, 741%);
            transform: translate(-50%, -50%) translate(-850%, 741%); }
  10% {
    -webkit-transform: translate(-50%, -50%) translate(850%, 812%);
            transform: translate(-50%, -50%) translate(850%, 812%); }
  20% {
    -webkit-transform: translate(-50%, -50%) translate(-850%, -615%);
            transform: translate(-50%, -50%) translate(-850%, -615%); }
  30% {
    -webkit-transform: translate(-50%, -50%) translate(850%, 437%);
            transform: translate(-50%, -50%) translate(850%, 437%); }
  40% {
    -webkit-transform: translate(-50%, -50%) translate(-850%, 655%);
            transform: translate(-50%, -50%) translate(-850%, 655%); }
  50% {
    -webkit-transform: translate(-50%, -50%) translate(850%, -117%);
            transform: translate(-50%, -50%) translate(850%, -117%); }
  60% {
    -webkit-transform: translate(-50%, -50%) translate(-850%, -345%);
            transform: translate(-50%, -50%) translate(-850%, -345%); }
  70% {
    -webkit-transform: translate(-50%, -50%) translate(850%, -515%);
            transform: translate(-50%, -50%) translate(850%, -515%); }
  80% {
    -webkit-transform: translate(-50%, -50%) translate(-850%, -55%);
            transform: translate(-50%, -50%) translate(-850%, -55%); }
  90% {
    -webkit-transform: translate(-50%, -50%) translate(850%, 562%);
            transform: translate(-50%, -50%) translate(850%, 562%); }
  100% {
    -webkit-transform: translate(-50%, -50%) translate(-850%, 741%);
            transform: translate(-50%, -50%) translate(-850%, 741%); } 
`;

const moveOneAnimation = keyframes`
  0% {
    -webkit-transform: translate(0%, -50%) translate(0%, 247%);
            transform: translate(0%, -50%) translate(0%, 247%); }
  20%, 30% {
    -webkit-transform: translate(0%, -50%) translate(0%, -205%);
            transform: translate(0%, -50%) translate(0%, -205%); }
  40%, 50% {
    -webkit-transform: translate(0%, -50%) translate(0%, 218.33333%);
            transform: translate(0%, -50%) translate(0%, 218.33333%); }
  60%, 70% {
    -webkit-transform: translate(0%, -50%) translate(0%, -115%);
            transform: translate(0%, -50%) translate(0%, -115%); }
  80%, 90% {
    -webkit-transform: translate(0%, -50%) translate(0%, -18.33333%);
            transform: translate(0%, -50%) translate(0%, -18.33333%); }
  100% {
    -webkit-transform: translate(0%, -50%) translate(0%, 247%);
            transform: translate(0%, -50%) translate(0%, 247%); } 
`;

const moveTwoAnimation = keyframes`
0% {
    content: 850 812;
    -webkit-transform: translate(0%, -50%) translate(0%, 270.66667%);
            transform: translate(0%, -50%) translate(0%, 270.66667%); }
  20%, 10% {
    -webkit-transform: translate(0%, -50%) translate(0%, 270.66667%);
            transform: translate(0%, -50%) translate(0%, 270.66667%); }
  40%, 30% {
    -webkit-transform: translate(0%, -50%) translate(0%, 145.66667%);
            transform: translate(0%, -50%) translate(0%, 145.66667%); }
  60%, 50% {
    -webkit-transform: translate(0%, -50%) translate(0%, -39%);
            transform: translate(0%, -50%) translate(0%, -39%); }
  80%, 70% {
    -webkit-transform: translate(0%, -50%) translate(0%, -171.66667%);
            transform: translate(0%, -50%) translate(0%, -171.66667%); }
  100%, 90% {
    -webkit-transform: translate(0%, -50%) translate(0%, 187.33333%);
            transform: translate(0%, -50%) translate(0%, 187.33333%); } 
`;

const PongContainer = styled.div`
	background: repeating-linear-gradient(
			180deg,
			white 0,
			white 4%,
			transparent 4%,
			transparent 6%,
			white 6%
		)
		49px 0 / 2px 100% no-repeat;
	height: 100px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 100px;

	div {
		content:
			-850 741,
			850 812,
			-850 -615,
			850 437,
			-850 655,
			850 -117,
			-850 -345,
			850 -515,
			-850 -55,
			850 562,
			-850 556,
			850 819,
			-850 590,
			850 384,
			-850 -854,
			850 -27,
			-850 215,
			850 921,
			-850 13,
			850 -79,
			-850 213,
			850 -602,
			-850 -763,
			850 -660;
	}

	div:nth-child(1) {
		animation: ${playAnimation} 6s infinite linear alternate;
		background: white;
		height: 5%;
		left: 50%;
		position: absolute;
		top: 50%;
		width: 5%;
		will-change: transform;
		z-index: 2;
		content: -850 741;
	}

	div:nth-child(2),
	div:nth-child(3) {
		animation-direction: alternate;
		animation-duration: 6s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
		background: white;
		height: 15%;
		position: absolute;
		top: 50%;
		width: 5%;
		will-change: transform;
	}

	div:nth-child(2) {
		animation-name: ${moveOneAnimation};
		left: 0;
	}

	div:nth-child(3) {
		animation-name: ${moveTwoAnimation};
		right: 0;
	}
`;

// Usage
const PongLoader = () => {
	return (
		<PongContainer>
			<div />
			<div />
			<div />
		</PongContainer>
	);
};

export default PongLoader;
