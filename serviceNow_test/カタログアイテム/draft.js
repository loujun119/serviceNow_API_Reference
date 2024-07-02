// infra_dc_cs_initialization	
function onLoad() {
    // 入室責任者
    g_form.setDisplay('infra_dc_responsible', false);

    // 予定入館日時
    g_form.setDisplay('infra_dc_planned_entry_datetime', false);

    // 予定退館日時
    g_form.setDisplay('infra_dc_planned_exit_datetime', false);

    // ラック番号
    g_form.setDisplay('infra_dc_rack_number', false);

    // 持ち出しカード番号
    g_form.setDisplay('infra_dc_tokyo_card_number', false);

    // 入室理由
    g_form.setDisplay('infra_dc_reason_for_visit', false);

    // 入室者
    g_form.setDisplay('infra_dc_visitor_list', false)
}

// infra_dc_cs_setRackNoAndCardNo
function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading || newValue == '') {
        return;
    }
    // 入室責任者
    g_form.setDisplay('infra_dc_responsible', false);

    // 予定入館日時
    g_form.setDisplay('infra_dc_planned_entry_datetime', false);

    // 予定退館日時
    g_form.setDisplay('infra_dc_planned_exit_datetime', false);

    // ラック番号
    g_form.setDisplay('infra_dc_rack_number', false);

    // 入室理由
    g_form.setDisplay('infra_dc_reason_for_visit', false);

    // 入室者
    g_form.setDisplay('infra_dc_visitor_list', false);

    if (newValue == 'osaka') {
        g_form.setMandatory('infra_dc_rack_tokyo_1', false);
        g_form.setValue('infra_dc_rack_tokyo_1', false);
        g_form.setValue('infra_dc_rack_tokyo_2', false);
        g_form.setValue('infra_dc_rack_tokyo_3', false);

        g_form.setDisplay('infra_dc_rack_tokyo_1', false);
        g_form.setDisplay('infra_dc_rack_tokyo_2', false);
        g_form.setDisplay('infra_dc_rack_tokyo_3', false);

        g_form.setDisplay('infra_dc_rack_osaka_1', true);
        g_form.setMandatory('infra_dc_rack_osaka_1', true);
        g_form.setValue('infra_dc_rack_osaka_1', true);

        // 持ち出しカード番号
        g_form.setMandatory('infra_dc_tokyo_card_number', false);
        g_form.setDisplay('infra_dc_tokyo_card_number', false);
    } else if (newValue === 'tokyo') {
        g_form.setMandatory('infra_dc_rack_osaka_1', false);
        g_form.setValue('infra_dc_rack_osaka_1', false);
        g_form.setDisplay('infra_dc_rack_osaka_1', false);

        g_form.setValue('infra_dc_rack_tokyo_1', true);
        g_form.setValue('infra_dc_rack_tokyo_2', true);
        g_form.setValue('infra_dc_rack_tokyo_3', true);

        g_form.setDisplay('infra_dc_rack_tokyo_1', true);
        g_form.setDisplay('infra_dc_rack_tokyo_2', true);
        g_form.setDisplay('infra_dc_rack_tokyo_3', true);
        g_form.setMandatory('infra_dc_rack_tokyo_1', true);

        // 持ち出しカード番号
        g_form.setDisplay('infra_dc_tokyo_card_number', true);
        g_form.setMandatory('infra_dc_tokyo_card_number', true);

    } else {
        // 入室責任者
        g_form.setDisplay('infra_dc_responsible', false);

        // 予定入館日時
        g_form.setDisplay('infra_dc_planned_entry_datetime', false);

        // 予定退館日時
        g_form.setDisplay('infra_dc_planned_exit_datetime', false);

        // ラック番号
        g_form.setDisplay('infra_dc_rack_number', false);

        // 入室理由
        g_form.setDisplay('infra_dc_reason_for_visit', false);

        // 入室者
        g_form.setDisplay('infra_dc_visitor_list', false);
    }
}
