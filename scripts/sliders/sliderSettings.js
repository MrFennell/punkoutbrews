
//settings for the IBU and ABV sliders. 
//if width is changed also update .sider-container width in jquery.range.css

$(document).ready(function(){
      $('.range-slider-ibu').jRange({
          from: 0,
          to: 120,
          step: 1,
          format: '%s',
          width: 320,
          theme: "theme-purple",
          showLabels: true,
          isRange : true
      });
      $('.range-slider-abv').jRange({
          from: 3.00,
          to: 13.00,
          step: .1,
          format: '%s%',
          width: 320,
          theme: "theme-purple",
          showLabels: true,
          isRange : true
      });
  });