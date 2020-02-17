$(document).ready(function(){
      $('.range-slider-ibu').jRange({
          from: 0,
          to: 120,
          step: 1,
          format: '%s',
          width: 200,
          showLabels: true,
          isRange : true
      });
      $('.range-slider-abv').jRange({
          from: 3.00,
          to: 13.00,
          step: .1,
          format: '%s%',
          width: 200,
          showLabels: true,
          isRange : true
      });
  });