
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
    var src = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + $street + ', ' + $city; // + '&fov=90&heading=235&pitch=10'

    //$body.prepend('<img id="theImg" src="" />');
    //$('#theImg').attr('src', src);
    $body.attr('background', src);

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

// loadData();
