$(window).on('load', function(){
  $("body").removeClass("loading"); 
	// alert("loggrd_in : "+logged_in + "role_code"+role_code+" User Email"+ user_email+" User Name " +user_name);
});

$(document).ready(function(){

  setGlobal();
	// alert("loggrd_in : "+logged_in + "role_code"+role_code+" User Email"+ user_email+" User Name " +user_name);
	  if(logged_in == 'N'){
		showLogin('L');
	  }
	  else {
		showTaskTable('#task_table');
     }  
	 

	$(document).on('click', '.btn-logout, .back-to-login, .btn-user-create', function(e){
		if($(this).is('.btn-user-create'))
		  showLogin('C');
		else if($(this).is('.btn-logout')){
		  manageGlobal('logged_in', 'N', 'S');  
		  showLogin('L');
		  alert_msg('Logout', 'Successfully logged out.', 'S');
		}
		  
	});

	$(document).on('click', '.modal-close', function() {
		$('#mPR-Edit').modal('hide');
	});

  $(document).on('click', '.btn-login, .btn-profile-save', function(e){
    if ($(this).is('.btn-login'))
      getLogin('L');
	else if ($(this).is('.btn-profile-save')){
	  var id = $(this).attr('mid');
	  var oper = $(this).attr('oper');
      getLogin(oper, id);
	}
  });

 $(document).on('click', '.menu', function(){
    option = $(this).attr('option');
    menuAction(option);
  });
  
  $(document).on('click', '.sa_warning', function (e) {
	
	e.preventDefault();
	var id = $(this).attr('data-id');
	var oper = $(this).attr('oper');
	var type = $(this).attr('type');
	var confirmationText = {
		'USR': {
			text: "You will not be able to resume the delete process!",
			confirmButtonColor: "#d9534f",
			confirmButtonText: "Yes, Delete User!",
			successTitle: "Deleted!",
			successMessage: "This user has been deleted."
		},
		'TSK': {
			text: "You will not be able to resume the delete process",
			confirmButtonColor: "#d9534f",
			confirmButtonText: "Yes, Delete Task!",
			successTitle: "Deleted!",
			successMessage: "This task has been deleted."
		}
	};
	var action = confirmationText[type];

	swal({
		title: "Are you sure?",
		text: action.text, 
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: action.confirmButtonColor,
		confirmButtonText: action.confirmButtonText,
		closeOnConfirm: false
		}, function () {
			manageSweetAlert(id, oper, type, action.successTitle, action.successMessage);
	});
	return false;
  });

});  

function manageSweetAlert(id, oper, type, title, msg){
	if(type == 'USR'){
		getLogin(oper, id);
	}
	else if(type == 'TSK'){
		manageTask(id, oper);
	}
	swal (title,msg, "success");	
}

function menuAction(option) {
  if (option=='task-manager')
    showTaskTable('#task_table');
  else if (option=='user') 
    showUserTable('#user_table');
}
