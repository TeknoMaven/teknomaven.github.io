$(document).ready(function() {
  function showToast(type, message) {
      const toast = $('<div class="toast"></div>').addClass(`toast-${type}`).text(message);

      const position = $('#toast-position').val();
      const toastContainer = $('#toast-container');

      // Remove all position classes before adding the new one
      toastContainer.removeClass('top-right top-left bottom-right bottom-left');
      toastContainer.addClass(position);

      toastContainer.append(toast);
      toast.fadeIn(400).delay(3000).fadeOut(400, function() {
          $(this).remove();
      });
  }

  $('#show-success').click(function() {
      showToast('success', 'Operation was successful!');
  });

  $('#show-error').click(function() {
      showToast('error', 'An error occurred.');
  });

  $('#show-info').click(function() {
      showToast('info', 'Here is some information.');
  });
});
