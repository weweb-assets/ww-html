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
            type: 'Text',
            options: {
                expandable: true,
            },
            bindable: true,
            defaultValue: '',
        },
        refreshOnResize: {
            type: 'OnOff',
            label: {
                en: 'Refresh on resize',
            },
            defaultValue: true,
        },
    },
};
