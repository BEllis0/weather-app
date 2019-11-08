import $ from 'jquery';

$(document).ready(function() {
    console.log('ready');
})

$(function() {
    console.log('jquery');

    $('#Title').click(function() {
        alert('asdf');
    })

    // $('.save-location-btn').click(function() {
    //     $('.main-section').animate({
    //         'display': 'flex',
    //         'flexDirection': 'row',
    //         'flexWrap': 'nowrap',
    //         'justifyContent': 'space-evenly',
    //         'alignItems': 'center'
    //     }, 2000);
    // });
});