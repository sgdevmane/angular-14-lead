// Extracted inline JavaScript from index.html

class InterviewGuideApp {
  constructor() {
    this.currentFile = null;
    this.cache = new Map();
    this.searchIndex = new Map();
    this.isDarkTheme = false;
    this.currentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary-color")
      .trim();

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupSearch();
    this.setupPWA();
    this.loadInitialContent();
  }

  setupEventListeners() {
    // Navigation items
    document.querySelectorAll(".nav-item[data-file]").forEach((item) => {
      item.addEventListener("click", (e) => {
        const file = e.target.closest(".nav-item").dataset.file;
        this.loadContent(file);

        // Close sidebar on mobile after selection
        if (window.innerWidth <= 768) {
          const sidebar = document.querySelector(".sidebar");
          const overlay = document.getElementById("sidebarOverlay");

          sidebar.classList.remove("active");
          overlay.classList.remove("active");
        }
      });
    });

    if (window.innerWidth <= 768) {
      const sidebar = document.getElementById("sidebar");
      document.getElementById("mobile-sidebar").appendChild(sidebar);
      document.getElementById("desktop-sidebar").style.display = "none";
      document.getElementById("mobile-sidebar").style.display = "block";
    } else {
      document.getElementById("desktop-sidebar").style.display = "block";
      document.getElementById("mobile-sidebar").style.display = "none";
    }

    // Control Center Toggle
    document
      .getElementById("controlCenterToggle")
      .addEventListener("click", () => this.toggleControlCenter());

    // Toolbar buttons
    document
      .getElementById("printBtn")
      .addEventListener("click", () => this.printContent());
    document
      .getElementById("pdfBtn")
      .addEventListener("click", () => this.exportToPDF());
    document
      .getElementById("themeBtn")
      .addEventListener("click", () => this.toggleTheme());
    document
      .getElementById("colorBtn")
      .addEventListener("click", () => this.openColorModal());

    // Mobile menu button
    document.getElementById("mobileMenuBtn").addEventListener("click", (e) => {
      const sidebar = document.querySelector(".sidebar");
      const overlay = document.getElementById("sidebarOverlay");
      console.log("mobileMenuBtn clicked");
      sidebar.classList.add("active");
      overlay.classList.add("active");
      // document
      //   .getElementById("mobileMenuBtn")
      //   .classList.add("hide-zindex");
    });

    // Sidebar overlay click to close
    document.getElementById("sidebarOverlay").addEventListener("click", (e) => {
      const sidebar = document.querySelector(".sidebar");
      const overlay = document.getElementById("sidebarOverlay");

      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      // document
      //   .getElementById("mobileMenuBtn")
      //   .classList.remove("hide-zindex");
    });

    // Close sidebar on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const sidebar = document.querySelector(".sidebar");
        const overlay = document.getElementById("sidebarOverlay");

        if (sidebar.classList.contains("active")) {
          sidebar.classList.remove("active");
          overlay.classList.remove("active");
          e.target.classList.remove("hide");
        }
      }
    });

    // Color modal
    document.getElementById("closeColorModal").addEventListener("click", () => {
      this.closeColorModal();
    });

    // Color options
    document.querySelectorAll(".color-option").forEach((option) => {
      option.addEventListener("click", () => {
        const color = option.getAttribute("data-color");
        this.changeThemeColor(color);

        // Update selected state
        document.querySelectorAll(".color-option").forEach((opt) => {
          opt.classList.remove("selected");
        });
        option.classList.add("selected");

        // Close modal
        this.closeColorModal();
      });
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "p":
            e.preventDefault();
            this.printContent();
            break;
          case "f":
            e.preventDefault();
            document.getElementById("searchInput").focus();
            break;
        }
      }

      // Close modal on escape
      if (e.key === "Escape") {
        this.closeColorModal();
      }
    });

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      const modal = document.getElementById("colorModal");
      if (e.target === modal) {
        this.closeColorModal();
      }
    });
  }

  setupSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchClear = document.getElementById("searchClear");
    let searchTimeout;

    // Handle search input
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300);

      // Toggle clear button visibility
      this.toggleClearButton(e.target.value);
    });

    // Handle clear button click
    searchClear.addEventListener("click", () => {
      searchInput.value = "";
      searchInput.focus();
      this.performSearch("");
      this.toggleClearButton("");
    });

    // Handle escape key to clear search
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        searchInput.value = "";
        this.performSearch("");
        this.toggleClearButton("");
        searchInput.blur();
      }
    });
  }

  toggleClearButton(value) {
    const searchClear = document.getElementById("searchClear");
    if (value.trim()) {
      searchClear.style.opacity = "1";
      searchClear.style.visibility = "visible";
    } else {
      searchClear.style.opacity = "0";
      searchClear.style.visibility = "hidden";
    }
  }

  setupPWA() {
    // Register service worker for PWA functionality
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .catch((error) => {
            console.log("Service Worker registration failed:", error);
          });
      });
    }
  }

  async loadContent(filePath) {
    try {
      console.log(`Loading content: ${filePath}`);
      this.showLoading();
      this.setActiveNavItem(filePath);

      let content;
      if (this.cache.has(filePath)) {
        console.log(`Using cached content for: ${filePath}`);
        // Add a small delay to show loading animation even for cached content
        await new Promise((resolve) => setTimeout(resolve, 100));
        content = this.cache.get(filePath);
      } else {
        console.log(`Fetching content from: ${filePath}`);
        const response = await fetch(filePath);
        console.log(`Fetch response status: ${response.status}`);
        if (!response.ok) {
          throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
        }
        content = await response.text();
        console.log(`Content loaded, length: ${content.length}`);
        this.cache.set(filePath, content);
      }

      this.renderMarkdown(content);
      this.currentFile = filePath;
      this.buildSearchIndex(content, filePath);
      console.log(`Content rendering completed for: ${filePath}`);
    } catch (error) {
      console.error(`Error loading content from ${filePath}:`, error);
      this.showError(`Error loading content: ${error.message}`);
    }
  }

  renderMarkdown(content) {
    console.log("Starting markdown rendering...");
    const contentArea = document.getElementById("contentArea");

    if (!contentArea) {
      console.error("Content area not found in DOM");
      this.showError("Content area not found");
      return;
    }

    console.log("Content area found, dimensions:", {
      width: contentArea.offsetWidth,
      height: contentArea.offsetHeight,
      display: getComputedStyle(contentArea).display,
      visibility: getComputedStyle(contentArea).visibility,
    });

    // Check if marked is available
    if (typeof marked === "undefined") {
      console.error("Marked library not loaded");
      this.showError("Markdown parser not available");
      return;
    }

    try {
      console.log("Configuring marked options...");
      // Configure marked options
      marked.setOptions({
        highlight: function (code, lang) {
          if (Prism.languages[lang]) {
            return Prism.highlight(code, Prism.languages[lang], lang);
          }
          return code;
        },
        breaks: true,
        gfm: true,
      });

      console.log("Parsing markdown content...");
      // Parse markdown
      const html = marked.parse(content);
      console.log("Markdown parsed, HTML length:", html.length);
      contentArea.innerHTML = `<div class="markdown-content">${html}</div>`;
      console.log("Content inserted into DOM");

      // Re-run Prism highlighting
      console.log("Running Prism highlighting...");
      Prism.highlightAll();

      // Add line numbers to code blocks
      document.querySelectorAll('pre[class*="language-"]').forEach((pre) => {
        pre.classList.add("line-numbers");
      });

      // Smooth scroll to top
      contentArea.scrollTop = 0;

      // Add copy buttons to code blocks
      this.addCopyButtons();

      // Generate table of contents
      this.generateTOC();
    } catch (error) {
      this.showError(`Error rendering content: ${error.message}`);
    }
  }

  addCopyButtons() {
    document.querySelectorAll('pre[class*="language-"]').forEach((pre) => {
      if (!pre.querySelector(".copy-button")) {
        const button = document.createElement("button");
        button.className = "copy-button";
        button.textContent = "Copy";
        button.style.cssText = `
                  position: absolute;
                  top: 10px;
                  right: 10px;
                  background: var(--primary-color);
                  color: white;
                  border: none;
                  padding: 5px 10px;
                  border-radius: 4px;
                  cursor: pointer;
                  font-size: 0.8rem;
                `;

        button.addEventListener("click", () => {
          const code = pre.querySelector("code").textContent;
          navigator.clipboard.writeText(code).then(() => {
            button.textContent = "Copied!";
            setTimeout(() => {
              button.textContent = "Copy";
            }, 2000);
          });
        });

        pre.style.position = "relative";
        pre.appendChild(button);
      }
    });
  }

  generateTOC() {
    const headings = document.querySelectorAll(
      ".markdown-content h2, .markdown-content h3"
    );
    if (headings.length === 0) return;

    const toc = document.createElement("div");
    toc.className = "toc";
    toc.innerHTML = "<h3>📑 Table of Contents</h3><ul></ul>";

    const ul = toc.querySelector("ul");

    headings.forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;

      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${id}`;
      a.textContent = heading.textContent;
      a.style.paddingLeft = heading.tagName === "H3" ? "20px" : "0";

      a.addEventListener("click", (e) => {
        e.preventDefault();
        heading.scrollIntoView({ behavior: "smooth" });
      });

      li.appendChild(a);
      ul.appendChild(li);
    });

    const firstHeading = document.querySelector(
      ".markdown-content h1, .markdown-content h2"
    );
    if (firstHeading) {
      firstHeading.parentNode.insertBefore(toc, firstHeading.nextSibling);
    }
  }

  buildSearchIndex(content, filePath) {
    const words = content.toLowerCase().match(/\b\w+\b/g) || [];
    words.forEach((word) => {
      if (!this.searchIndex.has(word)) {
        this.searchIndex.set(word, new Set());
      }
      this.searchIndex.get(word).add(filePath);
    });
  }

  performSearch(query) {
    if (!query.trim()) {
      this.clearSearchHighlight();
      this.resetNavItemsVisibility();
      return;
    }

    const searchTerms = query
      .toLowerCase()
      .split(/\s+/)
      .filter((term) => term.length > 1);
    if (searchTerms.length === 0) {
      this.clearSearchHighlight();
      this.resetNavItemsVisibility();
      return;
    }

    const navItems = document.querySelectorAll(".nav-item[data-file]");
    let hasVisibleResults = false;

    navItems.forEach((item) => {
      const file = item.dataset.file;
      const content = this.cache.get(file) || "";
      const itemText = item.textContent.toLowerCase();

      // Search in both cached content and navigation item text
      const contentMatches = searchTerms.every((term) =>
        content.toLowerCase().includes(term)
      );
      const titleMatches = searchTerms.every((term) => itemText.includes(term));

      const matches = contentMatches || titleMatches;

      if (matches) {
        item.style.display = "block";
        item.style.opacity = "1";
        hasVisibleResults = true;
      } else {
        item.style.display = "none";
        item.style.opacity = "0.5";
      }
    });

    // Show "no results" message if needed
    this.toggleNoResultsMessage(!hasVisibleResults, query);

    // Highlight search terms in current content
    this.highlightSearchTerms(searchTerms);
  }

  resetNavItemsVisibility() {
    const navItems = document.querySelectorAll(".nav-item[data-file]");
    navItems.forEach((item) => {
      item.style.display = "block";
      item.style.opacity = "1";
    });
    this.toggleNoResultsMessage(false);
  }

  toggleNoResultsMessage(show, query = "") {
    let noResultsEl = document.getElementById("searchNoResults");

    if (show && !noResultsEl) {
      noResultsEl = document.createElement("div");
      noResultsEl.id = "searchNoResults";
      noResultsEl.className = "search-no-results";
      noResultsEl.innerHTML = `
              <div class="no-results-content">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
                <h4>No results found</h4>
                <p>No topics match "${query}". Try different keywords.</p>
              </div>
            `;

      const sidebar = document.querySelector(".sidebar");
      const navSections = sidebar.querySelectorAll(".nav-section");
      if (navSections.length > 0) {
        navSections[navSections.length - 1].appendChild(noResultsEl);
      }
    } else if (!show && noResultsEl) {
      noResultsEl.remove();
    }
  }

  highlightSearchTerms(terms) {
    const contentArea = document.querySelector(".markdown-content");
    if (!contentArea) return;

    this.clearSearchHighlight();

    terms.forEach((term) => {
      if (term.length < 2) return;

      const regex = new RegExp(`(${term})`, "gi");
      this.highlightText(contentArea, regex);
    });
  }

  highlightText(element, regex) {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node);
    }

    textNodes.forEach((textNode) => {
      const parent = textNode.parentNode;
      if (parent.tagName === "SCRIPT" || parent.tagName === "STYLE") return;

      const text = textNode.textContent;
      if (regex.test(text)) {
        const highlightedHTML = text.replace(
          regex,
          '<mark class="search-highlight">$1</mark>'
        );
        const wrapper = document.createElement("span");
        wrapper.innerHTML = highlightedHTML;
        parent.replaceChild(wrapper, textNode);
      }
    });
  }

  clearSearchHighlight() {
    document.querySelectorAll(".search-highlight").forEach((mark) => {
      const parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    });
  }

  setActiveNavItem(filePath) {
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active");
    });

    const activeItem = document.querySelector(`[data-file="${filePath}"]`);
    if (activeItem) {
      activeItem.classList.add("active");
    }
  }

  showLoading() {
    const contentArea = document.getElementById("contentArea");
    contentArea.innerHTML = `
            <div class="loading">
              <div class="spinner"></div>
              <div class="loading-text">Loading content...</div>
            </div>
          `;
  }

  showError(message) {
    const contentArea = document.getElementById("contentArea");
    contentArea.innerHTML = `
            <div class="error">
              <h3>❌ Error</h3>
              <p>${message}</p>
              <p>Please check that the file exists and try again.</p>
            </div>
          `;
  }

  printContent() {
    window.print();
  }

  exportToPDF() {
    const { jsPDF } = window.jspdf;
    const contentArea = document.querySelector(".markdown-content");

    if (!contentArea) {
      alert("No content to export!");
      return;
    }

    // Show loading indicator
    const loadingEl = document.createElement("div");
    loadingEl.className = "loading";
    loadingEl.innerHTML = `
            <div class="spinner"></div>
            <div class="loading-text">Generating PDF...</div>
          `;
    document.body.appendChild(loadingEl);

    // Use setTimeout to allow the loading indicator to render
    setTimeout(() => {
      try {
        // Create PDF with proper A4 dimensions
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
          compress: true,
        });

        // A4 dimensions in mm
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 20;
        const contentWidth = pageWidth - margin * 2;
        const contentHeight = pageHeight - margin * 2;

        // Get current file name for the PDF title
        const fileName = this.currentFile
          ? this.currentFile.split("/").pop().replace(".md", "")
          : "interview-guide";

        // Add title
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text(
          fileName.replace(/-/g, " ").toUpperCase(),
          margin,
          margin + 10
        );

        // Add a line under title
        doc.setLineWidth(0.5);
        doc.line(margin, margin + 15, pageWidth - margin, margin + 15);

        let yPosition = margin + 25;

        // Extract and format content
        const elements = contentArea.children;

        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          const tagName = element.tagName.toLowerCase();
          let text = element.textContent.trim();

          if (!text) continue;

          // Check if we need a new page
          if (yPosition > pageHeight - margin - 20) {
            doc.addPage();
            yPosition = margin + 10;
          }

          // Handle different element types
          switch (tagName) {
            case "h1":
              doc.setFontSize(18);
              doc.setFont("helvetica", "bold");
              doc.text(text, margin, yPosition);
              yPosition += 12;
              break;

            case "h2":
              doc.setFontSize(16);
              doc.setFont("helvetica", "bold");
              doc.text(text, margin, yPosition);
              yPosition += 10;
              break;

            case "h3":
              doc.setFontSize(14);
              doc.setFont("helvetica", "bold");
              doc.text(text, margin, yPosition);
              yPosition += 8;
              break;

            case "p":
              doc.setFontSize(11);
              doc.setFont("helvetica", "normal");
              const lines = doc.splitTextToSize(text, contentWidth);

              for (let line of lines) {
                if (yPosition > pageHeight - margin - 10) {
                  doc.addPage();
                  yPosition = margin + 10;
                }
                doc.text(line, margin, yPosition);
                yPosition += 6;
              }
              yPosition += 3;
              break;

            case "pre":
              doc.setFontSize(9);
              doc.setFont("courier", "normal");
              doc.setFillColor(245, 245, 245);

              const codeLines = text.split("\n");
              const codeHeight = codeLines.length * 4 + 6;

              if (yPosition + codeHeight > pageHeight - margin) {
                doc.addPage();
                yPosition = margin + 10;
              }

              // Draw code background
              doc.rect(margin, yPosition - 3, contentWidth, codeHeight, "F");

              for (let codeLine of codeLines) {
                doc.text(codeLine, margin + 2, yPosition);
                yPosition += 4;
              }
              yPosition += 6;
              break;

            case "ul":
            case "ol":
              doc.setFontSize(11);
              doc.setFont("helvetica", "normal");
              const listItems = element.querySelectorAll("li");

              listItems.forEach((li, index) => {
                if (yPosition > pageHeight - margin - 10) {
                  doc.addPage();
                  yPosition = margin + 10;
                }

                const bullet = tagName === "ul" ? "• " : `${index + 1}. `;
                const itemText = bullet + li.textContent.trim();
                const itemLines = doc.splitTextToSize(
                  itemText,
                  contentWidth - 5
                );

                for (let line of itemLines) {
                  doc.text(line, margin + 5, yPosition);
                  yPosition += 6;
                }
              });
              yPosition += 3;
              break;

            case "blockquote":
              doc.setFontSize(11);
              doc.setFont("helvetica", "italic");
              doc.setDrawColor(200, 200, 200);
              doc.setLineWidth(2);

              const quoteLines = doc.splitTextToSize(text, contentWidth - 10);
              const quoteHeight = quoteLines.length * 6;

              if (yPosition + quoteHeight > pageHeight - margin) {
                doc.addPage();
                yPosition = margin + 10;
              }

              // Draw left border for blockquote
              doc.line(margin, yPosition - 2, margin, yPosition + quoteHeight);

              for (let line of quoteLines) {
                doc.text(line, margin + 8, yPosition);
                yPosition += 6;
              }
              yPosition += 5;
              break;

            default:
              if (text.length > 0) {
                doc.setFontSize(11);
                doc.setFont("helvetica", "normal");
                const defaultLines = doc.splitTextToSize(text, contentWidth);

                for (let line of defaultLines) {
                  if (yPosition > pageHeight - margin - 10) {
                    doc.addPage();
                    yPosition = margin + 10;
                  }
                  doc.text(line, margin, yPosition);
                  yPosition += 6;
                }
                yPosition += 3;
              }
              break;
          }
        }

        // Add footer with page numbers
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.setFont("helvetica", "normal");
          doc.text(
            `Page ${i} of ${pageCount}`,
            pageWidth - margin - 20,
            pageHeight - 10
          );
        }

        // Save the PDF
        doc.save(`${fileName}.pdf`);
      } catch (error) {
        console.error("PDF generation error:", error);
        alert("Error generating PDF. Please try again.");
      } finally {
        // Remove loading indicator
        if (document.body.contains(loadingEl)) {
          document.body.removeChild(loadingEl);
        }
      }
    }, 100);
  }

  toggleControlCenter() {
    const controlCenter = document.getElementById("controlCenter");
    const toggleBtn = document.getElementById("controlCenterToggle");
    const chevron = toggleBtn.querySelector(".chevron");

    if (controlCenter.classList.contains("expanded")) {
      controlCenter.classList.remove("expanded");
      chevron.style.transform = "rotate(0deg)";
    } else {
      controlCenter.classList.add("expanded");
      chevron.style.transform = "rotate(180deg)";
    }
  }

  toggleTheme() {
    document.body.classList.toggle("dark-theme");
    this.isDarkTheme = document.body.classList.contains("dark-theme");
    localStorage.setItem("darkTheme", this.isDarkTheme);

    // Switch Prism theme
    this.switchPrismTheme(this.isDarkTheme);

    // Update theme button icon
    const themeBtn = document.getElementById("themeBtn");
    if (this.isDarkTheme) {
      themeBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              Theme
            `;
    } else {
      themeBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              Theme
            `;
    }
  }

  openColorModal() {
    const modal = document.getElementById("colorModal");
    modal.style.display = "flex";

    // Trigger animation after display is set
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);

    // Mark current color as selected
    document.querySelectorAll(".color-option").forEach((option) => {
      const color = option.getAttribute("data-color");
      if (color === this.currentColor) {
        option.classList.add("selected");
      } else {
        option.classList.remove("selected");
      }
    });
  }

  closeColorModal() {
    const modal = document.getElementById("colorModal");
    modal.classList.remove("show");

    // Hide modal after animation completes
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }

  switchPrismTheme(isDark) {
    // Remove existing Prism theme links
    const existingThemes = document.querySelectorAll(
      'link[href*="prism"][href*="theme"], link[href*="prism-okaidia"], link[href*="prism-coy"]'
    );
    existingThemes.forEach((theme) => theme.remove());

    // Add new theme
    const newTheme = document.createElement("link");
    newTheme.rel = "stylesheet";
    newTheme.href = isDark
      ? "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css"
      : "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-coy.min.css";
    newTheme.id = isDark ? "prism-dark-theme" : "prism-light-theme";

    document.head.appendChild(newTheme);

    // Re-highlight all code blocks after theme change
    setTimeout(() => {
      if (window.Prism) {
        window.Prism.highlightAll();
      }
    }, 200);
  }

  changeThemeColor(color) {
    document.documentElement.style.setProperty("--primary-color", color);
    document.documentElement.style.setProperty("--secondary-color", color);

    // Define gradient combinations for each color
    const gradientMap = {
      "#e53935": "linear-gradient(180deg, #e53935 0%, #c62828 100%)", // Red
      "#1976d2": "linear-gradient(180deg, #1976d2 0%, #1565c0 100%)", // Blue
      "#43a047": "linear-gradient(180deg, #43a047 0%, #388e3c 100%)", // Green
      "#7b1fa2": "linear-gradient(180deg, #7b1fa2 0%, #6a1b9a 100%)", // Purple
      "#ff9800": "linear-gradient(180deg, #ff9800 0%, #f57c00 100%)", // Orange
      "#00acc1": "linear-gradient(180deg, #00acc1 0%, #0097a7 100%)", // Cyan
      "#5d4037": "linear-gradient(180deg, #5d4037 0%, #4e342e 100%)", // Brown
      "#546e7a": "linear-gradient(180deg, #546e7a 0%, #455a64 100%)", // Blue Grey
    };

    // Apply gradient to sidebar
    const sidebar = document.querySelector(".sidebar");
    if (sidebar && gradientMap[color]) {
      sidebar.style.background = gradientMap[color];
    }

    // Store the color preference
    localStorage.setItem("themeColor", color);
    this.currentColor = color;
  }

  loadInitialContent() {
    // Load theme preferences
    const isDarkTheme = localStorage.getItem("darkTheme") === "true";
    if (isDarkTheme) {
      document.body.classList.add("dark-theme");
      this.isDarkTheme = true;
      this.switchPrismTheme(true);

      // Update theme button icon for dark mode
      const themeBtn = document.getElementById("themeBtn");
      themeBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              Theme
            `;
    } else {
      this.switchPrismTheme(false);
    }

    // Load color preference
    const savedColor = localStorage.getItem("themeColor");
    if (savedColor) {
      this.changeThemeColor(savedColor);
    }

    // Load Angular questions by default
    this.loadContent("markdowns/javascript/javascript-questions.md");

    // Initialize new features
    this.initializeFontSizeControls();
    this.initializeFABButton();
    this.initializeStickyQuestions();
    // this.fixCopyButtons();

    // Mobile debugging check
    this.debugMobileLayout();
  }

  initializeFontSizeControls() {
    const decreaseBtn = document.getElementById("decreaseFontBtn");
    const increaseBtn = document.getElementById("increaseFontBtn");
    let currentFontSize = 16; // Default font size

    decreaseBtn.addEventListener("click", () => {
      if (currentFontSize > 12) {
        currentFontSize -= 2;
        document.documentElement.style.setProperty(
          "--base-font-size",
          currentFontSize + "px"
        );
        localStorage.setItem("fontSize", currentFontSize);
      }
    });

    increaseBtn.addEventListener("click", () => {
      if (currentFontSize < 24) {
        currentFontSize += 2;
        document.documentElement.style.setProperty(
          "--base-font-size",
          currentFontSize + "px"
        );
        localStorage.setItem("fontSize", currentFontSize);
      }
    });

    // Load saved font size
    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize) {
      currentFontSize = parseInt(savedFontSize);
      document.documentElement.style.setProperty(
        "--base-font-size",
        currentFontSize + "px"
      );
    }
  }

  initializeFABButton() {
    const fabButton = document.getElementById("fabButton");

    fabButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Show/hide FAB based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        fabButton.style.display = "flex";
      } else {
        fabButton.style.display = "none";
      }
    });
  }

  initializeStickyQuestions() {
    const stickyQuestion = document.getElementById("stickyQuestion");
    let currentQuestion = null;

    window.addEventListener("scroll", () => {
      const questions = document.querySelectorAll(
        ".markdown-content h2, .markdown-content h3"
      );
      const scrollPosition = window.scrollY + 100;

      let activeQuestion = null;
      questions.forEach((question) => {
        if (question.offsetTop <= scrollPosition) {
          activeQuestion = question;
        }
      });

      if (activeQuestion && activeQuestion !== currentQuestion) {
        currentQuestion = activeQuestion;
        stickyQuestion.textContent = activeQuestion.textContent;
        stickyQuestion.style.display = "block";
      } else if (!activeQuestion) {
        stickyQuestion.style.display = "none";
        currentQuestion = null;
      }
    });
  }

  debugMobileLayout() {
    if (window.innerWidth <= 768) {
      console.log("Mobile layout debugging:");

      const elements = {
        container: document.querySelector(".container"),
        sidebar: document.querySelector(".sidebar"),
        mainContent: document.querySelector(".main-content"),
        contentArea: document.getElementById("contentArea"),
        mobileMenuBtn: document.getElementById("mobileMenuBtn"),
      };

      Object.entries(elements).forEach(([name, element]) => {
        if (element) {
          const styles = getComputedStyle(element);
          console.log(`${name}:`, {
            display: styles.display,
            visibility: styles.visibility,
            position: styles.position,
            zIndex: styles.zIndex,
            width: element.offsetWidth,
            height: element.offsetHeight,
            top: element.offsetTop,
            left: element.offsetLeft,
          });
        } else {
          console.warn(`${name} element not found`);
        }
      });

      // Check for any elements that might be covering the content
      const elementsAtCenter = document.elementsFromPoint(
        window.innerWidth / 2,
        window.innerHeight / 2
      );
      console.log(
        "Elements at viewport center:",
        elementsAtCenter.map(
          (el) => el.tagName + (el.className ? "." + el.className : "")
        )
      );
    }
  }

  fixCopyButtons() {
    // Remove duplicate copy buttons and ensure only one permanent copy button per code block
    this.updateCopyButtons();

    // Update copy buttons when content changes
    const observer = new MutationObserver(() => {
      this.updateCopyButtons();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  updateCopyButtons() {
    const codeBlocks = document.querySelectorAll("pre code");

    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;

      // Remove existing copy buttons
      const existingButtons = pre.querySelectorAll(".copy-btn");
      existingButtons.forEach((btn) => btn.remove());

      // Add single permanent copy button
      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-btn";
      copyBtn.innerHTML = "📋";
      copyBtn.title = "Copy code";

      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(codeBlock.textContent).then(() => {
          copyBtn.innerHTML = "✅";
          setTimeout(() => {
            copyBtn.innerHTML = "📋";
          }, 2000);
        });
      });

      pre.style.position = "relative";
      pre.appendChild(copyBtn);
    });
  }
}

let appInitialized = false;

// Initialize app when DOM is loaded and all scripts are ready
function initializeApp() {
  // Prevent multiple initializations
  if (appInitialized) {
    return;
  }

  // Check if all required libraries are loaded
  if (typeof marked === "undefined") {
    console.log("Waiting for Marked library...");
    setTimeout(initializeApp, 100);
    return;
  }

  if (typeof Prism === "undefined") {
    console.log("Waiting for Prism library...");
    setTimeout(initializeApp, 100);
    return;
  }

  // Check if Prism plugins are loaded
  if (!Prism.plugins || !Prism.plugins.autoloader) {
    console.log("Waiting for Prism plugins...");
    setTimeout(initializeApp, 100);
    return;
  }

  console.log("All libraries loaded, initializing app...");
  appInitialized = true;

  // Hide loading screen
  const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }

  // Mobile debugging
  console.log("Mobile debugging info:", {
    userAgent: navigator.userAgent,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
    },
    isMobile: window.innerWidth <= 768,
    touchSupport: "ontouchstart" in window,
  });

  // Load theme preference
  if (localStorage.getItem("darkTheme") === "true") {
    document.body.classList.add("dark-theme");
  }

  // Initialize the app
  try {
    console.log("Starting app initialization...");
    console.log("DOM elements check:", {
      contentArea: !!document.getElementById("contentArea"),
      mobileMenuBtn: !!document.getElementById("mobileMenuBtn"),
      sidebar: !!document.querySelector(".sidebar"),
      container: !!document.querySelector(".container"),
    });

    window.app = new InterviewGuideApp();
    console.log("App initialized successfully");
  } catch (error) {
    console.error("Error initializing app:", error);
    console.error("Error stack:", error.stack);
    const contentArea = document.getElementById("contentArea");
    if (contentArea) {
      contentArea.innerHTML = `
              <div class="error">
                <h3>❌ Application Error</h3>
                <p>Failed to initialize the application: ${error.message}</p>
                <p>Please refresh the page and try again.</p>
                <details>
                  <summary>Technical Details</summary>
                  <pre>${error.stack}</pre>
                </details>
              </div>
            `;
    } else {
      console.error("Content area not found - DOM structure issue");
    }
  }
}

document.addEventListener("DOMContentLoaded", initializeApp);

// Fallback initialization after a delay
setTimeout(initializeApp, 1000);

// Add dark theme styles
const darkThemeStyles = `
            .dark-theme {
                --background-color: #0d1117;
                --surface-color: #161b22;
                --text-primary: #e6edf3;
                --text-secondary: #8b949e;
                --border-color: #30363d;
                background-color: #0d1117 !important;
                color: #e6edf3 !important;
            }
            
            .dark-theme .sidebar {
                background: linear-gradient(180deg, #161b22 0%, #0d1117 100%) !important;
                border-right: 1px solid #30363d !important;
            }
            
            .dark-theme .main-content {
                background-color: #0d1117 !important;
            }
            
            .dark-theme .content-area {
                background-color: #0d1117 !important;
            }
            
            .dark-theme .nav-item {
                color: #e6edf3 !important;
            }
            
            .dark-theme .nav-item:hover {
                background-color: rgba(255, 255, 255, 0.1) !important;
            }
            
            .dark-theme .nav-item.active {
                background-color: rgba(88, 166, 255, 0.15) !important;
                color: #58a6ff !important;
            }
            
            .dark-theme .search-container input,
            .dark-theme .search-input {
                background-color: #21262d !important;
                border: 1px solid #30363d !important;
                color: #e6edf3 !important;
            }
            
            .dark-theme .search-container input::placeholder {
                color: #7d8590 !important;
            }
            
            .dark-theme .search-clear {
                color: #8b949e !important;
            }
            
            .dark-theme .search-clear:hover {
                color: #58a6ff !important;
                background-color: rgba(255, 255, 255, 0.1) !important;
            }
            
            .dark-theme .toolbar button,
            .dark-theme .control-center-toggle,
            .dark-theme .control-btn {
                background-color: #21262d !important;
                color: #e6edf3 !important;
                border: 1px solid #30363d !important;
            }
            
            .dark-theme .toolbar button:hover,
            .dark-theme .control-center-toggle:hover,
            .dark-theme .control-btn:hover {
                background-color: #30363d !important;
                border-color: #58a6ff !important;
            }
            
            .dark-theme .control-center-content {
                background-color: #161b22 !important;
                border: 1px solid #30363d !important;
            }
            
            .dark-theme .markdown-content {
                background-color: #0d1117 !important;
                color: #e6edf3 !important;
            }
            
            .dark-theme .markdown-content h1,
            .dark-theme .markdown-content h2,
            .dark-theme .markdown-content h3,
            .dark-theme .markdown-content h4,
            .dark-theme .markdown-content h5,
            .dark-theme .markdown-content h6 {
                color: #f0f6fc !important;
            }
            
            .dark-theme .markdown-content blockquote {
                background-color: #161b22 !important;
                border-left: 4px solid #30363d !important;
                color: #8b949e !important;
            }
            
            .dark-theme .toc {
                background-color: #161b22 !important;
                border-color: #30363d !important;
            }
            
            .dark-theme .markdown-content table {
                background-color: #161b22 !important;
            }
            
            .dark-theme .markdown-content th {
                background-color: #21262d !important;
                color: #f0f6fc !important;
            }
            
            .dark-theme .markdown-content td {
                border-color: #30363d !important;
            }
            
            .dark-theme .markdown-content p code {
                background-color: #161b22 !important;
                color: #ff7b72 !important;
            }
            
            .dark-theme .color-modal {
                background-color: rgba(13, 17, 23, 0.8) !important;
            }
            
            .dark-theme .color-modal-content {
                background-color: #161b22 !important;
                border: 1px solid #30363d !important;
            }
            
            .dark-theme .fab-button {
                background-color: #21262d !important;
                color: #e6edf3 !important;
                border: 1px solid #30363d !important;
            }
            
            .dark-theme .fab-button:hover {
                background-color: #30363d !important;
            }
            
            .dark-theme .sticky-question {
                background-color: #161b22 !important;
                color: #e6edf3 !important;
                border-bottom: 1px solid #30363d !important;
            }
        `;

const styleSheet = document.createElement("style");
styleSheet.textContent = darkThemeStyles;
document.head.appendChild(styleSheet);
