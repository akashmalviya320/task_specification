
$(document).ready(function() {
    	
	$(document).on('click', '.btn-user-save', function() {
	   var id = $(this).attr('id');
	   var oper = $(this).attr('oper');
	   manageUser(id, oper);
	});
	
});

function showUserTable(table_id) {
    showUser();
    setUserTable(table_id, 'Y');
}

function setUserTable(table_id, page) {
  
  $(function() {
    var table = $(table_id).DataTable({
      data: dataUser(),
      retrieve: true,
      visible: true,
      api: true,       
      scrollX: true,
      autowidth: true,
      scrollY: false,
      paging: page=='Y'?true:false,
      ordering:false,
      columns: 
        [   { 'data': 'member_id' },
			{ 'data': 'user_name' },
			{ 'data': 'user_email'},
			{ 'data': 'role_code',
			  'title': 'Role',
			  'render': function(data, type, row, meta) {
				return data === 'ADM' ? 'Admin' : 'Member';
			  }
			},
			{ 'data': 'member_id',
				'title': 'Delete',
				'orderable': false,
				'searchable': false,
				'render': function(data, type, row, meta) {
				  return `<i class="fa fa-trash text-danger pl-30 sa_warning" type="USR"  oper="D" style="cursor:pointer;" data-id="${data}" title="Delete Task"></i>`;
				}
		    },
        ],   
      "language": {
        "emptyTable": "No Records Found"   
      },       
    });
    table.columns.adjust();
    $(table_id).css('cursor', 'pointer');
  });

}

function dataUser() {
  var json_data = [];
  var json_url = 'api/ap_as_user.php?user_uid='+user_uid+'&oper=S';
  $.ajax({
    url: json_url,
    async: false,
    contentType : 'application/json',
    dataType : 'json',
    success : function(result) {
      json_data = result.records;
    },
  });
  return json_data;    

}
  
function showUser() {
  
  var user_html = `<!-- users -->`;
  page = 'VUSR';
  
  user_html += `
    <div class="row mt-10">`;
        
  user_html += showTitle(page);
  
  user_html +=`                     
      <div class="row">
        <div class="col-lg-12">
          <div class="panel panel-default card-view">
            <div class="panel-wrapper collapse in">
              <div class="panel-body">  
                <div class="table-wrap">  
                  <div class="table-responsive">
                    <div  class="tab-struct custom-tab-1">
                      <div class="tab-content" id="tp_tab_content">                    
                        <div id="tp_pending" class="tab-pane fade active in" role="tabpanel">
                          <table id="user_table" class="table display table-hover tsk_table" width="100%" data-page-size="10">
                            <thead>
                              <tr>
                                <th data-field="member_id" data-sortable="true">Member ID</th>
                                <th data-field="user_name" data-sortable="true">Name</th>
                                <th data-field="user_email" data-sortable="true">Email</th>
                                <th data-field="role_code" data-sortable="true">Role</th>
								<th >Delete</th>
                              </tr>                        
                            </thead>  
                          </table>   
                        </div>
                      </div>
                    </div>   
                  </div>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Row -->`;  

  $("#page-content").html(user_html);
  
  setTitleBtn("btn btn-success btn-rounded btn-icon left-icon btn-user-create", "Create", "fa fa-plus");

}
