$(function(){
    $.widget( "custom.catcomplete", $.ui.autocomplete, {
      _renderMenu: function( ul, items ) {
        var that = this,
          currentCategory = "";
        $.each( items, function( index, item ) {
          if ( item.name != currentCategory ) {
            ul.append( "<li class='ui-autocomplete-category'>" + item.name + "</li>" );
            currentCategory = item.name;
          }
          that._renderItemData( ul, item );
        });
      }
    });
  
    var xhr;
    $( "input" ).catcomplete({
      delay: 0,
      source: function( request, response ) {
        var regex = new RegExp(request.term, 'i');
        if(xhr){
          xhr.abort();
        }
        xhr = $.ajax({
            url: "/Users/brandonellis/Documents/Code Projects/weather-app/weather-app/city.list.json",
            dataType: "json",
            cache: false,
            success: function(data) {
              response($.map(data.list, function(item) {
                if(regex.test(item.name)){
                  return {
                      label: item.name,
                      category: item.country,
                  };
                }
              }));
            }
        });
      },
      minlength:0
    });
  });