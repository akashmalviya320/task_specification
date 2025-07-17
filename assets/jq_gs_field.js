function getFieldValue(fld_name, modal_id) {
  var field_name = '';
  var field_val = '';
  
  if(checkNull(modal_id)) 
    field_name = '[name='+fld_name+']';
  else 
    field_name = '#'+modal_id+' [name='+fld_name+']';

  if($(fld_name).is('img')) 
    field_val = $.trim($(field_name).attr('src'));
  else
    field_val =  $.trim($(field_name).val());

  //Field validations
  //All fields end with "-NM" are non-mandatory.
  if(($(field_name).is("select") && fld_name.split("-").pop().toUpperCase() !== 'NM') || $(field_name).prop('required'))
    blankField(field_name, field_val);
  checkFieldVal(field_name, fld_name, field_val);

  return field_val;

}

function blankField(field_name, field_val) {

  if($(field_name).attr('type') !== 'file' && (field_val.length == 0 || field_val == 0)) {
    $(field_name).css('border-color', 'red');
    $(field_name).siblings('.select2-container').css('border', '1px solid red');
    error = 'Y';
  }  
  else if($(field_name).attr('type') == 'file' && $(field_name)[0].files.length == 0) {
    $(field_name).css({'border': '1px solid red', 'padding': '10px'});
    error = 'Y';  
  }    
  else {
    $(field_name).css('border-color', '');
    $(field_name).siblings(".select2-container").css('border', '');
    if($(field_name).attr('type') == 'file')  
      $(field_name).css({'border': '0 ', 'padding': '0'});     
  }  
}

function checkFieldVal(field_name, fld_name, field_val) {

  if(fld_name.toUpperCase().includes('EMAIL')) 
    if(invalidEmail(field_val)) {
      setErrorText(field_name, 'email-error-text', 'Email should be correct format.');
    }  
    else 
      setErrorText(field_name, 'email-error-text', 'N');
    
  if(fld_name.toUpperCase().includes('PHONE')) 
    if(field_val.length < 10) {
      setErrorText(field_name, 'phone-error-text', 'Phone number should be 10 digits.');
    }  
  else 
    setErrorText(field_name, 'phone-error-text', 'N');

  if(fld_name.toUpperCase().includes('SERVICE_DATE')) 
    if(field_val > currDate) {
      setErrorText(field_name, 'service-date-error-text', 'Service date cannot be future date.');
    }  
  else 
    setErrorText(field_name, 'service-date-error-text', 'N');

  return;
  
}

function setErrorText(field_name, cls_name, err_txt) {
  var cls = '.'+cls_name;
  if(err_txt !== 'N') {
    $(cls).html(err_txt);
    $(cls).css('color', 'red');
    $(field_name).css("border-color", "red");
    error = 'Y';
  }  
  else {
    $(cls).html('');
    $(cls).css('color', '');
    $(field_name).css('border-color', '');
  }    
}