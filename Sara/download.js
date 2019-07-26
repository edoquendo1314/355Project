function downloadResults()  {
    var formatToDownload = $("#ddlFormat option:selected").text();
    var arrayOfTitles = $(".result .title a");
    var arrayOfURLS = $(".result .url");
    var arrayOfDescriptions = $(".result .description p");
    var arrayOfCheckboxes = $(".result input");
    var length = arrayOfTitles.length;
    if (formatToDownload === "XML") {
      var downloadDoc = "<?xml version='1.0' encoding='UTF-8'?><results>";
      //in a loop access it by index.innerHTML
      for (var i = 0; i < length; i++) {
        var checked = arrayOfCheckboxes[i].checked;
        if (checked) {
          downloadDoc += "<result><title>"
          var title = arrayOfTitles[i].innerHTML;
          var url = arrayOfURLS[i].innerHTML;
          var desc = arrayOfDescriptions[i].innerHTML;
          downloadDoc += title + "</title><url>" + url + "</url><description>" + desc + "</description></result>";
  
        }
      }
      downloadDoc += "</results>";
      download(downloadDoc, 'downloadResults.xml', 'text/xml')
    }
    else if (formatToDownload === "JSON"){
      var downloadDoc = '{"Result" : [';
      for(var i = 0; i < length; i++){
        var checked = arrayOfCheckboxes[i].checked;
        if (checked) {
          var title = arrayOfTitles[i].innerHTML;
          var url = arrayOfURLS[i].innerHTML;
          var desc = arrayOfDescriptions[i].innerHTML;
          downloadDoc += '{"title":"' + title + '", "url":"' + url + '", "description":"' + desc + '"},';
        }
      }
      downloadDoc = downloadDoc.slice(0, -1); // removes the last comma
      downloadDoc += "]}";
      download(downloadDoc, 'downloadResults.json', 'text/JSON')
    }
    else if (formatToDownload === "CSV"){
      var downloadDoc = '';
      for(var i = 0; i < length; i++){
        var checked = arrayOfCheckboxes[i].checked;
        if (checked) {
          var title = arrayOfTitles[i].innerHTML;
          var url = arrayOfURLS[i].innerHTML;
          var desc = arrayOfDescriptions[i].innerHTML;
          downloadDoc += '"' + title + '","'+ url + '","' + desc + '"\r\n';
        }
      }
      download(downloadDoc, 'downloadResults.csv', 'text/csv')
    }
  }
  
  function download(text, name, type) {
    var a = document.getElementById("a");
    a.style.display = "block";
    var file = new Blob([text], {
      type: type
    });
    a.href = URL.createObjectURL(file);
    a.download = name;
  }