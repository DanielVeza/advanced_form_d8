/**
 * @file
 */
(function ($) {
  Drupal.behaviors.advancedform = {
    attach: function (context) {
      //$('form.advancedform-filtered').append("<div class='advancedform-toggle' title='Some form elements may be hidden. Switch this form between full and partial detail'>Switch to Advanced</div>");
      $('.node-form').prepend("<div class='advancedform-toggle btn' title='Some form elements may be hidden. Switch this form between full and partial detail'>Switch to Advanced</div>");
      $('.advancedform-toggle').on('click', function () {
        if ($(this).text() == 'Switch to Advanced') {
          $('.node-form').removeClass('advancedform-filtered');
          $(this).html('Switch to Filtered');
        }
        else {
          $('.node-form').addClass('advancedform-filtered');
          $(this).html('Switch to Advanced');
        }
      });

      var previousSelections = [];
      $(".advancedform-filtered .field--widget-options-select select").on('change', function () {
        $(':selected', $(this)).each(function () {
          if(Array.isArray(previousSelections)) {
            for(selection in previousSelections) {
              console.log(selection);
              $('form.advancedform-filtered').removeClass(previousSelections[selection]);
            }
          }
          var selectedText = $(this).text();
          var processedText = selectedText.toLowerCase().replace(/%[0-9A-F]/gi,'').replace(/ /g, '-');
          var selectedValue = $(this).val();
          previousSelections.push('selected-' + processedText);
          if(selectedValue !== '_none') {
            $('form.advancedform-filtered').addClass('selected-' + processedText);
          }
        });
      });
    }
  }
})(jQuery)