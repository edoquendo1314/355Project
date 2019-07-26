function hideLink() {
  $("#a").hide();
}

function downloadResults() {
  var formatToDownload = $("#choices option:selected").text();
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
  } else if (formatToDownload === "JSON") {
    var downloadDoc = '{"Result" : [';
    for (var i = 0; i < length; i++) {
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
  } else if (formatToDownload === "CSV") {
    var downloadDoc = '';
    for (var i = 0; i < length; i++) {
      var checked = arrayOfCheckboxes[i].checked;
      if (checked) {
        var title = arrayOfTitles[i].innerHTML;
        var url = arrayOfURLS[i].innerHTML;
        var desc = arrayOfDescriptions[i].innerHTML;
        downloadDoc += '"' + title + '","' + url + '","' + desc + '"\r\n';
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


function toggleResults() {
  $(".result").toggle();
  $("#btnDownload").toggle();
  $("#ddlFormat").toggle();
}

var check = document.getElementsByClassName('chkbox');
$('#select-1').click(function () {
  for (var i = 0; i < check.length; i++) {
    check[i].checked = true;
  }
});

$('#select-2').click(function () {
  for (var i = 0; i < check.length; i++) {
    check[i].checked = false;
  }
});
var loadSelectBtns = (function () {
  var executed = false;
  return function () {
    if (!executed) {
      executed = true;
      var select = document.createElement('div');
      select.setAttribute("id", "selections");
      var btn1 = document.createElement("button");
      btn1.setAttribute("type", "button");
      btn1.setAttribute("id", "select-1");
      btn1.setAttribute("class", "select-btn");
      btn1.innerHTML = "Select All";
      var btn2 = document.createElement("button");
      btn2.setAttribute("type", "button");
      btn2.setAttribute("id", "select-2");
      btn2.setAttribute("class", "select-btn");
      btn2.innerHTML = "Deselect All";
      var parent = document.getElementById('up-down-btns');
      insertAfter(select, parent);
      select.appendChild(btn1);
      select.appendChild(btn2);

      var check = document.getElementsByClassName('page_check');
      $('#select-1').click(function () {
        for (var i = 0; i < check.length; i++) {
          check[i].checked = true;
        }
      });

      $('#select-2').click(function () {
        for (var i = 0; i < check.length; i++) {
          check[i].checked = false;
        }
      });
    }
  };
})();