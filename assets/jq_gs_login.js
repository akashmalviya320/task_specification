
$(document).ready(function(){
   
   $(document).on('change', '#login-email', function(){
		if (invalidEmail($(this).val().trim()))
		  $('#warning_text').text('Please enter a valid email address.');
		else
		  $('#warning_text').text('');
	});
	
	$(document).on('dblclick', '#user_table tbody tr', function () {
		if($(this).is('#user_table tbody tr')){
			var id = $('#user_table').DataTable().row(this).data().member_id;
			var json_url = 'api/ap_as_user.php?user_uid='+user_uid+'&id='+id+'&oper=S';
			  $.getJSON(json_url, function(data){				  
					modalUsers(id, 'U', data);
					$("#mPR-Edit").modal({backdrop: 'static', keyboard: false});
				}); 
		}
    });  


});

function showLogin(oper) {
	
	if(oper == 'C'){
		modalUsers(0, oper);
		$("#mPR-Edit").modal({backdrop: 'static', keyboard: false});
	}
	if(oper == 'L'){
	  resetCSS('L');
	  showLoginForm();   
	}
}


function modalUsers(id, oper, data){

var modal_title = oper == 'U' ? 'Update User' : 'Create User';
var user_name = '';
var user_email = '';
var role_code = '';

	if(oper == 'U'){
		user_name = data.records[0].user_name;
		user_email = data.records[0].user_email;
		role_code = data.records[0].role_code;
	}

	var profile_html=`
		<div id="mPR-Edit" class="modal fade" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		  <div class="modal-dialog">
			<div class="modal-content">
			  <div class="modal-header">
				<button type="button" class="close modal-close" data-dismiss="modal" aria-hidden="true">×</button>
				<h5 class="modal-title" id="myModalLabel">`+modal_title+`</h5>
			  </div>
			  <div class="modal-body pb-0">
				<!-- Row -->
				<div class="row">
				  <div class="col-sm-12">
					<div class="panel panel-default card-view">
					  <div class="panel-wrapper collapse in">
						<div class="panel-body">
						  <div class="form-wrap login-form-sec">
							<div class="col-md-12">
								  <div class="form-group">
									<label class="control-label nonecase-font mb-10" for="fname">Full Name*</label>
									<input class="form-control login-text" id="fullname" name="fullname" value="`+user_name+`" type="text" required>
								  </div>	
								  <div class="form-group">
								   <label class="control-label nonecase-font mb-10" for="role">Role*</label>
								   <select class="form-control login-text" id="user-role" name="user-role" required>
									<option value="" disabled selected hidden>-- Select Role --</option>
									<option value="admin"  ` + (role_code === 'ADM' ? 'selected' : '') + ` role_code="ADM">Admin</option>
									<option value="member" ` + (role_code === 'MEM' ? 'selected' : '') + ` role_code="MEM">Member</option>
								   </select>
								  </div>								  
								  <div class="form-group">
									<label class="control-label nonecase-font mb-10" for="email">Email*</label>
									<input class="form-control login-text" id="login-email" name="login-email" value="`+user_email+`" type="text" required>
									<p id="warning_text" class="txt-danger" ></p>
								  </div>
							  </div>`;
		if(oper == 'C')
			profile_html+=`
							  <div class="col-md-6">
								  <div class="form-group">
									<label class="control-label nonecase-font mb-10" for="password">Password*</label>
									<input class="form-control login-text" id="login-pwd" name="login-pwd" type="password" required>
									<small class="info-text ">Use A-Z, a-z, 0-9, !@#$%^&* in password</small>
								  </div>
							  </div>
							  <div class="col-md-6">
								  <div class="form-group">
									<label class="control-label nonecase-font mb-10" for="password">Re-Password*</label>
									<input class="form-control login-text" id="login-re-pwd" name="login-re-pwd" type="password" required>
								  </div>
							  </div>`;
		profile_html+=`					  
							<div class="form-group text-center">
							  <button class="btn btn-success mt-20 btn-profile-save" id="btn_profile_save"  mid="`+id+`" oper="`+oper+`" style="width:100%">Save</button>
							</div>
						  </div> 
						</div> 
					  </div> 
					</div> 
				  </div> 
				</div> 
			  </div> 
			  <div class="modal-footer">
			  </div>
			</div> 
		  </div> 
		</div>`;
	  
  $("#modal-Profile").html(profile_html);
}

function showLoginForm() {
 var login_html=`
			<div class="table-struct full-width full-height">
			  <div class="table-cell vertical-align-middle auth-form-wrap">
				<div class="mb-20 text-center">                  
					<div>               
					  <a><span class="brand-txt">Task Manager Login</span></a>
					</div>
				</div>
				<div class="login auth-form  ml-auto mr-50">
				  <div class="row">
					<div class="col-sm-12 col-xs-12">
					  <div class="form-wrap login-form-sec">
						<div class="form-group">
						  <label class="control-label nonecase-font mb-10" for="login-email">Email Address*</label>
						  <input class="form-control login-text" id="login-email" name="login-email" type="text"  required="">
						  <p id="warning_text" class="txt-danger" ></p>
						</div>
						<div class="form-group">
						  <label class="control-label nonecase-font mb-10" for="login-pwd">Password*</label>
						  <div class="clearfix"></div>
						  <input class="form-control login-text" id="login-pwd" name="login-pwd" type="password" required="">
						</div>
						<div class="form-group text-center">
						  <button class="btn btn-primary btn-login mt-20" style="width:100%">Login</button>
						</div>
				      </div>
					</div>	
                  </div>
				</div>
              </div>
            </div>
        <!-- /Row -->`;
  
   $("#page-content").html(login_html);
  
}

function getLogin(oper, id){

	error = 'N';
	var fullname='';
	var login_email='';
	var login_pwd='';
	var login_re_pwd='';
	var role='';
	
  
	if(oper == 'L' || oper == 'C'){
		login_email = getFieldValue('login-email');
		login_pwd = getFieldValue('login-pwd');
		if(login_pwd.length < 8) {
			alert_msg('Password Length', 'Password must be minimum of 8 characters.', 'E');
			error = 'Y';
		}
		if(checkNull(login_pwd)  ) {
			alert_msg('Maindatory Fields', 'Fields marked with (*) are mandatory and must be filled.', 'E');
			return ;
		}

    }
	if(oper == 'C' || oper == 'U')
	{
		fullname = getFieldValue('fullname');
		role = getFieldValue('user-role');
		login_email = getFieldValue('login-email');
		
		if(oper == 'C')
		{
			login_re_pwd = getFieldValue('login-re-pwd');
			if(login_pwd!=login_re_pwd){
				alert_msg('Password', 'Password and re-password are not same.', 'E');
			}
		}
		
		if(checkNull(fullname) || checkNull(role) || checkNull(login_email) ) {
			alert_msg('Maindatory Fields', 'Fields marked with (*) are mandatory and must be filled.', 'E');
			return ;
		}
	}
	
	// if(error == 'Y') {
		// manageGlobal('logged_in', 'N', 'S');
		 //return ;
	// }

	$.ajax({
		url: 'api/ap_gs_login.php',
		type : "POST",
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify({ id:id
							  , fullname:fullname
							  , role: role
							  , login_email: login_email
							  , login_pwd: login_pwd
							  , user_uid: user_uid
							  , oper: oper
							  }
							),
		success : function(result) {
			if(oper == 'L'){
				setLoginGlobal(result);
				location.reload();
				alert_msg('Login', 'Successfully logged-in.', 'S');
			}
			if(oper == 'C'){
				$('#mPR-Edit').modal('hide');
				alert_msg('Create', 'User created successfully.', 'S');
				showUserTable('#user_table');
			}
			if(oper == 'U'){
				$('#mPR-Edit').modal('hide');
				alert_msg('Create', 'User updated successfully.', 'S');
				showUserTable('#user_table');
			}
			if(oper == 'D'){
				showUserTable('#user_table');
			}
		},
		error: function(xhr, status, error) {
			console.log(xhr+' '+status+ ' '+error);
			alert_msg('Login', 'Login failed. Please check your Email or password.', 'E');
		}
	});
}  

function setLoginGlobal(result) {
  manageGlobal('logged_in', result.logged_in, 'S');
  manageGlobal('user_uid', result.user_uid, 'S');
  manageGlobal('user_email', result.user_email, 'S');
  manageGlobal('first_name', result.first_name, 'S');
  manageGlobal('middle_name', result.middle_name, 'S');
  manageGlobal('last_name', result.last_name, 'S');  
  manageGlobal('user_name', result.user_name, 'S');
  manageGlobal('role_code', result.role_code, 'S');
  manageGlobal('status', result.status, 'S');
  manageGlobal('last_login', result.last_login, 'S');
  setGlobal();
}

