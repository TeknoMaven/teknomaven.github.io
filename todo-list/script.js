$(document).ready(function() {
    // Function to mark item as completed
    $(document).on('click', '.mark-complete', function() {
      $(this).closest('.todo-item').toggleClass('completed');
    });

    // Function to remove todo item
    $(document).on('click', '.remove-item', function() {
      $(this).closest('.todo-item').remove();
    });

    // Function to add new todo item
    $('#add-todo').click(function() {
      var newTodo = $('#new-todo').val();
      if (newTodo) {
        $('#todo-list').append(`
          <li class="todo-item list-group-item d-flex justify-content-between align-items-center">
            <span>${newTodo}</span>
            <div>
              <button class="btn btn-sm btn-success mark-complete">Selesai</button>
              <button class="btn btn-sm btn-danger remove-item">Hapus</button>
            </div>
          </li>
        `);
        $('#new-todo').val(''); // Clear input after adding
      }
    });

    // Allow adding todo with Enter key
    $('#new-todo').keypress(function(e) {
      if (e.which == 13) { // 13 is the Enter key
        $('#add-todo').click();
      }
    });
  });