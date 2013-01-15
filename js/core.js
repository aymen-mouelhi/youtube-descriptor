$(document).ready(function() {
    youtubePlugin();
});


function prepareYoutubeLinks(videoId){
    var json_string ="http://gdata.youtube.com/feeds/api/videos/"+videoId+"?v=2&alt=jsonc&callback=?";
    //alert(json_string);
    $.getJSON(json_string, function(json){
        var link = "http://m.youtube.com/#/watch?&v=" + videoId;
        //target="_blank"
        $("<img/>").attr("style", "padding:5px;").attr("id", "thumbnail").attr("src", json["data"]["thumbnail"]["sqDefault"]).appendTo("#video-thumbnail");
        $("<a/>").attr("id", "thumbnail-link").attr("href", link).appendTo("#video-thumbnail");
        var image_height = 90 + 10; 
        $("#card-video").height(image_height);
    
    //$("<img/>").attr("style", "padding:5px;").attr("id", "thumbnail").attr("src", json["data"]["thumbnail"]["sqDefault"]).appendTo("#thumbnail-link");
    });

}

function youtubePlugin(){
    // card-text
    $('.card-text:contains("youtube.com/watch")').each(function(i){
        var that = $(this);
        var txt = $(this).html();               
        var vid = txt.match(/((\?v=)(\w[\w|-]*))/g); // end up with ?v=oHg5SJYRHA0
        if (vid.length) {
            $.each(vid, function(x){
                var ytid = this.replace(/\?v=/,'') // end up with oHg5SJYRHA0   
                prepareYoutubeLinks(ytid);
                deleteYoutubeLink(ytid);
            })
        }
        else{
            $('.card-video').hide();
        }
    });
        
    $('.card-text:contains("youtube.com/#/watch")').each(function(i){
        var that = $(this);
        var txt = $(this).html();
        var vid = txt.match(/((\?v=)(\w[\w|-]*))/g); // end up with ?v=oHg5SJYRHA0
        if (vid.length) {
            $.each(vid, function(x){
                var ytid = this.replace(/\?v=/,'') // end up with oHg5SJYRHA0   
                prepareYoutubeLinks(ytid);
                deleteYoutubeLink(ytid);
            })
        }
        else{
            $('.card-video').hide();
        }
    });
}

function deleteYoutubeLink(videoId){
    $("#card-text").replaceText("http://www.youtube.com/watch?v="+videoId, "");
    $("#card-text").replaceText("http://www.youtube.com/#/watch?v="+videoId, "");   
    $("#card-text").replaceText("http://m.youtube.com/watch?v="+videoId, "");
    $("#card-text").replaceText("http://m.youtube.com/#/watch?v="+videoId, "");
}

function processURL(url, success){
    var id;
    if (url.indexOf('youtube.com') > -1) {
        id = url.split('v=')[1].split('&')[0];
        return processYouTube(id);
    } else if (url.indexOf('youtu.be') > -1) {
        id = url.split('/')[1];
        return processYouTube(id);
    } else if (url.indexOf('vimeo.com') > -1) {
        if (url.match(/http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/)) {
            id = url.split('/')[1];
        } else if (url.match(/^vimeo.com\/channels\/[\d\w]+#[0-9]+/)) {
            id = url.split('#')[1];
        } else if (url.match(/vimeo.com\/groups\/[\d\w]+\/videos\/[0-9]+/)) {
            id = url.split('/')[4];
        } else {
            throw new Error('Unsupported Vimeo URL');
        }

        $.ajax({
            url: 'http://vimeo.com/api/v2/video/' + id + '.json',
            dataType: 'jsonp',
            success: function(data) {
                <!-- CHANGED -->
                success(data[0].thumbnail_large);
            }
        });
    } else {
        throw new Error('Unrecognised URL');
    }

    function processYouTube(id) {
        if (!id) {
            throw new Error('Unsupported YouTube URL');
        }
        success('http://i2.ytimg.com/vi/' + id + '/hqdefault.jpg');
    }
}

function processViemo(){
    var vimeoVideoID = '17631561';
    $.getJSON('http://www.vimeo.com/api/v2/video/' + vimeoVideoID + '.json?callback=?', {
        format: "json"
    }, function(data) {
        $(".thumbs").attr('src', data[0].thumbnail_large);
    });
}