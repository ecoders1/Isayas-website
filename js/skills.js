/* ============================================
   skills.js – Skill card → lecture notes modal
   ============================================ */

const SKILLS = {
  HTML: {
    icon: '<i class="fab fa-html5"></i>',
    level: '95% – Expert',
    desc: 'HTML is the backbone of every web page. It defines structure and meaning using elements and attributes.',
    topics: ['Semantic Elements','Forms & Validation','Accessibility','SEO Meta Tags','Canvas & SVG','HTML5 APIs','Media Elements','Data Attributes'],
    notes: [
      { title: 'What is HTML?', body: 'HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using a series of elements. HTML elements tell the browser how to display content. A basic HTML document contains: <!DOCTYPE html>, <html>, <head>, and <body> tags. The DOCTYPE declaration defines the document type and version of HTML.' },
      { title: 'HTML Document Structure', body: 'Every HTML page has: (1) DOCTYPE declaration at top. (2) <html lang="en"> root element. (3) <head> — metadata, title, links to CSS. (4) <body> — visible page content. The <head> contains <meta charset="UTF-8">, <meta name="viewport">, <title>, and links to stylesheets. Always include the charset meta tag first.' },
      { title: 'Semantic HTML5 Elements', body: 'Semantic elements clearly describe their meaning: <header> — introductory content or nav links. <nav> — navigation links. <main> — dominant content of the page. <section> — thematic grouping. <article> — self-contained content. <aside> — sidebar content. <footer> — footer information. Using semantic HTML improves accessibility, SEO, and code readability.' },
      { title: 'Headings & Paragraphs', body: 'HTML has six heading levels: <h1> through <h6>. Use only ONE <h1> per page (main title). <h2>–<h6> create hierarchy. <p> creates paragraphs — the browser ignores extra whitespace. Use <br> for line breaks. Use <hr> for thematic breaks. Never skip heading levels for visual style — use CSS instead.' },
      { title: 'Links & Images', body: '<a href="url">text</a> creates hyperlinks. href can be absolute (https://...) or relative (./page.html). target="_blank" opens in new tab — always add rel="noopener noreferrer" for security. <img src="path" alt="description" width="300" height="200"> — the alt attribute is required for accessibility. Use width/height to prevent layout shift.' },
      { title: 'Lists', body: '<ul> — unordered list (bullets). <ol> — ordered list (numbers). <li> — list item (used inside both). <dl> — description list. <dt> — term. <dd> — definition. Lists can be nested. Use CSS to remove default bullets/numbers with list-style: none. Lists are semantic — use them for navigation menus, not just for visual bullets.' },
      { title: 'Forms & Inputs', body: '<form action="/submit" method="POST"> wraps form elements. Input types: text, email, password, number, checkbox, radio, file, date, range, submit. Always pair <label for="id"> with <input id="id"> for accessibility. required, minlength, maxlength, pattern attributes add validation. <fieldset> and <legend> group related inputs.' },
      { title: 'Tables', body: '<table> — creates a table. <thead>, <tbody>, <tfoot> — table sections. <tr> — table row. <th scope="col"> — header cell. <td> — data cell. colspan and rowspan merge cells. Always use <th> for headers and scope attribute. Tables are for tabular data only — never use tables for layout.' },
      { title: 'Media Elements', body: '<video src="video.mp4" controls autoplay muted loop> adds video. <audio src="audio.mp3" controls> adds audio. <source> inside video/audio provides multiple formats. <figure> and <figcaption> wrap images with captions. <picture> with <source media="..."> provides responsive images. Use loading="lazy" on images below the fold.' },
      { title: 'Accessibility (ARIA)', body: 'ARIA (Accessible Rich Internet Applications) adds semantic meaning. role="button", role="navigation", role="dialog". aria-label provides text for screen readers. aria-hidden="true" hides decorative elements. aria-live="polite" announces dynamic content. aria-expanded, aria-selected for interactive widgets. Always test with a screen reader.' },
      { title: 'HTML5 APIs', body: 'localStorage.setItem("key","val") stores data. sessionStorage clears on tab close. Geolocation API: navigator.geolocation.getCurrentPosition(). Canvas API for 2D drawing. Drag and Drop API with draggable="true". Web Workers run JS in background threads. IntersectionObserver detects element visibility. History API for SPA routing.' },
      { title: 'SEO Meta Tags', body: '<meta name="description" content="..."> — page description for search. <meta name="keywords"> — less important now. Open Graph: <meta property="og:title">, og:description, og:image for social sharing. Twitter Cards: <meta name="twitter:card">. Canonical: <link rel="canonical" href="..."> prevents duplicate content. <meta name="robots" content="noindex"> hides from crawlers.' },
      { title: 'Data Attributes', body: 'data-* attributes store custom data. <div data-user-id="42" data-role="admin">. Access via JS: element.dataset.userId (camelCase). Can store strings, numbers, JSON strings. Useful for connecting HTML to JavaScript behavior without classes. Example: data-action="delete", data-id="5" for event delegation.' },
      { title: 'HTML Entities & Special Characters', body: '&amp; → & | &lt; → < | &gt; → > | &quot; → " | &apos; → \' | &nbsp; → non-breaking space | &copy; → © | &reg; → ® | &trade; → ™ | &#128; → Unicode characters by decimal. Always encode special characters in content to prevent rendering issues and XSS vulnerabilities.' },
      { title: 'Iframes & Embeds', body: '<iframe src="url" title="description" width="600" height="400"> embeds external pages. Always set title for accessibility. sandbox attribute restricts capabilities: sandbox="allow-scripts allow-same-origin". Use allow-popups, allow-forms as needed. <embed> and <object> are older alternatives. YouTube embeds use iframe with YouTube URL.' },
      { title: 'HTML Validation & Best Practices', body: 'Always validate HTML at validator.w3.org. Common errors: unclosed tags, missing alt attributes, duplicate IDs, invalid nesting (<p> inside <p>). Best practices: (1) Use lowercase tags. (2) Quote all attribute values. (3) Close all tags. (4) One H1 per page. (5) Meaningful alt text. (6) Lang attribute on html tag. (7) Charset in head first.' },
      { title: 'Progressive Enhancement', body: 'Build in layers: (1) Semantic HTML first — works everywhere. (2) CSS for presentation. (3) JavaScript for enhancement. Content must be accessible without JS. Use <noscript> for fallback content. Feature detection over browser detection. Graceful degradation: new features degrade nicely on old browsers. Supports accessibility and SEO.' },
      { title: 'HTML Performance', body: 'Load CSS in <head>, JS before </body>. Use defer or async on script tags. defer — runs after HTML parsed, in order. async — runs as soon as loaded, out of order. Preload critical assets: <link rel="preload" href="font.woff2" as="font">. Prefetch future pages: <link rel="prefetch" href="next.html">. Minimize DOM size for faster rendering.' },
      { title: 'HTML Security', body: 'Never inject user content directly into HTML — sanitize first. Use Content-Security-Policy header. target="_blank" needs rel="noopener noreferrer" to prevent tab-napping. Avoid inline event handlers (onclick="...") — use addEventListener. Use HTTPS. Set X-Content-Type-Options: nosniff header. Validate file uploads server-side.' },
      { title: 'HTML Cheat Sheet', body: 'Structure: html, head, body, main, header, footer, nav, section, article, aside. Text: h1-h6, p, span, strong, em, small, mark, del, ins, sub, sup. Links: a[href, target, rel]. Media: img[src,alt], video, audio, source. Forms: form, input, label, select, option, textarea, button. Tables: table, thead, tbody, tr, th, td. Meta: meta, link, title, script, style.' },
    ],
  },
  CSS: {
    icon: '<i class="fab fa-css3-alt"></i>',
    level: '90% – Expert',
    desc: 'CSS controls the visual presentation of web pages — layout, colors, typography, and animations.',
    topics: ['Flexbox','CSS Grid','Animations','Custom Properties','Media Queries','Pseudo-elements','BEM','Architecture'],
    notes: [
      { title: 'What is CSS?', body: 'CSS (Cascading Style Sheets) describes how HTML elements should be displayed. Three ways to apply CSS: (1) Inline: style="color:red" — highest specificity, hardest to maintain. (2) Internal: <style> in <head>. (3) External: <link rel="stylesheet" href="style.css"> — best practice. The "cascade" means later rules override earlier ones when specificity is equal.' },
      { title: 'Selectors & Specificity', body: 'Selector types by specificity (low→high): Tag (p, div) = 0,0,1. Class (.btn) = 0,1,0. ID (#header) = 1,0,0. Inline style = 1,0,0,0. !important overrides all. Combinators: descendant (space), child (>), adjacent sibling (+), general sibling (~). Attribute selectors: [type="email"], [class^="btn"]. :is(), :where(), :not() pseudo-classes.' },
      { title: 'Box Model', body: 'Every element is a rectangular box with: content → padding → border → margin. box-sizing: border-box makes width include padding and border (recommended always). box-sizing: content-box is default — width is content only. Margin collapsing: adjacent vertical margins collapse to the larger value. Use outline (not border) for focus styles — it does not affect layout.' },
      { title: 'Flexbox', body: 'display: flex on parent. Main axis (default horizontal), cross axis (vertical). justify-content: flex-start|center|flex-end|space-between|space-around|space-evenly. align-items: stretch|center|flex-start|flex-end|baseline. flex-wrap: wrap allows items to wrap. gap: 1rem adds spacing. On children: flex: 1 (grow/shrink/basis). order changes visual order. align-self overrides align-items for one item.' },
      { title: 'CSS Grid', body: 'display: grid on parent. grid-template-columns: repeat(3, 1fr) — 3 equal columns. grid-template-rows: auto. gap: 1rem. auto-fill vs auto-fit with minmax(): grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)). Grid placement: grid-column: 1 / 3, grid-row: 2 / 4. Named areas: grid-template-areas. Grid is 2D (rows AND columns), Flexbox is 1D.' },
      { title: 'CSS Custom Properties', body: ':root { --primary: #2563EB; --spacing: 1rem; } Use with var(--primary). Can be changed with JS: element.style.setProperty("--color", "red"). Scoped to selector — children inherit. Fallback: var(--missing, blue). Great for themes: [data-theme="dark"] { --bg: #0f172a; }. Cannot be used in media query values but can in calc(): width: calc(var(--size) * 2).' },
      { title: 'Responsive Design & Media Queries', body: '@media (max-width: 768px) { ... } — styles for screens ≤768px. Mobile-first: write base styles for mobile, then @media (min-width: 768px) for larger. Breakpoints: 480px (mobile), 768px (tablet), 1024px (laptop), 1280px (desktop). Use relative units: rem, em, %, vw, vh instead of px. clamp(min, preferred, max) for fluid typography.' },
      { title: 'Transitions & Animations', body: 'transition: property duration easing delay. Example: transition: all 0.3s ease. Use transform for performance: translateX(), scale(), rotate() — triggers GPU. @keyframes: @keyframes fadeIn { from { opacity:0 } to { opacity:1 } } animation: fadeIn 0.5s ease forwards. animation-iteration-count: infinite. will-change: transform hints browser to optimize. Avoid animating layout-triggering properties (width, height, margin).' },
      { title: 'Pseudo-classes & Pseudo-elements', body: 'Pseudo-classes: :hover, :focus, :active, :visited, :first-child, :last-child, :nth-child(2n), :not(.class), :checked, :disabled, :focus-visible. Pseudo-elements: ::before, ::after (need content: ""), ::placeholder, ::selection, ::first-line, ::first-letter. Use :focus-visible instead of :focus to only show focus ring for keyboard users.' },
      { title: 'Positioning', body: 'position: static (default — in normal flow). relative — offset from normal position, creates stacking context. absolute — removed from flow, positioned to nearest relative/absolute ancestor. fixed — relative to viewport, stays on scroll. sticky — relative until threshold, then fixed. z-index only works on positioned elements. top, right, bottom, left set offsets.' },
      { title: 'CSS Units', body: 'Absolute: px (pixels), pt, cm. Relative: em (relative to parent font-size), rem (relative to root font-size, most predictable), % (relative to parent), vw/vh (viewport width/height), vmin/vmax, ch (width of "0" character). For font-size: rem. For spacing: rem or em. For layout: %, fr (grid), vw/vh. For borders: px. Avoid px for font-size — respects user preferences.' },
      { title: 'Glassmorphism & Modern Effects', body: 'Glassmorphism: background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.2); Gradients: background: linear-gradient(135deg, #2563EB, #06B6D4). Neumorphism: box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff. Text gradient: background: linear-gradient(...); -webkit-background-clip: text; -webkit-text-fill-color: transparent.' },
      { title: 'CSS Architecture & BEM', body: 'BEM (Block Element Modifier): .card (block), .card__title (element), .card--featured (modifier). Keeps specificity low and predictable. Utility-first CSS (Tailwind approach): small single-purpose classes. SMACSS: Base, Layout, Module, State, Theme layers. OOCSS: separate structure from skin. Always avoid deep nesting (max 3 levels). Separate concerns between JS and CSS.' },
      { title: 'CSS Variables for Theming', body: ':root { --bg: #fff; --text: #0f172a; } [data-theme="dark"] { --bg: #0f172a; --text: #f1f5f9; } body { background: var(--bg); color: var(--text); } Toggle in JS: document.documentElement.setAttribute("data-theme","dark"). This pattern avoids duplicating all CSS for dark mode. Use transition: background 0.3s, color 0.3s on body for smooth switching.' },
      { title: 'Flexbox Patterns', body: 'Center anything: display:flex; justify-content:center; align-items:center. Sticky footer: body{display:flex;flex-direction:column;min-height:100vh} main{flex:1}. Card grid: display:flex; flex-wrap:wrap; gap:1rem. Equal columns: flex: 1. Push item to end: margin-left:auto on last item. Nav with logo left, links right: justify-content:space-between. Holy Grail layout with flex or grid.' },
      { title: 'Grid Patterns', body: 'Responsive card grid: grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)). Full-bleed layout: grid-template-columns: 1fr min(65ch, 100%) 1fr — content in middle column. Dashboard layout: grid-template-columns: 240px 1fr; grid-template-rows: 60px 1fr. Place item anywhere: grid-column: 1/-1 for full width. Named lines: [sidebar-start] 240px [sidebar-end main-start] 1fr [main-end].' },
      { title: 'CSS Performance', body: 'Avoid @import (blocks rendering) — use <link> instead. Minimize reflows: batch DOM changes, use transform not top/left for animation. contain: layout style paint isolates element from rest of page. content-visibility: auto skips rendering off-screen content. Critical CSS: inline above-fold styles, load rest async. Remove unused CSS. Use will-change sparingly — only for animated elements.' },
      { title: 'CSS Reset & Normalization', body: '* { box-sizing: border-box; margin: 0; padding: 0 } — common reset. Normalize.css makes browsers render consistently. Modern reset: *, *::before, *::after { box-sizing: border-box } body { line-height: 1.5; -webkit-font-smoothing: antialiased } img, video { max-width: 100%; display: block } p, h1-h6 { overflow-wrap: break-word }. Resets should come before your own styles.' },
      { title: 'Accessibility in CSS', body: 'Never use outline: none without a replacement focus style. Use :focus-visible for keyboard-only focus rings. Ensure color contrast ratio ≥ 4.5:1 for normal text (WCAG AA). Don\'t convey information through color alone. Use em/rem for font sizes — respects browser zoom. prefers-reduced-motion: @media (prefers-reduced-motion: reduce) { * { animation: none !important } }. Screen readers ignore ::before/::after content.' },
      { title: 'CSS Cheat Sheet', body: 'Layout: display(flex,grid,block,inline), position(static,relative,absolute,fixed,sticky), float. Flexbox: justify-content, align-items, flex-wrap, gap, flex, order. Grid: grid-template-columns/rows, grid-column/row, gap, place-items. Box: margin, padding, border, width, height, box-sizing, overflow. Text: font-size/weight/family, line-height, text-align/decoration/transform, letter-spacing. Visual: background, color, opacity, box-shadow, border-radius, transform, transition, animation.' },
    ],
  },
  JavaScript: {
    icon: '<i class="fab fa-js-square"></i>',
    level: '85% – Advanced',
    desc: 'JavaScript is the programming language of the web — interactivity, data, APIs, and modern frameworks.',
    topics: ['ES6+','DOM','Async/Await','Fetch API','Modules','Event Loop','LocalStorage','Error Handling'],
    notes: [
      { title: 'JavaScript Basics', body: 'JS is dynamically typed, interpreted, single-threaded. Variables: var (function-scoped, hoisted), let (block-scoped), const (block-scoped, cannot reassign). Data types: string, number, boolean, null, undefined, symbol, bigint, object. typeof checks type. Strict mode: "use strict" catches common mistakes. JS runs in browser (V8, SpiderMonkey) and server (Node.js).' },
      { title: 'ES6+ Features', body: 'Arrow functions: const add = (a,b) => a+b. Template literals: `Hello ${name}`. Destructuring: const {a,b} = obj; const [x,y] = arr. Spread: [...arr1, ...arr2]; {...obj1, key:"new"}. Rest: function(...args). Default params: function(x=10). Optional chaining: obj?.prop?.nested. Nullish coalescing: val ?? "default". Logical assignment: x ??= 5, x ||= 5, x &&= 5.' },
      { title: 'Functions & Scope', body: 'Function declaration: function foo(){} — hoisted. Function expression: const foo = function(){}. Arrow function: const foo = () => {}. Scope: global, function, block. Closure: inner function remembers outer variables. IIFE: (function(){})() immediately invoked. Hoisting: declarations moved to top. var is hoisted initialized as undefined. let/const are hoisted but in temporal dead zone.' },
      { title: 'Arrays & Methods', body: 'Creation: [], Array.from(), Array.of(). Iteration: forEach, map (returns new array), filter (returns filtered array), reduce (accumulates), find, findIndex, some, every. Mutation: push/pop (end), shift/unshift (start), splice(index,count,...items), sort, reverse. Immutable: slice, concat, flat, flatMap. Spread to copy: [...arr]. Array.isArray() to check type.' },
      { title: 'Objects & Prototypes', body: 'Object literal: { key: value, method() {} }. Access: obj.key or obj["key"]. Object.keys(), Object.values(), Object.entries() return arrays. Object.assign({}, obj) or {...obj} shallow copy. Object.freeze() prevents mutation. Prototypal inheritance: every object has __proto__ pointing to prototype. class syntax is syntactic sugar over prototypes. hasOwnProperty() checks own vs inherited.' },
      { title: 'DOM Manipulation', body: 'Select: getElementById, querySelector (first match), querySelectorAll (NodeList). Create: document.createElement("div"). Add: parent.appendChild(el) or parent.append(el, text). Remove: el.remove(). Modify: el.textContent = "text", el.innerHTML = "<b>bold</b>" (XSS risk!), el.setAttribute("class","btn"). Classes: el.classList.add/remove/toggle/contains. Style: el.style.color = "red".' },
      { title: 'Events', body: 'el.addEventListener("click", handler). Event object: e.target (element clicked), e.currentTarget (element with listener), e.preventDefault() (stop default), e.stopPropagation() (stop bubbling). Event phases: capture → target → bubble. Delegation: add one listener to parent, use e.target to detect child clicks — efficient for dynamic elements. removeEventListener requires same function reference.' },
      { title: 'Promises & Async/Await', body: 'Promise: new Promise((resolve, reject) => {}). States: pending, fulfilled, rejected. .then(val => {}).catch(err => {}).finally(() => {}). Promise.all([p1,p2]) — all must resolve. Promise.allSettled — waits for all. Promise.race — first to settle wins. Async/await: async function foo() { const data = await fetch(url); } — syntactic sugar over promises. try/catch handles errors.' },
      { title: 'Fetch API & HTTP', body: 'fetch(url) returns a Promise. Response must be parsed: .json(), .text(), .blob(). GET: fetch(url). POST: fetch(url, {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(data)}). Check response.ok before parsing. HTTP status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error. Always handle network errors in catch.' },
      { title: 'ES Modules', body: 'export const foo = 1; export default function bar(){}. import {foo} from "./module.js"; import bar from "./module.js"; import * as all from "./module.js". Dynamic import: const mod = await import("./module.js"). <script type="module"> in HTML — deferred by default, has its own scope. Module specifiers must include file extension. Cannot use in file:// protocol.' },
      { title: 'The Event Loop', body: 'JS is single-threaded. Call Stack executes synchronous code. Web APIs handle async (setTimeout, fetch, DOM events). Callback Queue (macrotask): setTimeout, setInterval, DOM events. Microtask Queue (higher priority): Promise.then, queueMicrotask. Event loop: when stack is empty, process all microtasks first, then one macrotask, then render. This is why Promise callbacks run before setTimeout callbacks.' },
      { title: 'Error Handling', body: 'try { } catch (err) { } finally { }. Error types: Error, TypeError, ReferenceError, SyntaxError, RangeError. Custom: throw new Error("message"). err.message, err.name, err.stack. Async errors: try/catch with await OR .catch() on Promise. Global handler: window.addEventListener("error", handler). Unhandled rejections: window.addEventListener("unhandledrejection", handler). Always handle errors gracefully.' },
      { title: 'LocalStorage & Storage APIs', body: 'localStorage.setItem("key","value") — persists until cleared. localStorage.getItem("key") — returns string or null. localStorage.removeItem("key"), localStorage.clear(). Store objects: JSON.stringify() to save, JSON.parse() to read. sessionStorage — same API, clears on tab close. Storage limit: ~5-10MB. Never store passwords or tokens in localStorage — use httpOnly cookies. IndexedDB for larger structured data.' },
      { title: 'JSON', body: 'JSON (JavaScript Object Notation) — text format for data exchange. JSON.stringify(obj) — convert to string. JSON.parse(str) — convert to object. JSON rules: keys must be double-quoted strings, no trailing commas, no comments, no undefined, no functions. Valid types: string, number, boolean, null, array, object. JSON.stringify(obj, null, 2) — pretty prints with 2-space indent. Used in fetch API, localStorage, config files.' },
      { title: 'Closures & Higher-Order Functions', body: 'Closure: a function that remembers variables from its outer scope even after the outer function returns. Use cases: data privacy, factory functions, memoization, event handlers. Higher-order functions (HOF): take or return functions. map, filter, reduce are HOFs. Currying: f(a)(b) = f(a,b). Partial application: bind(null, arg1). Memoization: cache expensive function results using closure + Map.' },
      { title: 'Classes & OOP', body: 'class Animal { constructor(name){this.name=name} speak(){} }. class Dog extends Animal { speak(){ super.speak(); } }. new Dog("Rex"). static methods belong to class. Private fields: #name (ES2022). Getters/setters: get fullName(){} set fullName(val){}. instanceof checks prototype chain. OOP principles: Encapsulation (hide internal state), Inheritance, Polymorphism, Abstraction.' },
      { title: 'Iterators & Generators', body: 'Iterable: object with [Symbol.iterator]() method. for...of loops use iterators. for...of vs for...in: for...of iterates values, for...in iterates keys. Generators: function* gen(){ yield 1; yield 2; }. Calling gen() returns iterator, not result. next() advances to next yield. Useful for lazy sequences, infinite data streams, async flow control with yield await.' },
      { title: 'Regular Expressions', body: 'RegExp literal: /pattern/flags. Flags: g (global), i (case-insensitive), m (multiline). Methods: str.match(/regex/), str.replace(/regex/,"new"), str.test() — no wait, regex.test(str). str.split(/,\\s*/). Patterns: \\d digit, \\w word char, \\s whitespace, . any char, ^ start, $ end, * zero+, + one+, ? zero or one, {2,4} range, [abc] character class, (group). Named groups: (?<name>\\d+).' },
      { title: 'Web APIs', body: 'IntersectionObserver: detect visibility, lazy loading, scroll animations. MutationObserver: watch DOM changes. ResizeObserver: watch element size changes. navigator.clipboard.writeText("text") — copy to clipboard. navigator.geolocation.getCurrentPosition(). Notification API: Notification.requestPermission(). Web Workers: new Worker("worker.js") — run JS off main thread. Service Workers — PWA offline support, caching.' },
      { title: 'JavaScript Cheat Sheet', body: 'Variables: let, const, var. Types: typeof, instanceof. Functions: arrow, default params, rest, spread. Arrays: map, filter, reduce, forEach, find, some, every, flat, includes. Objects: destructuring, spread, Object.keys/values/entries, optional chaining (?.), nullish (??). Async: Promise, async/await, fetch. DOM: querySelector, addEventListener, classList, innerHTML, createElement. ES6+: template literals, modules, classes, generators, Symbol, Proxy.' },
    ],
  },
  PHP: {
    icon: '<i class="fab fa-php"></i>',
    level: '80% – Advanced',
    desc: 'PHP is a server-side scripting language that powers dynamic websites, databases, and REST APIs.',
    topics: ['OOP','PDO','REST APIs','Sessions','File Handling','Composer','MVC','Security'],
    notes: [
      { title: 'PHP Basics', body: '<?php starts PHP code. Variables: $name = "Isayas"; (always start with $). echo or print outputs text. Data types: string, integer, float, boolean, array, object, null. String functions: strlen(), strtolower(), strtoupper(), str_replace(), substr(), trim(), explode(), implode(). Number: abs(), ceil(), floor(), round(), rand(). PHP is loosely typed — use === for strict comparison.' },
      { title: 'Control Structures', body: 'if/elseif/else, switch/case, match (PHP 8). Loops: while, do-while, for, foreach ($arr as $key => $val). break exits loop, continue skips to next iteration. Ternary: $x > 0 ? "pos" : "neg". Null coalescing: $val = $_GET["key"] ?? "default". PHP 8 match: stricter than switch, no type coercion, no fallthrough, must be exhaustive.' },
      { title: 'Arrays', body: 'Indexed: $arr = [1,2,3]; $arr[] = 4 (append). Associative: $user = ["name"=>"Isayas","age"=>25]. Multidimensional: $matrix[0][1]. Functions: array_push, array_pop, array_shift, array_unshift, array_merge, array_slice, array_splice, in_array, array_key_exists, array_keys, array_values, array_map, array_filter, array_reduce, sort, asort, ksort, usort. count() for length.' },
      { title: 'Functions', body: 'function add($a, $b=0): int { return $a + $b; } Typed parameters (PHP 7+): string, int, float, bool, array, callable, ?string (nullable). Return types: : string, : void, : int. Variadic: function sum(...$nums). Anonymous: $fn = function($x) { return $x*2; }. Arrow functions (PHP 7.4): $fn = fn($x) => $x*2. call_user_func_array, array_map with callable.' },
      { title: 'Object-Oriented PHP', body: 'class User { public string $name; private int $age; public function __construct(string $name){ $this->name=$name; } public function greet():string{ return "Hi ".$this->name; } }. $user = new User("Isayas"). Inheritance: class Admin extends User { }. parent::method(). Interfaces: interface Loggable { public function log():void; }. Abstract classes. Traits for code reuse. final prevents inheritance.' },
      { title: 'PDO Database', body: '$pdo = new PDO("mysql:host=localhost;dbname=mydb;charset=utf8", $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]). Prepared statements prevent SQL injection: $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?"); $stmt->execute([$email]); $users = $stmt->fetchAll(PDO::FETCH_ASSOC). Never concatenate user input into SQL. Use transactions: $pdo->beginTransaction(), commit(), rollback().' },
      { title: 'Building REST APIs', body: 'header("Content-Type: application/json"). $method = $_SERVER["REQUEST_METHOD"]. Read JSON body: $data = json_decode(file_get_contents("php://input"), true). Routing: switch on REQUEST_URI. Response: echo json_encode(["status"=>"ok","data"=>$result]). HTTP status: http_response_code(201). Authentication: Bearer token in Authorization header. CORS: header("Access-Control-Allow-Origin: *").' },
      { title: 'Sessions & Authentication', body: 'session_start() must be first. $_SESSION["user_id"] = $id. session_destroy() on logout. Never store passwords in plain text. password_hash($password, PASSWORD_DEFAULT) — bcrypt. password_verify($input, $hash). Use CSRF tokens for forms: generate random token, store in session, validate on POST. HttpOnly cookies: setcookie("token", $val, time()+3600, "/", "", true, true).' },
      { title: 'File Handling', body: 'file_get_contents($path), file_put_contents($path, $data). fopen($path,"r/w/a"), fread, fwrite, fclose. file_exists(), is_file(), is_dir(), mkdir(), unlink(). File upload: $_FILES["file"]["tmp_name"], move_uploaded_file($tmp, $dest). Validate: mime_content_type(), getimagesize() for images. Limit size: if($_FILES["file"]["size"] > 5000000). Never trust file extension — check MIME type.' },
      { title: 'Composer & Autoloading', body: 'Composer is PHP dependency manager. composer.json defines dependencies. composer require vendor/package. composer install creates vendor/ folder. PSR-4 autoloading: "autoload":{"psr-4":{"App\\\\":"src/"}}. require "vendor/autoload.php" to load all. composer update updates packages. composer dump-autoload rebuilds autoload files. Popular packages: guzzlehttp/guzzle, vlucas/phpdotenv, firebase/php-jwt.' },
      { title: 'PHP Security', body: 'SQL Injection: use prepared statements (PDO). XSS: htmlspecialchars($input, ENT_QUOTES) before outputting user content. CSRF: use tokens in forms. File inclusion: never include() user-supplied paths. eval() is dangerous — avoid. Validate all input: filter_var($email, FILTER_VALIDATE_EMAIL). HTTP headers: X-XSS-Protection, X-Frame-Options, Content-Security-Policy. Use HTTPS everywhere.' },
      { title: 'Error Handling', body: 'set_error_handler(function($errno,$errstr){}) custom handler. try/catch/finally for exceptions. throw new RuntimeException("error"). Custom exceptions: class DatabaseException extends Exception{}. Exception hierarchy: Exception → RuntimeException, InvalidArgumentException, etc. In production: error_reporting(0), log errors to file. In development: ini_set("display_errors",1). register_shutdown_function for fatal errors.' },
      { title: 'PHP 8 Features', body: 'Named arguments: array_slice(array: $arr, offset: 1). Constructor promotion: class User { public function __construct(public string $name, private int $age) {} }. Union types: function foo(int|string $val). Nullsafe operator: $user?->getAddress()?->city. Match expression. Fibers (PHP 8.1) for cooperative multitasking. Enums (PHP 8.1): enum Status { case Active; case Inactive; }. Readonly properties (PHP 8.1).' },
      { title: 'MVC Pattern in PHP', body: 'Model: database logic, data validation. View: HTML templates, presentation only. Controller: handles requests, calls Model, passes data to View. Router: maps URLs to controllers. Example: GET /users → UserController::index() → User::all() → users/index.php. Separation of concerns makes code testable and maintainable. Frameworks like Laravel implement MVC with additional layers (Services, Repositories).' },
      { title: 'PHP & MySQL Full Example', body: 'Connect: $pdo = new PDO("mysql:host=localhost;dbname=portfolio", "root", ""). Create: INSERT INTO messages (name, email, message) VALUES (?, ?, ?). Read: SELECT * FROM messages ORDER BY created_at DESC. Update: UPDATE messages SET is_read=1 WHERE id=?. Delete: DELETE FROM messages WHERE id=?. Always use prepare() and execute() with array of values. Never build queries with string concatenation.' },
      { title: 'Templating & Output', body: 'Separate PHP logic from HTML. Use require/include for partials. Short echo: <?= $var ?>. Output buffering: ob_start() captures output. htmlspecialchars() for safe output. nl2br() converts newlines to <br>. number_format(1234567.89, 2, ".", ",") → 1,234,567.89. date("Y-m-d H:i:s") formats dates. strtotime() converts date string to timestamp. Carbon library for advanced date handling.' },
      { title: 'PHP Configuration', body: 'php.ini key settings: upload_max_filesize, post_max_size, max_execution_time, memory_limit, display_errors, error_log. Check config: phpinfo() or php -i in CLI. .env files with vlucas/phpdotenv: $dotenv = Dotenv\\Dotenv::createImmutable(__DIR__); $dotenv->load(). Use $_ENV["DB_PASS"] not hardcoded credentials. Different configs for development vs production environments.' },
      { title: 'PHP Cheat Sheet', body: 'Variables: $var, $arr[], $obj->prop. Strings: echo, ., strlen, str_replace, substr, trim, explode, implode. Arrays: [], array_map, array_filter, array_merge, in_array, count, sort. OOP: class, extends, interface, trait, new, $this, parent::, static::. DB: PDO, prepare, execute, fetchAll. Web: $_GET, $_POST, $_FILES, $_SESSION, $_COOKIE, header(), json_encode. Security: htmlspecialchars, password_hash, prepared statements. PHP 8: match, named args, constructor promotion, nullsafe.' },
    ],
  },
};

/* ══════════════════════════════════════════
   MODAL LOGIC (no video — direct open)
   ══════════════════════════════════════════ */

const overlay    = document.getElementById('skillModal');
const modalIcon  = document.getElementById('skillModalIcon');
const modalTitle = document.getElementById('skillModalTitle');
const modalLevel = document.getElementById('skillModalLevel');
const modalBody  = document.getElementById('skillModalBody');
const closeBtn   = document.getElementById('skillModalClose');
const closeBtn2  = document.getElementById('skillModalClose2');
const tabBtns    = document.querySelectorAll('.smt');

let currentSkill = null;
let currentPage  = 0;

/* ─── Attach click to each skill card ─── */
document.querySelectorAll('.skill-card').forEach((card) => {
  const name = card.querySelector('.skill-card-name').textContent.trim();
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `View ${name} lecture notes`);
  card.style.cursor = 'pointer';

  const open = () => openModal(name);
  card.addEventListener('click', open);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
});

function openModal(skillName) {
  const skill = SKILLS[skillName];
  if (!skill) return;
  currentSkill = skill;
  currentPage  = 0;

  modalIcon.innerHTML    = skill.icon;
  modalTitle.textContent = skillName;
  modalLevel.textContent = skill.level;

  /* default to notes tab */
  tabBtns.forEach((b) => {
    b.classList.toggle('active', b.dataset.tab === 'notes');
    b.setAttribute('aria-selected', b.dataset.tab === 'notes');
  });
  setTab('notes');

  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function closeModal() {
  overlay.hidden = true;
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeModal);
closeBtn2.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !overlay.hidden) closeModal();
});

/* ─── Tabs ─── */
tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabBtns.forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected','true');
    currentPage = 0;
    setTab(btn.dataset.tab);
  });
});

function setTab(tab) {
  if (!currentSkill) return;

  if (tab === 'overview') {
    modalBody.innerHTML = `
      <p class="sm-overview-desc">${currentSkill.desc}</p>
      <div class="sm-topics">
        ${currentSkill.topics.map((t) => `<span class="sm-topic-tag">${t}</span>`).join('')}
      </div>
      <div class="sm-meta">
        <span class="sm-meta-item"><i class="fas fa-book-open"></i> ${currentSkill.notes.length} Lecture Notes</span>
        <span class="sm-meta-item"><i class="fas fa-tag"></i> ${currentSkill.topics.length} Topics</span>
      </div>`;
    return;
  }

  if (tab === 'notes') { renderNotes(); return; }

  if (tab === 'resources') {
    const res = currentSkill.resources || [];
    if (!res.length) { modalBody.innerHTML = '<p style="color:var(--text-muted);padding:1rem">No resources listed.</p>'; return; }
    modalBody.innerHTML = `
      <div class="sm-resources">
        ${res.map((r) => `
          <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="sm-resource">
            <span class="sm-resource-icon"><i class="${r.icon}"></i></span>
            <div><div class="sm-resource-title">${r.title}</div><div class="sm-resource-type">${r.type}</div></div>
            <i class="fas fa-external-link-alt"></i>
          </a>`).join('')}
      </div>`;
  }
}

/* ─── Notes pagination ─── */
function renderNotes() {
  const notes = currentSkill.notes || [];
  const total = notes.length;
  if (!total) { modalBody.innerHTML = '<p style="color:var(--text-muted);padding:1rem">No notes yet.</p>'; return; }

  const note = notes[currentPage];

  modalBody.innerHTML = `
    <div class="sm-note-page">
      <div class="sm-note-top">
        <span class="sm-note-counter">
          <i class="fas fa-file-alt"></i> Page ${currentPage + 1} of ${total}
        </span>
        <div class="sm-note-dots">
          ${notes.map((_,i) => `<span class="sm-dot ${i===currentPage?'active':''}" data-i="${i}"></span>`).join('')}
        </div>
      </div>

      <h4 class="sm-note-title">${note.title}</h4>
      <div class="sm-note-body">${note.body}</div>

      <div class="sm-note-nav">
        <button class="btn btn-outline btn-sm" id="notePrev" ${currentPage===0?'disabled':''}>
          <i class="fas fa-chevron-left"></i> Prev
        </button>
        <span class="sm-note-progress">${currentPage+1} / ${total}</span>
        <button class="btn btn-primary btn-sm" id="noteNext" ${currentPage===total-1?'disabled':''}>
          Next <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>`;

  /* dot navigation */
  modalBody.querySelectorAll('.sm-dot').forEach((dot) => {
    dot.addEventListener('click', () => { currentPage = parseInt(dot.dataset.i); renderNotes(); });
  });

  /* prev/next */
  const prev = document.getElementById('notePrev');
  const next = document.getElementById('noteNext');
  if (prev) prev.addEventListener('click', () => { currentPage--; renderNotes(); });
  if (next) next.addEventListener('click', () => { currentPage++; renderNotes(); });

  /* scroll body to top */
  modalBody.scrollTop = 0;
}
