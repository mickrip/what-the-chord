import styled from "styled-components";

export default styled.div`
  background: #12464a;
  color: white;
  h1 {
    color: #bac5c5;
    line-height: 46px;
    font-size: 20px;
    margin: 0;
    padding: 0;
  }

  ul.top-nav {
    width: auto;
    float: right;
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    li {
      float: left;
    }
    a {
      display: block;
      color: white;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      &:hover {
        color: yellow;
        transition: 300ms color;
      }
    }
  }
`;
