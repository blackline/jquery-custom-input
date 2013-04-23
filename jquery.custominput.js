/*--------------------------------------------------------------------
 * jQuery plugin: customInput()
 * by Maggie Wachs and Scott Jehl, http://www.filamentgroup.com
 * Copyright (c) 2009 Filament Group
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 * Article: http://www.filamentgroup.com/lab/accessible_custom_designed_checkbox_radio_button_inputs_styled_css_jquery/
 * Usage example below (see comment "Run the script...").
--------------------------------------------------------------------*/

/**
 * Heavily editted by Brad Hafichuk to work with Zend Frameworks Zend_Form html structure
 */
jQuery.fn.customInput = function(){
    $('.customInput').each(function(i){
        if($(this).is('[type=checkbox],[type=radio]')){
            var input = $(this);

            // get the associated label using the input's id
            var label = $(input).parent();
            label.attr('for', $(this).attr('id'));

            //get type, for classname suffix
            var inputType = (input.is('[type=checkbox]')) ? 'checkbox' : 'radio';

            var readonly = (input.attr('readonly')) ? ' readonly' : '';

            var disabled = (input.hasClass('disabled')) ? ' disabled' : '';
            label.addClass(disabled);

            if(input.hasClass('toggle')) {
                // Wrap the toggles once with a div (for styling only)
                if(!label.parent().hasClass('custom-toggle')) {
                    siblings = label.parent().children();
                    $('<div class="custom-toggle' + readonly + '"></div>').insertBefore(label).append(siblings);
                }
            } else {
                // wrap the input + label in a div
                $('<div class="custom-'+ inputType + readonly + '"></div>').insertBefore(label).append(label);
            }

            // find all inputs in this set using the shared name attribute
            var allInputs = $('input[name="'+input.attr('name')+'"]');
            // necessary for browsers that don't support the :hover pseudo class on labels
            label.hover(
                function(){
                    if(!input.attr('disabled')) {
                        $(this).addClass('hover');
                        if(inputType == 'checkbox' && input.is(':checked')){
                            $(this).addClass('checkedHover');
                        }
                    }
                },
                function(){ $(this).removeClass('hover checkedHover'); }
            );

            if (readonly === '') {
                label.click(
                    function () {
                        if (!$(this).hasClass('disabled')) {
                            $(this).find('input').prop("checked", true)
                                                 .trigger('updateState');
                        }

                        return false;
                    }
                );
            }

            //bind custom event, trigger it, focus,blur events
            input.bind('updateState', function(){
                if (input.is(':checked')) {
                    if (input.is(':radio')) {
                        allInputs.each(function(){
                            $('label[for='+$(this).attr('id')+']').removeClass('checked');
                        });
                    }
                    label.addClass('checked');
                }
                else { $('label[for='+$(this).attr('id')+']').removeClass('checked checkedHover checkedFocus'); }

            })
            .trigger('updateState')
            .focus(function(){
                label.addClass('focus');
                if(inputType == 'checkbox' && input.is(':checked')){
                    $(this).addClass('checkedFocus');
                }
            })
            .blur(function(){ label.removeClass('focus checkedFocus'); });
        }
    });
};
jQuery.fn.customInput();
