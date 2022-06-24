<template>
    <div ref="html" class="ww-html" :class="{ isEditing: isEditing }">
        <div v-if="source" class="html-holder" v-html="source"></div>
        <!-- wwEditor:start -->
        <div v-else class="placeholder">Edit HTML in settings</div>
        <!-- wwEditor:end -->
    </div>
</template>

<script>
/* wwEditor:start */
import { openHTMLPopup } from './popups';
/* wwEditor:end */

const REGEX_SRC = /.*?src="(.*?)"/gim;
const REGEX_CHARSET = /.*?charset="(.*?)"/gim;
const REGEX_CONTENT = /<script.*>(.*)<\/script>/gim;

export default {
    props: {
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        content: { type: Object, required: true },
        uid: { type: String, required: true },
    },
    emits: ['update:content'],
    data() {
        return {
            reset: false,
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        source() {
            if (this.reset) return null;
            return this.content.source ? this.content.source : null;
        },
        scripts() {
            if (typeof this.content.source !== 'string') return [];
            const rawScripts = [...this.content.source.matchAll(/<script.*?>.*?<\/script>/gim)].map(item => item[0]);
            return rawScripts.map(script => {
                const srcResult = new RegExp(REGEX_SRC).exec(script);
                const charsetResult = new RegExp(REGEX_CHARSET).exec(script);
                const contentResult = new RegExp(REGEX_CONTENT).exec(script);
                return {
                    src: srcResult && srcResult[1],
                    charset: charsetResult && charsetResult[1],
                    async: script.includes(' async'),
                    content: contentResult && contentResult[1],
                    attributes: {
                        'ww-html-uid': this.uid,
                    },
                };
            });
        },
    },
    mounted() {
        this.init();
        /* wwFront:start */
        wwLib.getFrontWindow().addEventListener('resize', this.reinit);
        /* wwFront:end */
    },
    watch: {
        scripts() {
            this.init();
        },
        isEditing(value) {
            if (!value) this.init();
        },
    },
    methods: {
        async init() {
            try {
                await this.loadScripts();
                this.executeJavascript();
            } catch (error) {
                wwLib.wwLog.error(error, 'error');
            }
        },
        async editHTML() {
            const result = await openHTMLPopup({
                source: this.content.source,
            });
            this.$emit('update:content', { source: result.source });
        },
        async loadScripts() {
            if (window.__WW_IS_PRERENDER__) return;
            // Remove old scripts
            wwLib
                .getFrontDocument()
                .head.querySelectorAll(`script[ww-html-uid="${this.uid}"]`)
                .forEach(script => script.remove());
            return Promise.all(
                this.scripts
                    .filter(script => script.src)
                    .map(script =>
                        wwLib.wwUtils.addScriptToHead(
                            {
                                link: script.src,
                                async: script.async,
                                charset: script.charset,
                                attributes: script.attributes,
                            },
                            true
                        )
                    )
            );
        },
        executeJavascript() {
            if (window.__WW_IS_PRERENDER__) return;
            this.scripts.filter(script => script.content).forEach(script => eval(script.content));
        },
        /* wwFront:start */
        reinit() {
            this.reset = true;
            this.$nextTick(() => {
                this.reset = false;
                this.init();
            });
        },
        /* wwFront:end */
    },
    beforeUnmounted() {
        /* wwFront:start */
        wwLib.getFrontWindow().removeEventListener('resize', this.reinit);
        /* wwFront:end */
    },
};
</script>

<style lang="scss" scoped>
.ww-html {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 10px;
    .html-holder {
        height: 100%;
    }
    /* wwEditor:start */
    &.isEditing {
        pointer-events: none;
    }
    .placeholder {
        width: 100%;
        height: 100%;
        min-height: 300px;
        background-color: #e4e4e4;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--ww-color-blue-500);
    }
    /* wwEditor:end */
    iframe {
        position: relative;
        width: 100% !important;
        height: 100% !important;
    }
}
</style>

<style lang="scss">
.ww-html {
    iframe {
        width: 100%;
        height: 100%;
        border: 0;
    }
}
</style>
