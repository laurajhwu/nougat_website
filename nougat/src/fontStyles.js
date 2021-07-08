import { createGlobalStyle } from "styled-components";
// import { lazy } from "react";
import OzCaramel from "./fonts/OzCaramel.ttf";
import Marshmallow from "./fonts/HanyiSentyMarshmallow.woff";
import Chalk from "./fonts/HanyiSentyChalk.woff";
import Scholar from "./fonts/HanyiSentyScholar.woff";
import Lotus from "./fonts/HanyiSentyLotus.woff";

const FontStyles = createGlobalStyle`

@font-face {
  font-family: 'caramel'; 
  unicode-range: U+4E00-9FFF, U+000-5FF;
  src: local('caramel'), url(${OzCaramel}) format('woff');  
}

@font-face {
  font-family: 'marshmallow';
  unicode-range: U+4E00-9FFF, U+000-5FF;
  src: local('marshmallow'), url(${Marshmallow}) format('woff');
}

@font-face {
  font-family: 'chalk';
  unicode-range: U+4E00-9FFF, U+000-5FF;
  src: local('chalk'), url(${Chalk}) format('woff') ;
}

@font-face {
  font-family: 'scholar';
  unicode-range: U+4E00-9FFF, U+000-5FF;
  src: local('scholar'), url(${Scholar}) format('woff')   
}

@font-face {
  font-family: 'lotus';
  unicode-range: U+4E00-9FFF, U+000-5FF;
  src: local('lotus'), url(${Lotus}) format('woff')    
}

`;

export default FontStyles;

// @font-face {  font-family: 'Custom Font';  font-weight: 400;  font-style: normal;  font-display: swap; /* Read next point */  /* Download only latin glyphs */  src: local('Custom Font'),       url('/fonts/custom-font.woff2') format('woff2'),        url('/fonts/custom-font.woff') format('woff');}
