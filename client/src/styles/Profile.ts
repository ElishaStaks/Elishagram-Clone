import styled from "styled-components";

export const ProfileHeaderWrapper = styled("div")`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  margin-bottom: 6rem;
  margin-left: 8rem;

  .profile-button {
    background-color: #FFF;
    color: #000;
    border: 1px solid #d3d3d3;
    padding: 0.4rem .5rem;
    border-radius: 4px;
    margin-top: 1rem;
    margin-left: 1rem;
    font-family: "Fira Sans", sans-serif;
    font-size: 1rem;
  }

  .profile-info {
    margin-left: 100px;
    margin-top: -50px;
  }

  .avatar {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: 90px;
    margin-right: 2rem;
    border: 2px solid white;
  }

  .profile-meta {
    display: flex;
    align-items: baseline;
    margin-bottom: 1rem;
  }

  .profile-meta h2 {
    position: relative;
    top: 3px;
  }

  .profile-stats {
    display: flex;
    margin-bottom: 1rem;
  }

  .options svg {
    position: relative;
    top: 7px;
    margin-left: 1rem;
  }

  span {
    padding-right: 3rem;
  }

  a {
    color: #0095F6;
  }

  @media screen and (max-width: 645px) {
    font-size: 1rem;

    .bio,
    .profile-stats {
      display: none;
    }

    .avatar {
      width: 140px;
      height: 140px;
    }

    .profile-meta {
      flex-direction: column;
    }

    button {
      margin-left: 0;
    }

    .bio-mobile {
      margin: 1rem 0;
      display: block;
    }
  }

  @media screen and (max-width: 420px) {
    font-size: 0.9rem;

    .avatar {
      width: 100px;
      height: 100px;
    }
  }
`;

export const ProfileEditFormWrapper = styled("div")`
  padding: 1rem;

  .submit-button {
    background-color: #0095f6;
    border: 1px solid #0095f6;
    padding: 0.4rem 1rem;
    color: #fff;
    border-radius: 4px;
    margin-top: 1rem;
    margin-left: 1rem;
    font-family: "Fira Sans", sans-serif;
    font-size: 1rem;
    margin-left: 100px;
  }

  .input-group > p {
    font-size: smaller;
    margin-left: 100px;
  }

  img {
    cursor: pointer;
    margin-right: 40px;
    margin-top: 15px;
  }

  .input-group {
    margin-top: 1.5rem;
  }

  .input-group > label {
    display: inline-block;
    width: 100px;
    color: white;
  }

  input,
  textarea {
    padding: 0.4rem 1rem;
    font-family: "Fira Sans", sans-serif;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #DBDBDB;
    width: 350px;
    background-color: black;
    color: white;
  }

  .textarea-group {
    display: flex;
  }

  .change-avatar {
    display: flex;
  }

  .change-avatar-meta {
    margin-left: 27px;
    margin-top: 5px;
  }

  input[id="change-avatar"],
  input[id="change-avatar-link"] {
    display: none;
  }

  span {
    color: #0095F6;
    cursor: pointer;
    font-weight: bold;
  }

  button {
    margin-top: 1.5rem;
    margin-left: 6.25rem;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 550px) {
    width: 98%;

    .input-group {
      display: flex;
      flex-direction: column;
    }

    label {
      padding-bottom: 0.5rem;
      font-size: 1rem;
    }

    button {
      margin-left: 0;
    }
  }

  @media screen and (max-width: 430px) {
    input,
    textarea {
      width: 99%;
    }
  }
`;

export const PostPreviewWrapper = styled("div")`
	margin-top: 1.5rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 1rem;

	img {
		border-radius: 4px;
		box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
		width: 300px;
		height: 300px;
		object-fit: cover;
	}

	.container-overlay {
		position: relative;
	}

	.container-overlay:hover .overlay {
		display: block;
	}

	.overlay {
		border-radius: 4px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		width: 300px;
		height: 300px;
		z-index: 4;
		display: none;
	}

	.overlay-content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		color: #FFF;
		font-weight: 500;
		font-size: 1.1rem;
	}

	svg {
		fill: #FFF;
		position: relative;
		top: 4px;
	}

	span {
		display: flex;
		display: block;
		align-items: center;
		padding-right: 0.5rem;
	}

	span:first-child {
		margin-right: 1rem;
	}

	@media screen and (max-width: 1000px) {
		img, .overlay {
		width: 233px;
		height: 233px;
	}

	@media screen and (max-width: 800px) {
		img, .overlay {
		width: 200px;
		height: 200px;
	}

	@media screen and (max-width: 700px) {
		grid-template-columns: 1fr 1fr;

		img, .overlay {
			height: 240px;
			width: 100%;
	}

	@media screen and (max-width: 500px) {
		grid-gap: 1rem;

		img, .overlay {
			height: 200px;
			width: 100%;
	  }

	@media screen and (max-width: 400px) {
		img, .overlay {
			height: 170px;
			width: 100%;
	  }
	}
`;