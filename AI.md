---
name: ww-html
description: A component for displaying HTML content with script handling capabilities
keywords: [html, iframe, script, content, dynamic]
---

#### ww-html

***Purpose:***
A versatile component that allows embedding raw HTML content with support for script execution and dynamic updates. It handles both static HTML content and scripts, with proper lifecycle management and resize handling capabilities.

***Properties:***
- source: string - HTML content to be rendered
- refreshOnResize: boolean - Whether to refresh the content when window is resized (default: false)

***Events:***
- update:content - Emitted when content is updated. No payload

***Notes:***
- Includes special handling for script loading and execution
- Supports charset detection and async script loading
- Automatically cleans up old scripts when content changes
- Provides responsive behavior with optional resize refresh
- Has editor mode visualization support

***Example:***
{"uid":"element_1","tag":"ww-html","name":"HTML Content","props":{"default":{"source":"<div class='article'><h1>Hello World</h1><p>This is a paragraph.</p></div>","refreshOnResize":false}},"styles":{"default":{"width":"100%","minHeight":"300px"}}}
