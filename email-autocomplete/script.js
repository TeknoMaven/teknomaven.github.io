const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];

    $(document).ready(function() {
        $('#emailInput').on('input', function() {
            let inputVal = $(this).val();
            let atPos = inputVal.indexOf('@');
            let inputPrefix = inputVal.slice(0, atPos);
            let domainInput = inputVal.slice(atPos + 1);
            let suggestions = '';

            if (atPos > 0) {
                domains.forEach(domain => {
                    if (domain.toLowerCase().startsWith(domainInput.toLowerCase())) {
                        suggestions += `<div class="autocomplete-item">${inputPrefix}@${domain}</div>`;
                    }
                });
            }

            if (suggestions) {
                $('#emailSuggestions').html(suggestions).show();
            } else {
                $('#emailSuggestions').hide();
            }
        });

        $(document).on('click', '.autocomplete-item', function() {
            $('#emailInput').val($(this).text());
            $('#emailSuggestions').hide();
        });

        $(document).click(function(e) {
            if (!$(e.target).closest('#emailInput').length) {
                $('#emailSuggestions').hide();
            }
        });
    });