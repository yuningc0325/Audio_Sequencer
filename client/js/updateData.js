$(document).ready(function(){
    $('.button-edit-project').on('click',function(){
     $('#editForm').attr('action','/user_'+$(this).data('user')+'/projects_'+$(this).data('id'));
    });
});