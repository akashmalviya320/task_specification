
$(document).ready(function() {
    	
	$(document).on('click', '.btn-task-save', function() {
	   var id = $(this).attr('id');
	   var oper = $(this).attr('oper');
	   manageTask(id, oper);
	});
	
	$(document).on('click', '.btn-task-create', function(e){
		if($(this).is('.btn-task-create'))
			modalTask(0,'I');
			$("#mTS-Edit").modal({backdrop: 'static', keyboard: false});
	});
	
	$(document).on('dblclick', '#task_table tbody tr', function () {
		if($(this).is('#task_table tbody tr')){
			var id = $('#task_table').DataTable().row(this).data().id;
			var json_url = 'api/ap_as_task.php?user_uid='+user_uid+'&id='+id+'&oper=S';
			  $.getJSON(json_url, function(data){				  
					modalTask(id, 'U', data);
					$("#mTS-Edit").modal({backdrop: 'static', keyboard: false});
				}); 
		}
    });  
	
});

function showTaskTable(table_id, type) {
    showTask();
    setTaskTable(table_id,'Y', type);
}

function setTaskTable(table_id, page, type) {
  
  $(function() {
    var table = $(table_id).DataTable({
      data: dataTask(type),
      retrieve: true,
      visible: true,
      api: true,       
      scrollX: true,
      autowidth: true,
      scrollY: false,
      paging: page=='Y'?true:false,
      ordering:false,
      columns: 
        [ { 'data': 'title' },
          { 'data': 'description' },
          { 'data': 'assigned_to' },
          { 'data': 'assignee_email' },
          { 'data': 'status' },
          { 'data': 'created_on' },
		  {
			'data': 'id',
			'title': 'Delete',
			'orderable': false,
			'searchable': false,
			'visible': (role_code === 'ADM'), 
			'render': function(data, type, row, meta) {
			  return `<i class="fa fa-trash text-danger pl-30 sa_warning" type="TSK"  oper="D" style="cursor:pointer;" data-id="${data}" title="Delete Task"></i>`;
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

function dataTask(type) {
  var json_data = [];
  var json_url = 'api/ap_as_task.php?user_uid='+user_uid+'&id=0&oper=S';
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
  
function showTask() {
  
  var task_html = `<!-- Tasks -->`;
  page = 'TSK';
  resetCSS();
  
  task_html += showTitle(page);
  task_html += `
    <div class="row mt-10">`;
  
  task_html +=`                     
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
                          <table id="task_table" class="table display table-hover tsk_table" width="100%" data-page-size="10">
                            <thead>
                              <tr>
                                <th data-field="title" data-sortable="true">Title</th>
                                <th data-field="description" data-sortable="true">Description</th>
                                <th data-field="assigned_to" data-sortable="true">Assigned To</th>
                                <th data-field="assignee_email" data-sortable="true">Assignee Email</th>
                                <th data-field="status" data-sortable="true">Status</th>
                                <th data-field="created_on" data-sortable="true">Created On</th>
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

  $("#page-content").html(task_html);
  
  if(role_code == 'ADM'){
	setTitleBtn("btn btn-success btn-rounded btn-icon left-icon btn-task-create", "Create", "fa fa-plus");
  }

}


function modalTask(id, oper, data){

var title = '';//records.full_name;
var description = '';
var status = '';
var selected_user = ''; 
var modal_title = oper == 'U' ? 'Update Task' : 'Create Task';

	if(oper == 'U'){
		title = data.records[0].title;
		description = data.records[0].description;
		status = data.records[0].status;
		selected_user = data.records[0].assigned_to; 
	}
	var task_html=`
		<div id="mTS-Edit" class="modal fade" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
						  <div class="form-wrap login-form-sec">`;
	if(role_code == 'ADM'){			
		task_html+=`		  
							<div class="col-md-12">
							  <div class="form-group">
								<label class="control-label nonecase-font mb-10" for="title">Title*</label>
								<input class="form-control login-text" id="title" name="title" value="`+title+`" type="text" required>
							  </div>
							</div>
							<div class="form-group col-md-12 ">
								<label class="control-label nonecase-font mb-10" for="task_description">Description*</label>
								<textarea name="task_description" class="form-control login-text" rows="2" id="task_description" placeholder="Add your description here." required>`+description+`</textarea>
							</div>`;
	}
		task_html+=`
							<div class="form-group col-md-12">
							  <label class="control-label nonecase-font mb-10" for="status">Status*</label>
							  <select class="form-control login-text" id="status" name="status" value="`+status+`" required>
								<option value="" disabled selected hidden>-- Select Status --</option>
								<option value="Open"  ` + (status === 'Open' ? 'selected' : '') + `>Open</option>`;
	if(oper == 'U'){
		task_html+=`						
								<option value="In Progress"  ` + (status === 'In Progress' ? 'selected' : '') + `>In Progress</option>
								<option value="In Review" ` + (status === 'In Review' ? 'selected' : '') + `>In Review</option>
								<option value="Pending" ` + (status === 'Pending' ? 'selected' : '') + `>Pending</option>`;
		if(role_code == 'ADM')
			task_html+=`<option value="Completed" ` + (status === 'Completed' ? 'selected' : '') + `>Completed</option>`;
	}
		task_html+=`						
							  </select>
							</div>`;
		if(role_code == 'ADM')					
			task_html+=		`<div class="form-group col-md-12" id="task_dropdown" ></div>`;
							
		task_html+=`	
							 <div class="form-group text-center">
							  <button class="btn btn-success mt-20 btn-task-save" id="`+id+`" oper="`+oper+`" style="width:100%">Save</button>
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
	  
  $("#modal-Task").html(task_html);
  
 createDropdown( selected_user);
}


function manageTask(id, oper){

	var title='';
	var description='';
	var status='';
	var member_id='';
	
	if(oper != 'D'){
		if(role_code == 'ADM'){
			title = getFieldValue('title');
			description = getFieldValue('task_description');
			member_id = $('#assigned_to option:selected').data('member-id');
			if(checkNull(title) || checkNull(description) ) {
				alert("check adm");
				alert_msg('Maindatory Fields', 'Fields marked with (*) are mandatory and must be filled.', 'E');
				return ;
			}
		}
		status = getFieldValue('status');
	
	}

	$.ajax({
		url: 'api/ap_as_task.php',
		type : "POST",
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify({ id:id
							  , title:title
							  , description: description
							  , status: status
							  , member_id: member_id
							  , user_uid: user_uid
							  , oper: oper
							  }
							),
		success : function(result) {
			if(oper == 'I'){
				$('#mTS-Edit').modal('hide');
				alert_msg('Task', 'Task created successfully.', 'S');
				showTaskTable('#task_table');
			}
			if(oper == 'U'){
				$('#mTS-Edit').modal('hide');
				alert_msg('Task', 'Task updated successfully.', 'S');
				showTaskTable('#task_table');
			}
			if(oper == 'D'){
				alert_msg('Task', 'Task deleted successfully.', 'S');
				showTaskTable('#task_table');
			}
		},
		error: function(xhr, status, error) {
			console.log(xhr+' '+status+ ' '+error);
			alert_msg('Task', 'Task Creation/Updation/Deletion Failed', 'E');
		}
	});
}



// function setFilter() {
  
    // var filter_html = '';
       
    // filter_html += `
       // <div class="row align-items-center mb-3">
		  // <!-- Label -->
		  // <div class="col-auto">
			// <label class="control-label mb-0" for="status">Status</label>
		  // </div>

		  // <!-- Icon + Input -->
		  // <div class="col-md-6">
			// <div class="input-group">
			  // <div class="input-group-addon">
				// <i class="icon-flag"></i>
			  // </div>
			  // <input type="text" class="form-control" id="status" placeholder="Enter status">
			// </div>
		  // </div>
		// </div>
// `;

  // return filter_html;
  
// }      
