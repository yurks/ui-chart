(function(window) {
  var noop = function() {};

  var ajax = function(url, success, error) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onreadystatechange = function(){
      if (request.readyState == 4) {
        if (request.status >= 200 && request.status < 400) {
          (success||noop)(request.responseText);
        } else {
          (error||noop)(request);
        }
      }
    };
    request.onerror = error||noop;
    request.send();
  };

  var container = document.getElementById('container');
  var page = window.location.search.slice(1) || 'json';
  ajax('assets/demo/' + page + '.txt', function(data) {
    container.innerHTML = '';
    data = JSON.parse(data);

    if (data && data.length) {
      data.forEach(function(d, i) {
        if (data.length > 1) {
          var title = document.createElement('h2');
          title.innerHTML = 'Dataset #' + (i+1);
          container.appendChild(title);
        }
        uiChart(container, d);
      })
    } else if (data) {
      uiChart(container, data);
    }

  }, console.error);





})(window);

