
$(document).ready(function(){

//initiate an empty array for filters on page load.
let checkboxFilter = [];

//initiate an empty array to save API results for filtering
let apiResults = [];

//load up a random beer when the user first loads the page.
const fullUrl = 'https://api.punkapi.com/v2/beers/random'
$.ajax({
    url: fullUrl,
    type: 'GET',
    success: function (data){
        filterResults(data);
         $('div#results').prepend("<p>A taste of our selection:</p>");
        
    },
    error:function (){
        $('div#results').empty();
        $('div#results').append("<p class='results-no-results'>No results found.</p>");
    }
})

//set up filter as a global array to be referenced during the search.
$('.form-check-input').click(function(){
    if (this.checked === true){ 
        //add element to filter array if checked
        checkboxFilter.push(this.value);
        if (apiResults.length > 0){
            filterResults(apiResults);
        }
    }
    else{
         //remove element from filter array if unchecked
        checkboxFilter.splice(checkboxFilter.indexOf(this.value), 1);
        if (apiResults.length > 0){
            filterResults(apiResults);
        }
    }
});

//query api on search form submit
$('#set-list-search').submit(function(e){
    e.preventDefault();

    //use search term from search input
    const searchTerm = $("#beerSearchInput").val();
    
    //get range for ABV
    const ibu_range = $(".range-slider-ibu").val().split(',');    
    const low_ibu = ibu_range[0];
    const high_ibu = ibu_range[1];

    //get range for IBU 
    const abv_range = $(".range-slider-abv").val().split(',');    
    const low_abv = abv_range[0];
    const high_abv = abv_range[1];

    //set request url to account for ABV and IBU ranges
    const baseUrl = 'https://api.punkapi.com/v2/beers?';
    const fullUrl = baseUrl
        +'beer_name='+searchTerm
        +'&abv_lt='+high_abv
        +'&abv_gt='+low_abv
        +'&ibu_lt='+high_ibu
        +'&ibu_gt='+low_ibu
        +'&per_page=50';

    //perform API request
    $.ajax({
        url: fullUrl,
        type: 'GET',
        success: function (data){
            apiResults = data; //save unfiltered api results
            filterResults(data); //filter and display api results
        },
        error:function (){
            $('div#results').empty();
            $('div#results').append("<p class='results-no-results'>No results found.</p>");
        }
    })
  })

//edit the API results into a new filtered list
function filterResults(data){

    $('div#results').empty(); //erase previous search results from results div

    if(data.length > 0){ //check that an empty array has not been passed
        
        let dataFilter = [];
        
        //if any filters are present only include data entries with all of the filter words in the description
        if (checkboxFilter.length > 0 ){
            dataFilter = data.filter(function (e){
                return (checkboxFilter.every(word => e.description.includes(word)))
            })
        //if no filters are present use the entire data response
        }else{
            dataFilter = data;
        }
        
        if (dataFilter.length > 0){ //check if any results are left after filter

            for (i = 0; i < dataFilter.length; i++){
                        
                const resultDiv = document.createElement("div"); //create new div for each result entry and populate
                $('div#results').append(resultDiv);
                $(resultDiv).attr('id', 'result-'+dataFilter[i].id);
                $(resultDiv).addClass('result');
                $(resultDiv).append("<div class='result-beer-image-container'><img alt='result-beer-image' class='beer-photo' src='"+dataFilter[i].image_url+"' height='328px' width='auto';/></div>");
                
                const textDiv = document.createElement("div"); //create another div to make styling the image and text easier
                $(textDiv).addClass('result-text');
                $(resultDiv).append(textDiv);
                $(textDiv).append("<p class='result-name'>"+dataFilter[i].name+"</p>");
                $(textDiv).append("<p class='result-tagline'>"+dataFilter[i].tagline+"</p>");
                $(textDiv).append("<p class='result-ibu'><span class='result-ibu-label'>IBU</span>"+dataFilter[i].ibu.toFixed(1)+"</p>"); //show first decimal of ibu
                $(textDiv).append("<p class='result-abv'><span class='result-abv-label'>ABV</span>"+dataFilter[i].abv.toFixed(1)+"</p>"); //show first decimal of abv
                $(textDiv).append("<p class='result-description'>"+dataFilter[i].description+"</p>");

                const newList = document.createElement( "ul" );
                $(newList).addClass('result-food-pairing-list');
                $(textDiv).append(newList);
        
                const foodPairings = dataFilter[i].food_pairing;
                for (f = 0; f < foodPairings.length; f++){
                    $(newList).append("<li>"+dataFilter[i].food_pairing[f]+"</li>");
                }
            }
        }
        else{
            $('div#results').append("<p class='results-no-results'>No results found.</p>");
        }
        
    }
}

 });