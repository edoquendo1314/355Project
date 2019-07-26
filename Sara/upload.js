$(document).ready(function() {
  $(".result").hide();
    $(".btn-upload").on('click', function(){
       $(".file-upload").trigger('click'); 
    } );
});
const reader = new FileReader();
var extension = "";

function read(input) {
  var url = input.value;
  var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
  extension = ext;
  if (ext !== "csv" && ext !== "json" && ext !== "xml") {
    document.querySelector('.results').innerHTML = "<strong>Invalid file format</strong>"
    return;
  } else {
    console.log(ext);
  }
  const csv = input.files[0];
  reader.readAsText(csv);

}
reader.onload = function(e) {
  $("#btnDownload").show();
  $("#ddlFormat").show();
  if (extension === "csv") {
    var lines = e.target.result.split('\n');
    var result = lines.map(line => {
      return line.split(',');
    });
    var finalString = "";
    for (var i = 0; i < result.length-1; i++) {
      var resultrow = "<div class='result'><div class='title'>" + result[i][0]+"</div><div class='url'><a href='" + result[i][1] + "' target='_blank'>"+result[i][1]+" </a></div><div class='description'><p>" +
      result[i][2] + "</p></div></div>";
      finalString += resultrow;
      /** var resultrow = "<div class='result'><div class='title'>" + result[i][0] + "</div><div class='url'><a href='"+ result[i][1] + "'target='_blank'>"+result[i][1]+"</a></div><div class='description'><p>" + result[i][2] + "</p></div><input type='checkbox' class='chkbox' checked></div>";
      finalString += resultrow;
      */
    }
    document.querySelector('.results').innerHTML = finalString;
  } else if (extension === "json") {
    var result = JSON.parse(e.target.result);
    var finalString = "";
    for (var i = 0; i < result.Result.length; i++) {
      var resultrow = "<div class='result'><div class='title'>" + result.Result[i].title +"</div><div class='url'><a href='" + result.Result[i].url + "' target='_blank'>"+result.Result[i].url+" </a></div><div class='description'><p>" +
        result.Result[i].description + "</p></div></div></div>";
      finalString += resultrow;
    }
    document.querySelector('.results').innerHTML = finalString;
  } else if (extension === "xml") {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(e.target.result, "text/xml");
    var v = xmlDoc.getElementsByTagName("result");
    var finalString = "";
    for (var i = 0; i < v.length; i++) {
      var resultrow = "<div class='result'><div class='title'> "+ v[i].childNodes[0].innerHTML + " </div><a href='" + v[i].childNodes[0].innerHTML + "' target='_blank'>" + v[i].childNodes[1].innerHTML + "</a><div class='description'><p>" + v[i].childNodes[2].innerHTML + "</p></div></div></div>";
 
      finalString += resultrow;
    }
    document.querySelector('.results').innerHTML = finalString;
  }
}

function hideLink(){
  $("#a").hide();
}