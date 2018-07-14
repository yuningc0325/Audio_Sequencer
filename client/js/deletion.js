$(document).ready(function(){
    
    // Project delete 
    $('.button-delete').on('click',function(){
        var id=$(this).data('id');
        var userID=$(this).data('user');
        var url='/user_'+userID+'/projects_'+id;
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
    
    // track delete
    $('.button-delete-tracks').on('click',function(){
        var id=$(this).data('id');
        var userID=$(this).data('user');
        var projectID=$(this).data('project')
        
        var url='/user_'+userID+'/projects_'+projectID+'/tracks_'+id;
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
