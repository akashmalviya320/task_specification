function showLeftSidebar() {
  var lsb_html = `<!-- Left Side Bar -->`;

  // if(roles_arr.includes(role_code)) {
    lsb_html += ` 
      <!-- Left Sidebar Menu -->
      <div class="lsiderbar fixed-sidebar-left">
        <ul class="nav navbar-nav side-nav nicescroll-bar">
          <li class="menu mt-10"  option="task-manager">
            <a role="button">
              <div class="pull-left">
                <i class="fa fa-clipboard-list mr-10"></i>
                <span class="right-nav-text">Task Manager</span>
              </div>
              <div class="clearfix"></div>
            </a>
          </li> `;
	if(role_code == 'ADM')
	lsb_html+=`
          <li class="menu mt-10"  option="user">
            <a role="button">
              <div class="pull-left">
                <i class="fa fa-user mr-10"></i>
                <span class="right-nav-text">User</span>
              </div>
              <div class="clearfix"></div>
            </a>
          </li>          
          `;

      lsb_html += `              
          </ul>
        </div>    
        <!-- /Left Sidebar Menu -->
      `;
      
  //}  

  $("#lsidebar").html(lsb_html);
  
}



						