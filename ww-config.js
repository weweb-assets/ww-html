const sourceTooltip = `A string that represents an html structure: \n\n
\`\`\`html
<div class='article'>
    <h1>This is a heading</h1>
    <p>This is a paragraph.</p>
</div>
\`\`\`
`;

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
            /* wwEditor:start */
            bindingValidation: {
                type: 'array',
                tooltip: sourceTooltip,
            },
            /* wwEditor:end */
        },
        changeSource: {
            type: 'Button',
            editorOnly: true,
            options: {
                text: { en: 'Edit HTML', fr: 'Editer le HTML' },
                action: 'editHTML',
            },
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
