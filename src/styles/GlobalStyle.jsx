import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  
  @import url('https://fonts.googleapis.com/css?family=Nunito:300,400,700,800,900&display=swap');
      html{
      height:100%;
    }
    body {
    font-family: 'Nunito', sans-serif;
        background: #ecebe8;
    padding: 0;
    margin:0;
      font-size: 14px;
        font-weight: 500;
        height:100%;

    }

    * {
     box-sizing: border-box;
    }
    
    h1,h2,h3,h4,h5{
        color: black;
        margin:0;
    }
    
    h1{
    font-size: 40px;
    }
    
    h2{
    font-size: 21px;
    }
    

`;

export default GlobalStyle;
