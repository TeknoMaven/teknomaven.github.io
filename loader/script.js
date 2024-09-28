document.getElementById('showLoaderButton').addEventListener('click', function() {
    const loaderContainer = document.getElementById('loaderContainer');
    loaderContainer.style.display = 'flex';
  
    // Simulasi loading selama 3 detik
    setTimeout(function() {
      loaderContainer.style.display = 'none';
    }, 3000);
  });
  