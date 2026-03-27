<?php

$this->on('app.admin.init', function() {
    $this->script([
        'recurringfield:assets/vue-components/field-recurring.js',
    ], 'recurring-field');
});
