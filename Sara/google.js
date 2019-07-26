

function getDataFromApi(searchTerm, callback) {
  $.ajax({
   //url: '017643444788069204610:4gvhea_mvga' + searchTerm,
   url: 'https://www.googleapis.com/customsearch/v1?key=AIzaSyDQmqVG2gujBmEDDrOHB9MLN1AKCK4GchU&cx=009443400072657832520:-4ffmgicbxw&q=' + searchTerm ,
    success(data){
      console.log(data);
      displaySearchData(data);
    }, error(){
      console.log('No Searchfound!')
    }
  })
}

function displaySearchData(data) {
 console.log(data.items.length);
 let display = []
  for(var i=0; i<data.items.length; i++){
    let title = data.items[i].title.replace(',', '');
    let link = data.items[i].link.replace(',','');
    let snippet = data.items[i].snippet.replace(',','');

    display.push("<div class='result'><div class='title'>" + title +"</div><div class='url'><a href='" + link + "' target='_blank'>"+ link +" </a></div><div class='description'><p>" +
    snippet + "</p></div><input type='checkbox' class='chkbox' checked></div>");



    //display.push(`<div><div><input type="checkbox" id="check"><div class='title'>${data.items[i].title}</div></div><div class='url'><a href="${data.items[i].link}">${data.items[i].link}</a><div></div><div class="description">"${data.items[i].htmlSnippet}"></div></div></div>`);
  }
  $('.results-container').html(display);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find('.js-query');
    let query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    console.log('Entered query: ' + query)
    getDataFromApi(query, displaySearchData);
  });
}

$(watchSubmit);

/*(function() {
  var cx = '017643444788069204610:4gvhea_mvga'; // Insert your own Custom Search engine ID here
  var gcse = document.createElement('script');
  gcse.type = 'text/javascript';
  gcse.async = true;
  gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(gcse, s);
})();z
*/