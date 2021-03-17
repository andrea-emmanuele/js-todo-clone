$(function () {
    let text = $("div.insert > input[type='text']");
    let add = $("div.insert > input[type='submit']");

    let itemTemplate;
    let txtItem;
    let edit;
    let remove;

    add.click(createItem);

    text.keyup(function (e) {
        if (e.key === "Enter") {
            createItem();
        }
    });

    function createItem() {
        if (text.val()) {
            itemTemplate = $("ul.to-do-template > li").clone();
            txtItem = itemTemplate.children("input.to-do-txt");
            edit = itemTemplate.children("button.edit");
            remove = itemTemplate.children("button.remove");

            txtItem.val(text.val());

            edit.click(function () {
                $(this).prev().prop("readonly", false);
                $(this).prev().focus();
                $(this).prev().focusout(function () {
                    if ($(this).val())
                        $(this).prop("readonly", "true");
                    else
                        $(this).parent().remove();
                });
                $(this).prev().keyup(function (e) {
                    if (e.key === "Enter") {
                        if ($(this).val())
                            $(this).prop("readonly", "true");
                        else
                            $(this).parent().remove();
                    }
                });
            });

            remove.click(function () {
                $(this).parent().remove();
            });

            $("ul.to-do").append(itemTemplate);
            text.val("");
        }
        text.focus();
    }
});