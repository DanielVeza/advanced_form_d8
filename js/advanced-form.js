/**
 * @file
 *
 * Whole lot of code duplication in this, and formatting stuff.
 * Needs severe clean before publish. Just getting it working for now on short timeframe
 */
(function ($) {
  Drupal.behaviors.advancedform = {
    attach: function (context) {
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
          previousSelections = Drupal.behaviors.advancedform.addAdvancedFormClasses(previousSelections, $(this));
      });

      $(".advanced-form-filtered .field--widget-options-select select").on('change', function () {
        $(':selected', $(this)).each(function () {
          if(Array.isArray(previousSelections)) {
            for(var selection in previousSelections) {
              $('form.advanced-form-filtered').removeClass(previousSelections[selection]);
            }
          }
          previousSelections = Drupal.behaviors.advancedform.addAdvancedFormClasses(previousSelections, $(this));
        });
        $(".field--widget-options-select option:selected").each(function() {
          previousSelections = Drupal.behaviors.advancedform.addAdvancedFormClasses(previousSelections, $(this));
      });
      });
    },
    addAdvancedFormClasses: function(previousSelections, element) {
      var selectedText = element.text();
      var processedText = selectedText.toLowerCase().replace(/%[0-9A-F]/gi,'').replace(/ /g, '-');
      var selectedValue = element.val();
      if(selectedValue !== '_none') {
        $('form.advanced-form-filtered').addClass('selected-' + processedText);
        previousSelections.push('selected-' + processedText);
      }
      return previousSelections;
    }
  }
})(jQuery);
