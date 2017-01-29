//client side logic
$(function(){
  console.log('document loaded');
  getTasks();


    $('#task-form').on('click', '#add', addTask);
    $('#to-do').on('click', '.complete', updateTask);
    $('#to-do').on('click', '.delete', deleteTask);
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

  $('#to-do').empty();
  tasks.forEach(function(task){
      var $li = $('<li></li>');
      var $form = $('<form></form>');
      //needs to have name of column on DB not name on the DOM
  $form.append('<input type="text" name="task_input" value="' + task.task + '"/>');
  $form.append('<input type="text" name="status" value="' + task.status + '"/>');


  var $completebutton= $('<button class="complete">Complete</button>');
    $completebutton.data('id', task.id);
    $form.append($completebutton);

    //delete button
  var $deletebutton=$('<button class="delete">Delete</button>');
   $deletebutton.data('id', task.id);
   $form.append($deletebutton);


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

function updateTask(event){
  event.preventDefault();
  var $button= $(this);
  var $form = $button.closest('form');

  var data = $form.serialize();

  $.ajax({
    url: '/tasks/' + $button.data('id'),
    type: 'PUT',
    data: data,
    success: getTasks
  });

}

function deleteTask(event){
    event.preventDefault();
    //$(this) refers to a delete button that was clicked on
    $.ajax({
      url: '/tasks/' + $(this).data('id'),
      type: 'DELETE',
      success: getTasks
    });

}
