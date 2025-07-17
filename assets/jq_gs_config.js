function setGlobal() {
  var server_name = location.hostname;

  var dt = (new Date($.now()));
  var day = {year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit'};
  hostname = $(location).attr('href');
  currDate = dt.toISOString().split('T')[0]; 
  currDateTime = dt.toLocaleDateString();
  currFullDate = dt.toLocaleDateString('en-US', day);
  currFullDateTZ = dt;

  img_ext_arr = ['JPEG', 'JPG', 'PNG', 'GIF', 'TIFF', 'BMP'];

  logged_in = manageGlobal('logged_in');
  user_uid = manageGlobal('user_uid');
  role_code = manageGlobal('role_code');
  user_email = manageGlobal('user_email');
  first_name = manageGlobal('first_name');
  middle_name = manageGlobal('middle_name');
  last_name = manageGlobal('last_name');
  user_name = manageGlobal('user_name');
  status = manageGlobal('status');
  last_login = manageGlobal('last_login');
 
  error = 'N';
  page = '';
  oper = '';
  error_msg = 'Action failed. Please contact the Regenexx support team.';
  required_msg = 'Fields marked with (*) are mandatory and must be filled.'
	
  if(checkNull(logged_in)){
    logged_in = 'N';
	manageGlobal('logged_in', logged_in, 'S');
  }

  showNavbar();
  showLeftSidebar();
}  


function manageGlobal(key, val, type) {
  var value;
  if(type=='S')
    sessionStorage.setItem(key, val);
  else 
    value = sessionStorage.getItem(key);
  return value;
}  

function resetCSS(type) {
  if(type == 'L') {
		$('.bg-canvas').removeClass('container-fluid');
    $('.bg-canvas').addClass('login-bg');
    $('.page-wrapper').addClass('login-page-wraper');
    $('.page-wrapper').css({'padding': '0px', 'min-height': '0px'});
    $('.wrapper').addClass('slide-nav-toggle');
	$('#navbar').css('display', 'none');
    $('#lsidebar').css('display', 'none');
  }  
  else { 
    $('.bg-canvas').addClass('container-fluid');
    $('.bg-canvas').removeClass('login-bg');
    $('.page-wrapper').removeClass('login-page-wraper');
    $('.page-wrapper').css({'padding': '70px 20px'});
	$('#navbar').css('display', 'block');
    $('#lsidebar').css('display', 'block'); 
		initializeSlimscroll();										 
  }  
}


function invalidEmail(email_id) {
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email_id)))
    return true;
  else 
    return false;  
}  

function convertToDDMMYYYY(inputDate) {
  const [year, month, day] = inputDate.split('-');
  return `${day}-${month}-${year}`;
}

function formatDate(inputDate, format) {
  const parts = inputDate.split('-');

 	if (format === 'yyyy-mm-dd') {
		if (parts[2].length === 4) {
		// It's dd-mm-yyyy, so convert it
			const [day, month, year] = parts;
			inputDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
 			return inputDate;
		}else{
			return inputDate;
		}
	}
	else if (format === 'dd-mm-yyyy') {
		// Any other format requested → convert yyyy-mm-dd to dd-mm-yyyy
		const [year, month, day] = parts;
		inputDate = `${day}-${month}-${year}`;
 		return inputDate;
  }
}

function formatDates(inputDate) {
  if(inputDate) {
    var date = new Date(inputDate);
    var day = ('0' + date.getDate()).slice(-2); // Ensure day is 2 digits
    var month = date.toLocaleString('default', { month: 'short' });
    var year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
}

function IsEmail(email) {
  const regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) 
    return false;
  else 
    return true;
}

function alert_msg(head, msg, type, is_auto_hide_toast='Y' ) {
  var bgColor = '';
  var hide = 6000;
  if(is_auto_hide_toast =='N')
  hide=false;

  var position = 'top-center';                              
  if(type == 'S') 
    bgColor = '#2ecd99';
  else if(type == 'E') 
    bgColor = '#ed6f56';
  else {
    hide = false;
    position = 'bottom-center';
  } 
  $.toast().reset('all');   
  $.toast({
    heading: head,
    text: msg,
    position: position,
    bgColor: bgColor,
    loaderBg: '#d9534f',    
    hideAfter: hide
  });
  return false;
}

function setToken(p_token) {
  var random_num = Math.random().toString(36).slice(2, 7);
  
  if(checkNull(p_token))
    manageGlobal('session_token', $.md5(random_num, new Date($.now())), 'S');
  else 
    manageGlobal('session_token', p_token, 'S');
  
  token = manageGlobal('session_token');
}

function checkNull(fld) {
  if(typeof fld == 'undefined' || fld == null || fld == '' || fld == 'N')
    return true 
  else 
    return false;
}

function currentDate() {
  var now = new Date();
  return now.toISOString().substring(0,10);
}

function daysPast(days) {
  return new Date(Date.now() - days * (24 * 60 * 60 * 1000)).toISOString().split('T')[0];
}  

function initializeSlimscroll() {
    
	$('.nicescroll-bar').slimscroll({
			height: '100%',
			color: '#878787',
			disableFadeOut: true,
			borderRadius: 0,
			size: '4px',
			alwaysVisible: false
	});
}														


function showTitle(page) {
  
  var title = '';
  var text = '';
  if(page=='TSK') {
    title = 'Create Task';
    text = 'Create your task.';
  }
  else if(page == 'VUSR'){
	title = 'View User';
    text = 'View list of all users.';
  }; 	
  
  var title_html =`
        <!-- Title -->
        <div class="row mt-10">
          <div class="col-md-8">
            <h5 class="txt-dark page-title">`+title+`</h5>
            <p>`+text+`</p> 
          </div>  
          <button id="title_btn" class="pull-right mr-10"><i id="title_btn_icon"></i><span></span></button>
        </div>
        <!-- /Title -->
        <hr class="mb-20">`;

  return title_html;
}

function setTitleBtn(tb_class, tb_text, tb_icon) {
  
    $("#title_btn").addClass(tb_class).find("span").text(tb_text);
    $("#title_btn_icon").addClass(tb_icon);
}

function createDropdown(selected_user = '') {
	var json_url = 'api/ap_as_user.php?user_uid='+user_uid+'&oper=S';
	$.getJSON(json_url, function(data){
		var dropdown_html = `
			  <label class="control-label nonecase-font mb-10" for="assigned_to">Assigned To*</label>
			  <select class="form-control login-text" id="assigned_to" name="assigned_to" required>
				<option value="" disabled ${selected_user === '' ? 'selected' : ''} hidden>-- Select User --</option>`;

		data.records.forEach(function(user) {
			var full_name = user.user_name || '';
			var member_id = user.member_id || '';
			var selected = (full_name === selected_user) ? 'selected' : '';
			dropdown_html += `<option value="`+full_name+`" `+selected+` data-member-id="`+member_id+`">`+full_name+`</option>`;
		});

		dropdown_html += `</select>`;

		$('#task_dropdown').html(dropdown_html);
	});
}
