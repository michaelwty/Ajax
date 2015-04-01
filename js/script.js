
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var $street = $('#street').val();
    var $city = $('#city').val();
    var imgSrc = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + $street + ', ' + $city;
    $body.append('<img class="bgimg" src="' + imgSrc + '">');
    $greeting.text('It\'s ' + $street + ' ' + $city + ' !');

    // NY Times Ajax Request
    var apikey = '0024bfba89554124ae98c34700be7e14:19:71765882';
    var requestNYT = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + $city + '&sort=newest&api-key=' + apikey;
    $.getJSON(requestNYT, function (data) {
        var dataset = data.response.docs;
        $.each(dataset, function (index) {
            $nytElem.append('<li id="nyt_artical_' + index + '"><a href="' + dataset[index].web_url + '">' + dataset[index].headline.main + '</a><br>' + dataset[index].snippet + '</li><br>');
        });
    }).error(function () {
        $nytHeaderElem.text('Failed.');
    });

    //Wiki Ajax Request
    var requestWiki = 'http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search=' + $city;
    var requestWikiTimeOut = setTimeout(function () {$wikiElem.text('Failed.');}, 3000);
    $.ajax({
        url: requestWiki,
        dataType: 'jsonp',
        success: function (wiki) {
            console.log(wiki);
            var wikidata = wiki[1];
            for (var i = 1; i < wikidata.length; i++) {
                $wikiElem.append('<li><a href="http://en.wikipedia.org/wiki/' + wikidata[i] + '">' + wikidata[i] + '</a></li><br>');
            };
            clearTimeout(requestWikiTimeOut);
        }
    });


    return false;
};

$('#form-container').submit(loadData);

// loadData();
