//client side logic
$(function(){
  console.log('document loaded');
  getTasks();


    $('#task-form').on('click', '#add', addTask);

});

function getTasks(){
  $.ajax({
    url: '/tasks',
    type: 'GET',
    success: displayTasks
  });
}
function displayTasks(tasks){
  console.log('Got tasks from the server', tasks);

  $('to-do').empty();
  tasks.forEach(function(task){
      var $li = $('<li></li>');
      var $form = $('<form></form>');
      //needs to have name of column on DB not name on the DOM
  $form.append('<input type="text" name="task_input" value="' + task.task + '"/>');
  $form.append('<input type="text" name="status" value="' + task.status + '"/>');


  $li.append($form);
  $('#to-do').append($li);
});

}

function addTask(event){
  //prevent browser from refreshing
  event.preventDefault();
//get the infor out of the form
//jQuery method to get info out of form
var formData = $('#task-form').serialize();
  console.log(formData);
//send data to server
$.ajax({
  url: '/tasks',
  type: 'POST',
  data: formData,
  success: getTasks
})

}
