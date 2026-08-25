jsFrontend.faq={init:function(){if($('input[data-role=fork-feedback-useful]').length>0)jsFrontend.faq.feedback.init()}}
jsFrontend.faq.feedback={init:function(){$('input[data-role=fork-feedback-useful]').on('change',function(){var $wrapperForm=$(this.form)
var useful=parseInt($('input[data-role=fork-feedback-useful]:checked').val())
if(useful===1){$wrapperForm.find('textarea[data-role=fork-feedback-improve-message]').prop('required',!1)
$wrapperForm.submit()
return}
$wrapperForm.find('textarea[data-role=fork-feedback-improve-message]').prop('required',!0)
$wrapperForm.find('[data-role=fork-feedback-container]').show()})}}
$(jsFrontend.faq.init)