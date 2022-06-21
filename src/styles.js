import { createGlobalStyle } from 'styled-components'

export const theme = {
  colors: {
    primary: '#2e343c',
    secondary: '#222831',
    icon: '#00ADB5',
    iconHover: '#EEEEEE',
    hover: '#8e92a438',
    taskBg: 'rgba(142, 146, 164, 0.15)',
    textColor: '#fff',
  },
  media: {
    laptop: '(max-width: 1024px)',
  },
}

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: none;

    &,
    &:before,
    &:after {
      box-sizing: border-box;
    }
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Helvetica', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.4;
    color: ${theme.colors.textColor};
  }

  a {
    text-decoration: none;

    &,
    &:hover {
      color: inherit;
    }
  }

  p {
    margin: 0;
  }

  ul,
  ol {
    margin: 0;
    list-style: none;
  }

  img {
    max-width: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  pre {
    margin: 0;
  }

  #root {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`
