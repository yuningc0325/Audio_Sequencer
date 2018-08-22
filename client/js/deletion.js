/**
* @author: Yu-Ning, Chang
* Delete data through AJAX.
*/

/* global $*/
$(document).ready(function(){
    // Delete the project through AJAX
    $('.button-delete').on('click',function(){
        var id=$(this).data('id'),
            userID=$(this).data('user'),
            url='/user_'+userID+'/projects_'+id;
        if(confirm("are you sure?")){
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(result){
                         console.log("seccess");
                         window.location.href='/user_'+userID+'/projects';
                },
                error:function(err){
                    console.log(err);
                }
            });
        }
    });
    
    // Delete the track through AJAX
    $('.button-delete-tracks').on('click',function(){
        var id=$(this).data('id'),
            userID=$(this).data('user'),
            projectID=$(this).data('project'),
            url='/user_'+userID+'/projects_'+projectID+'/tracks_'+id;
        if(confirm("are you sure?")){
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(result){
                         console.log("seccess");
                         window.location.href='/user_'+userID+'/projects_'+projectID+'/tracks';
                },
                error:function(err){
                    console.log(err);
                }
            });
        }
    });
});
