//client side logic
$(function(){
  console.log('document loaded');
  getTasks();


    $('#task-form').on('click', '#add', addTask);
    $('#to-do').on('click', '.update', updateTask);
    $('#to-do').on('click', '.delete', deleteTask);
    $('#to-do').on('click', '.complete', toggleTask);
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
  // $form.append('<input type="checkbox" name="status" value="' + task.status + '"/>');


  var $updatebutton= $('<button class="update">Update</button>');
    $updatebutton.data('id', task.id);
    $form.append($updatebutton);

    var $completebutton= $('<button class="complete">Complete</button>');
      $completebutton.data('status', task.status);
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
formData.status = false;
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
  console.log(data);

  $.ajax({
    url: '/tasks/' + $button.data('id'),
    type: 'PUT',
    data: data,
    success: getTasks
  });

}

function deleteTask(event){
    event.preventDefault();
  prompt("Are you sure you want to deleteTask");

    $.ajax({
      url: '/tasks/' + $(this).data('id'),
      type: 'DELETE',
      success: getTasks
    });

}
function toggleTask(event){
  event.preventDefault();
  var $button= $(this);
  var $form = $button.closest('form');
  var status = $(this).data('status');
  var data = {};
  console.log(data);

  if (status == true){
              data.status = false;
             $(this).parent().parent().css('background-color', 'red');
              $(this).data('status', false);
        }else{
          data.status = true;
         $(this).parent().parent().css('background-color', 'green');
         $(this).data('status', true);

           }
  $.ajax({
    url: '/complete/' + $button.data('id'),
    type: 'PUT',
    data: data,
    // success: getTasks
  });

}
