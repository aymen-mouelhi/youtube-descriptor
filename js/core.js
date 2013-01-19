$(document).ready(function() {
    prepareImages();
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
        var thumbnail_width = $(".card").width() - 30;
        var max_width = 300;
        if (thumbnail_width>max_width) {
            thumbnail_width = max_width;
        };
        //$("#thumbnail").width('260px');
        $("#thumbnail").width(thumbnail_width);
        // card viead height
        var image_height = $("#thumbnail").height() + 10;

        //$("#card-video").height(image_height);
        
        $("#card-video").height(thumbnail_width);
        $("#card-video").width(thumbnail_width+10);
        adapt_play_button();
        
        /*
        if ($("#video-thumbnail").complete) {
            $("#card-video").height(thumbnail_width);
            $("#card-video").width(thumbnail_width+10);
            alert('hello');
            adapt_play_button();
        };
        */

        //$("<img/>").attr("style", "padding:5px;").attr("id", "thumbnail").attr("src", json["data"]["thumbnail"]["sqDefault"]).appendTo("#thumbnail-link");
    });

}

function adapt_play_button(){
 //get the width of the parent  
    //var parent_height = $('#thumbnail-link').parent().height();
    // var parent_height = $('#thumbnail').height();
    // alert(parent_height);
    // //get the width of the image  
    // var image_height = $('#thumbnail-link').height();  
    // alert(image_height);
    // //calculate how far from top the image should be  
    // var top_margin = (parent_height - image_height)/2;  
    // //and change the margin-top css attribute of the image  
    // $('#thumbnail-link').css( 'margin-top' , top_margin);  

   var cx = $("#thumbnail").width() / 2;
   cy = cx - 20;
   //If you want center coordinates relative to the document
   /*
   var pos = $("#thumbnail").offset();
   cx += pos.left;
   cy += pos.top;
   */

   $('#thumbnail-link').css( 'bottom' , cx);
   $('#thumbnail-link').css( 'left' , cy);
   //$('#thumbnail-link').bottom(cy);
   //$('#thumbnail-link').left(cx);

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

function prepareImages(){
    var txt = $(".card-text").html();
    var image_link = txt.match(/(http:\/\/\S+(\.png|\.jpg|\.gif|\.jpeg|\.bmp))/g); // end up with ?v=oHg5SJYRHA0
    if (image_link.length) {
        if(image_link.length == 1){
            prepareImageLinks(image_link);
        }
        else if(image_link.length == 2){
        // show 2 card-images
    }
    else if(image_link.length >= 3){
        // show 3 card-images
    }
    deleteImageLink(image_link);
}
else{
    $('.card-image').hide();
}
}

function prepareImageLinks(imagelink){
    $("#card-thumbnail").attr("src",imagelink);
}

function deleteImageLink(imageLink){
    $("#card-text").replaceText(/(http:\/\/\S+(\.png|\.jpg|\.gif|\.jpeg|\.bmp))/g, "");
}

$.fn.replaceText = function( search, replace, text_only ) {
    return this.each(function(){
      var node = this.firstChild,
      val,
      new_val,
      remove = [];
      if ( node ) {
        do {
          if ( node.nodeType === 3 ) {
            val = node.nodeValue;
            new_val = val.replace( search, replace );
            if ( new_val !== val ) {
              if ( !text_only && /</.test( new_val ) ) {
                $(node).before( new_val );
                remove.push( node );
            } else {
                node.nodeValue = new_val;
            }
        }
    }
} while ( node = node.nextSibling );
}
remove.length && $(remove).remove();
});
};