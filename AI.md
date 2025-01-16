---
name: ww-html
description: A component for displaying HTML content with script handling capabilities
keywords: html, iframe, script, content, dynamic
---

#### ww-html

A versatile component that allows embedding raw HTML content with support for script execution and dynamic updates. It handles both static HTML content and scripts, with proper lifecycle management and resize handling capabilities.

Properties:
- source: string - HTML content to be rendered
- refreshOnResize: boolean - Whether to refresh the content when window is resized

Events:
- update:content - Emitted when content is updated

Example:
```json
{
  "tag": "ww-html",
  "props": {
    "default": {
      "source": "<div class='article'><h1>Hello World</h1><p>This is a paragraph.</p></div>",
      "refreshOnResize": false
    }
  },
  "styles": {
    "default": {
      "width": "100%",
      "minHeight": "300px"
    }
  }
}
```

The component includes special handling for:
- Script loading and execution
- Charset detection
- Async script support
- Cleanup of old scripts
- Responsive behavior
- Editor mode visualization
