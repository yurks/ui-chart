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
    uiChart(container, JSON.parse(data));
  }, console.error);

})(window);

