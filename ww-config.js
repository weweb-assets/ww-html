export default {
    options: {
        sizable: true,
    },
    editor: {
        label: {
            en: 'HTML',
            fr: 'HTML',
        },
        icon: 'fontawesome/regular/window-maximize',
    },
    properties: {
        source: {
            label: {
                en: 'HTML',
            },
            type: 'Textarea',
            options: {
                row: 20,
            },
            bindable: true,
            defaultValue: '',
        },
        changeSource: {
            type: 'Button',
            editorOnly: true,
            options: {
                text: { en: 'Edit HTML', fr: 'Editer le HTML' },
                action: 'editHTML',
            },
        },
    },
};
