# Employee Directory

This is a dynamic employee directory web app built using FreeMarker, HTML, CSS, and JavaScript.

## Features
- Add, Edit, Delete employees
- Search, Filter, Sort, and Paginate
- Modal form design matches Ajackus UI
- Sticky footer and responsive layout

## Folder Structure
- `templates/index.ftl` → Freemarker template
- `app.js` → All JS logic
- `index.css` → Layout & styling
- `index.html` → Generated HTML (Open this!)
- `freemarker-cli-2.0.0-BETA-5.jar` → CLI tool (optional)
- `README.md` → Instructions

## How to Run Locally
1. Make sure Java is installed
2. Run:
```bash
./freemarker-cli-2.0.0-BETA-5/bin/freemarker-cli -t templates/index.ftl -o index.html
