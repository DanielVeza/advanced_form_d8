/**
 * @file
 *
 * Whole lot of code duplication in this, and formatting stuff.
 * Needs severe clean before publish. Just getting it working for now on short timeframe
 */
(function ($) {
  Drupal.behaviors.advancedform = {
    attach: function (context) {
      //$('form.advanced-form-filtered').append("<div class='advanced-form-toggle' title='Some form elements may be hidden. Switch this form between full and partial detail'>Switch to Advanced</div>");
      $('.node-form').once().prepend("<button class='advanced-form-toggle btn' type='button' title='Some form elements may be hidden. Switch this form between full and partial detail'>Switch to Advanced</button>");
      $('.advanced-form-toggle').on('click', function () {
        if ($(this).text() == 'Switch to Advanced') {
          $('.node-form').removeClass('advanced-form-filtered');
          $(this).html('Switch to Filtered');
        }
        else {
          $('.node-form').addClass('advanced-form-filtered');
          $(this).html('Switch to Advanced');
        }
      });

      var previousSelections = [];
      $(".field--widget-options-select option:selected").each(function() {
          var selectedText = $(this).text();
          var processedText = selectedText.toLowerCase().replace(/%[0-9A-F]/gi,'').replace(/ /g, '-');
          var selectedValue = $(this).val();
          if(selectedValue !== '_none') {
            $('form.advanced-form-filtered').addClass('selected-' + processedText);
            previousSelections.push('selected-' + processedText);

          }
      });

      $(".advanced-form-filtered .field--widget-options-select select").on('change', function () {
        $(':selected', $(this)).each(function () {
          if(Array.isArray(previousSelections)) {
            for(selection in previousSelections) {
              console.log(previousSelections);
              console.log($(this));
              $('form.advanced-form-filtered').removeClass(previousSelections[selection]);
            }
          }
          var selectedText = $(this).text();
          var processedText = selectedText.toLowerCase().replace(/%[0-9A-F]/gi,'').replace(/ /g, '-');
          var selectedValue = $(this).val();
          previousSelections.push('selected-' + processedText);
          if(selectedValue !== '_none') {
            $('form.advanced-form-filtered').addClass('selected-' + processedText);
          }
        });
        $(".field--widget-options-select option:selected").each(function() {
          var selectedText = $(this).text();
          var processedText = selectedText.toLowerCase().replace(/%[0-9A-F]/gi,'').replace(/ /g, '-');
          var selectedValue = $(this).val();
          if(selectedValue !== '_none') {
            $('form.advanced-form-filtered').addClass('selected-' + processedText);
            //previousSelections.push('selected-' + processedText);

          }
      });

      });
      //$(".advanced-form-filtered .field--widget-options-select select").trigger('change');
    }
  }
})(jQuery)
