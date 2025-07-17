function showNavbar() {

  var nb_html = `<!-- Top Navigation Bar -->`;

  nb_html += ` 
  <!-- /Top Menu Items -->

    		<!-- /Top Menu Items -->
		<nav class="navbar navbar-inverse navbar-fixed-top">
			<div class="mobile-only-brand pull-left">				
				<a id="toggle_nav_btn" class="toggle-left-nav-btn inline-block ml-20 pull-left" href="javascript:void(0);"><i class="zmdi zmdi-menu"></i></a>
			</div>
      <div id="mobile_only_nav" class="mobile-only-nav">
          <ul class="nav navbar-header">
            <li class="topbar-title">
              <a href="/" class="txt-dark ">Task Manager</a>
            </li>  
          </ul> 
      </div>
			
			<div id="mobile_only_nav" class="mobile-only-nav pull-right">
				<ul class="nav navbar-right top-nav pull-right">     
					<li class="dropdown auth-drp">
						<a href="#" class="dropdown-toggle pr-10 user_name" data-toggle="dropdown"><i class="fa fa-user mr-10"></i>`+user_name+`</a>
						<ul class="dropdown-menu user-auth-dropdown" data-dropdown-in="flipInX" data-dropdown-out="flipOutX">
							<li>
								<a href="#"><i class="zmdi zmdi-account"></i><span>Profile</span></a>
							</li>
							<li>
								<a href="#" class="menu btn-logout" option="exit"><i class="fa fa-sign-out top-nav-icon btn-logout"></i><span>Log Out</span></a>
							</li>
						</ul>
					</li>
				</ul>
			</div>	
		</nav>
		<!-- /Top Menu Items -->`;
  
  $("#navbar").html(nb_html);
      
}  
