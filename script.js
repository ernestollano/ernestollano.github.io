var UCMCNumberBuilder = {
    mapping: {
        '2': '77370',
        '3': '77375',
        '4': '77383',
        '5': '77379',
        '6': '77392'
    },
    getFullNumberForCallbackNumber: function (callback_number) {
        if (callback_number.length > 0) {
            var number_prefix = this.mapping[callback_number[0]];
            if (number_prefix) {
                return number_prefix + callback_number;
            }
        }

        return null;
    },
    formatPhoneNumber: function (number) {
        if (number.length >= 3) {
            return number.replace(/(\d{3})(\d{1,3})?(\d{1,4})?/, '($1) $2-$3');
        }

        return null;
    }
};

$(function () {
    var $submit = $('button[type=submit]').click(function (e) {
        e.preventDefault;

        var number = UCMCNumberBuilder.getFullNumberForCallbackNumber($callback_number.val());
        if (number) {
            if (number.length === 10) {
                window.location = 'tel:' + number;
            } else {
                alert("Please enter all five digits to dial a valid phone number.");
            }
        } else {
            alert("Supported callback numbers start with 2, 3, 4, 5 or 6.");
        }
    });
    
    var updateSubmitButton = function (suffix) {
        var submit_button_text = 'Dial';
        var number = UCMCNumberBuilder.getFullNumberForCallbackNumber(suffix);
        if (number) {
            submit_button_text += ' ' + UCMCNumberBuilder.formatPhoneNumber(number);
        }

        $submit.text(submit_button_text);
    };

    var $callback_number = $('#callback-number').keyup(function () {
        updateSubmitButton($(this).val());
    });

    $('.bookmarks a').click(function (e) {
        e.preventDefault();

        var code = $(this).attr('data-code');
        $callback_number.val(code);
        updateSubmitButton(code);
        $submit.trigger('click');
    });
});
