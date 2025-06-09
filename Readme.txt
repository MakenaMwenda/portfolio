README - Portfolio Website

This project shows a list of portfolio projects and experience highlights on a web page.
Everything is displayed using simple HTML and JavaScript.

------------------------------
Where the content is stored
------------------------------

All the project and experience information is written in this file:

assets/js/content.js

It has two lists:
1. portfolioItems – for the projects (like SQL 123, Excel Work, etc.)
2. iconBoxes – for quick facts or experiences (like "51+ Projects", "3+ Years Research")

------------------------------
How the content shows up
------------------------------

The website loads the data from content.js and puts it into the webpage automatically using JavaScript.

This happens in this file:

assets/js/render.js

You don’t need to do anything here unless you want to change how it looks or is displayed.

------------------------------
What you need in the HTML file
------------------------------

In the main HTML file (index.html), make sure there are these two sections:

<section id="portfolio"></section>
<section id="icon-boxes"></section>

Also, at the bottom of the file, add this line to make everything work:

<script type="module" src="assets/js/render.js"></script>

------------------------------
How to update the content
------------------------------

To change or add new projects or experiences:

1. Open assets/js/content.js
2. Update the items inside the "portfolioItems" and "iconBoxes" lists
3. Save the file and refresh the webpage

You do not need to touch any other files.

------------------------------
Need help?
------------------------------

If you need help updating the content or adding new items, just ask!
