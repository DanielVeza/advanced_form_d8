<?php

namespace Drupal\advanced_form\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class advancedFormSettingsForm.
 */
class advancedFormSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'advanced_form.advancedformsettings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'advanced_form_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('advanced_form.advancedformsettings');
    $form['rules_global'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Rules'),
      '#description' => $this->t('Define the rules that will apply to all users.'),
      '#default_value' => $config->get('rules_global'),
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $enteredRules = $form_state->getValue('rules_global');
    $rules = $this->parseRules($enteredRules);
    //kint($rules);
    //die();
    $rules = $enteredRules;
    if(!empty($rules)) {
      $this->config('advanced_form.advancedformsettings')
        ->set('rules_global', $rules)
        ->save();
      $this->createCSS($rules);
    }
  }

  /**
   * Not working at the moment. Causes validation issues.
   * @param $text
   * @return array
   */
  private function parseRules($text) {
    $ruleset = [];
    $rules = explode(PHP_EOL, $text);
    foreach ($rules as $rule) {
      // Enquote everything before trying to json it.
      $rule = preg_replace('/([a-zA-Z0-9_\#\-\. ]+)/', '"$1"', $rule);
      $rule_object = json_decode('{' . $rule . '}');
      if (empty($rule_object)) {
        drupal_set_message("JSON rule <pre>$rule</pre> could not be parsed", 'error');
      }
      $ruleset = array_merge_recursive($ruleset, (array) $rule_object);
    }
    return $ruleset;
  }

  private function createCSS($rules) {
    $ruleset = explode(PHP_EOL, $rules);
    $selectors = [];
    $css = '';
    foreach($ruleset as $rule) {
      $selectors[] = strstr($rule, ':', true);
    }
    foreach ($selectors as $key => $selector) {
      $concatSelectors = strstr($ruleset[$key], '[');
      $concatSelectors = str_replace('[', '', $concatSelectors);
      $concatSelectors = str_replace(']', '', $concatSelectors);
      $css .= 'form.advanced-form-filtered';
      $css .= $selector . '' . $concatSelectors . ' {' . PHP_EOL;
      $css .= '  display: none;' . PHP_EOL;
      $css .= '}' . PHP_EOL;
    }
    //$dir = drupal_get_path('module', 'advanced_form') . '/css/advanced-form.css';
    $dir = 'public://css/advanced-form.css';
    $file = file_unmanaged_save_data($css, $dir, FILE_EXISTS_REPLACE);
  }

}
