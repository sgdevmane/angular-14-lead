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
    this.isNavigatingFromTOC = false;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupSearch();
    this.setupPWA();
    this.setupRouting();
    this.loadInitialContent();
  }

  setupEventListeners() {
    // Navigation items
    document.querySelectorAll(".nav-item[data-file]").forEach((item) => {
      item.addEventListener("click", (e) => {
        const file = e.target.closest(".nav-item").dataset.file;
        const topicName = this.getTopicNameFromFile(file);
        
        // Update URL without triggering page reload
        history.pushState({ file }, '', `/${topicName}`);
        
        this.loadContent(file);

        // Close sidebar on mobile after selection
        if (window.innerWidth <= 1024) {
          const sidebar = document.querySelector(".sidebar");
          const overlay = document.getElementById("sidebarOverlay");
          const mobileMenuBtn = document.getElementById("mobileMenuBtn");

          sidebar.classList.remove("active");
          overlay.classList.remove("active");
          mobileMenuBtn.classList.remove("active");
        }
      });
    });

    if (window.innerWidth <= 1024) {
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
      const mobileMenuBtn = document.getElementById("mobileMenuBtn");
      
      console.log("mobileMenuBtn clicked");
      sidebar.classList.add("active");
      overlay.classList.add("active");
      mobileMenuBtn.classList.add("active");
    });

    // Sidebar overlay click to close
    document.getElementById("sidebarOverlay").addEventListener("click", (e) => {
      const sidebar = document.querySelector(".sidebar");
      const overlay = document.getElementById("sidebarOverlay");
      const mobileMenuBtn = document.getElementById("mobileMenuBtn");

      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    });

    // Close sidebar on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const sidebar = document.querySelector(".sidebar");
        const overlay = document.getElementById("sidebarOverlay");
        const mobileMenuBtn = document.getElementById("mobileMenuBtn");

        if (sidebar.classList.contains("active")) {
          sidebar.classList.remove("active");
          overlay.classList.remove("active");
          mobileMenuBtn.classList.remove("active");
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

  /**
   * Setup URL routing functionality
   */
  setupRouting() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
      // Don't handle popstate if we're navigating from TOC
      if (this.isNavigatingFromTOC) {
        return;
      }
      
      if (event.state && event.state.file) {
        // If there's a scroll target, handle it after content loads
        if (event.state.scrollTarget) {
          this.loadContent(event.state.file).then(() => {
            setTimeout(() => {
              const targetElement = document.getElementById(event.state.scrollTarget);
              if (targetElement) {
                this.smoothScrollToElement(targetElement);
              }
            }, 500);
          });
        } else {
          this.loadContent(event.state.file);
        }
      } else {
        // Handle direct URL access
        this.handleDirectURLAccess();
      }
    });
    
    // Handle hash changes for direct hash navigation
    window.addEventListener('hashchange', (event) => {
      // Don't handle hashchange if we're navigating from TOC
      if (this.isNavigatingFromTOC) {
        return;
      }
      
      const hash = window.location.hash.substring(1);
      if (hash) {
        setTimeout(() => {
          const targetElement = this.findTargetElement(hash, '');
          if (targetElement) {
            this.smoothScrollToElement(targetElement);
          }
        }, 100);
      }
    });
  }

  /**
   * Extract topic name from file path for URL routing
   * @param {string} filePath - The markdown file path
   * @returns {string} - The topic name for URL
   */
  getTopicNameFromFile(filePath) {
    // Extract topic from path like 'markdowns/react/react-questions.md' -> 'react'
    const pathParts = filePath.split('/');
    if (pathParts.length >= 2) {
      return pathParts[pathParts.length - 2]; // Get the folder name
    }
    return 'home';
  }

  /**
   * Handle direct URL access by parsing the current path
   */
  handleDirectURLAccess() {
    const path = window.location.pathname;
    const hash = window.location.hash.substring(1);
    
    if (path === '/' || path === '') {
      // Load default content
      this.loadContent("markdowns/javascript/javascript-questions.md").then(() => {
        // Handle hash if present
        if (hash) {
          setTimeout(() => {
            const targetElement = this.findTargetElement(hash, '');
            if (targetElement) {
              this.smoothScrollToElement(targetElement);
            }
          }, 500);
        }
      });
      return;
    }

    // Remove leading slash and get topic name
    const topicName = path.substring(1);
    const filePath = `markdowns/${topicName}/${topicName}-questions.md`;
    
    // Check if the file exists by trying to load it
    this.loadContent(filePath).then(() => {
      // Handle hash if present
      if (hash) {
        setTimeout(() => {
          const targetElement = this.findTargetElement(hash, '');
          if (targetElement) {
            this.smoothScrollToElement(targetElement);
          }
        }, 500);
      }
    }).catch(() => {
      // If file doesn't exist, load default
      console.warn(`Topic '${topicName}' not found, loading default content`);
      this.loadContent("markdowns/javascript/javascript-questions.md");
    });
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
      
      // Update URL state if not navigating from TOC
      if (!this.isNavigatingFromTOC) {
        const topicName = this.getTopicNameFromFile(filePath);
        const newURL = `/${topicName}`;
        if (window.location.pathname !== newURL) {
          history.replaceState({ file: filePath }, '', newURL);
        }
      }
      
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

      // Assign IDs to headings for TOC navigation
      this.assignHeadingIds();

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

  assignHeadingIds() {
    // Assign unique IDs to all headings for TOC navigation
    const headings = document.querySelectorAll('.markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4, .markdown-content h5, .markdown-content h6');
    const usedIds = new Set();
    
    headings.forEach((heading) => {
      if (!heading.id) {
        // Create a slug from the heading text
        let slug = heading.textContent
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Replace multiple hyphens with single
          .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
        
        // Ensure uniqueness
        let finalId = slug;
        let counter = 1;
        while (usedIds.has(finalId) || document.getElementById(finalId)) {
          finalId = `${slug}-${counter}`;
          counter++;
        }
        
        heading.id = finalId;
        usedIds.add(finalId);
      }
    });
  }

  generateTOC() {
    // Check if markdown already contains a TOC
    const existingTOC = document.querySelector(".markdown-content h3");
    if (existingTOC && existingTOC.textContent.toLowerCase().includes("table of contents")) {
      // Enhance existing TOC with smooth scrolling
      this.enhanceExistingTOC();
      return;
    }

    const headings = document.querySelectorAll(
      ".markdown-content h2, .markdown-content h3"
    );
    if (headings.length === 0) return;

    const toc = document.createElement("div");
    toc.className = "toc generated-toc";
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
        
        // Set flag to indicate navigation from TOC
        this.isNavigatingFromTOC = true;
        
        // Scroll to the target element with offset
        const yOffset = -20;
        const y = heading.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        
        // Update URL hash without triggering popstate
        const currentPath = window.location.pathname;
        history.replaceState(history.state, '', `${currentPath}#${id}`);
        
        // Reset the flag after a short delay
        setTimeout(() => {
          this.isNavigatingFromTOC = false;
        }, 100);
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

  enhanceExistingTOC() {
    // Remove any existing TOC event listeners to prevent conflicts
    const existingTocLinks = document.querySelectorAll(".markdown-content a[href^='#']");
    existingTocLinks.forEach(link => {
      // Clone the link to remove all event listeners
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
    });
    
    // Find all links in the existing TOC and add smooth scrolling
    const tocLinks = document.querySelectorAll(".markdown-content a[href^='#']");
    console.log(`Found ${tocLinks.length} TOC links to enhance`);
    
    tocLinks.forEach((link, index) => {
      // Add a unique identifier to track this link
      link.setAttribute('data-toc-link', index);
      
      link.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('TOC link clicked:', link.textContent, link.href);
        
        // Set flag to indicate navigation from TOC
        this.isNavigatingFromTOC = true;
        
        const targetId = link.getAttribute('href').substring(1);
        console.log('Looking for target:', targetId);
        
        // Try multiple strategies to find the target element
        let targetElement = this.findTargetElement(targetId, link.textContent);
        
        if (targetElement) {
          console.log('Target element found:', targetElement);
          
          // Scroll to the target element with smooth behavior
          this.smoothScrollToElement(targetElement);
          
          // Update URL hash without triggering popstate or page reload
          const currentPath = window.location.pathname;
          const newURL = `${currentPath}#${targetId}`;
          
          // Use replaceState to avoid triggering popstate event
          history.replaceState({ 
            file: this.currentFile, 
            scrollTarget: targetId 
          }, '', newURL);
          
          console.log('URL updated to:', newURL);
        } else {
          console.warn(`Target element not found for: ${targetId}`);
          // Try to find any heading with similar text
          this.fallbackScrollToText(link.textContent);
        }
        
        // Reset the flag after scrolling is complete
        setTimeout(() => {
          this.isNavigatingFromTOC = false;
        }, 1000);
        
        return false; // Prevent any default behavior
      }, { capture: true }); // Use capture phase to handle event first
    });
  }
  
  /**
   * Find target element using multiple strategies
   * @param {string} targetId - The target ID to find
   * @param {string} linkText - The text content of the link
   * @returns {HTMLElement|null} - The target element or null
   */
  findTargetElement(targetId, linkText) {
    // Strategy 1: Direct ID match
    let targetElement = document.getElementById(targetId);
    if (targetElement) return targetElement;
    
    // Strategy 2: Name attribute match
    targetElement = document.querySelector(`[name="${targetId}"]`);
    if (targetElement) return targetElement;
    
    // Strategy 3: Find by text content matching
    const headings = document.querySelectorAll('.markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4, .markdown-content h5, .markdown-content h6');
    const linkTextLower = linkText.toLowerCase().trim();
    
    for (const heading of headings) {
      const headingText = heading.textContent.toLowerCase().trim();
      
      // Direct text match
      if (headingText === linkTextLower) {
        return heading;
      }
      
      // Try slug-style matching
      const headingSlug = headingText.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      const targetSlug = targetId.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      if (headingSlug === targetSlug) {
        return heading;
      }
      
      // Try partial text matching (if link text is contained in heading)
      if (headingText.includes(linkTextLower) && linkTextLower.length > 3) {
        return heading;
      }
    }
    
    return null;
  }
  
  /**
   * Smooth scroll to an element with proper offset
   * @param {HTMLElement} element - The element to scroll to
   */
  smoothScrollToElement(element) {
    // Calculate position with offset for fixed headers
    const yOffset = -80; // Increased offset for better visibility
    const elementTop = element.getBoundingClientRect().top;
    const offsetPosition = elementTop + window.pageYOffset + yOffset;
    
    // Scroll with smooth behavior
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Add a visual highlight to the target element
    element.style.transition = 'background-color 0.3s ease';
    element.style.backgroundColor = '#fff3cd';
    
    setTimeout(() => {
      element.style.backgroundColor = '';
      setTimeout(() => {
        element.style.transition = '';
      }, 300);
    }, 1500);
  }
  
  /**
   * Fallback method to scroll to text when ID-based scrolling fails
   * @param {string} text - The text to search for
   */
  fallbackScrollToText(text) {
    const allElements = document.querySelectorAll('.markdown-content *');
    const searchText = text.toLowerCase().trim();
    
    for (const element of allElements) {
      if (element.textContent.toLowerCase().includes(searchText)) {
        this.smoothScrollToElement(element);
        console.log('Fallback scroll to element containing:', searchText);
        break;
      }
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

  processMixedContent(doc, element, x, y, maxWidth) {
    const children = element.childNodes;
    let currentY = y;
    let currentX = x;
    
    for (let child of children) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent.trim();
        if (text) {
          const lines = doc.splitTextToSize(text, maxWidth - (currentX - x));
          for (let line of lines) {
            doc.text(line, currentX, currentY);
            currentY += 5;
            currentX = x; // Reset to left margin for subsequent lines
          }
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (child.tagName === 'STRONG' || child.tagName === 'B') {
          doc.setFont("helvetica", "bold");
          const text = child.textContent.trim();
          if (text) {
            const lines = doc.splitTextToSize(text, maxWidth - (currentX - x));
            for (let line of lines) {
              doc.text(line, currentX, currentY);
              currentY += 5;
              currentX = x;
            }
          }
          doc.setFont("helvetica", "normal");
        } else {
          const text = child.textContent.trim();
          if (text) {
            const lines = doc.splitTextToSize(text, maxWidth - (currentX - x));
            for (let line of lines) {
              doc.text(line, currentX, currentY);
              currentY += 5;
              currentX = x;
            }
          }
        }
      }
    }
    
    return currentY;
  }

  exportToPDF() {
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

    // Use html2canvas + jsPDF for better styling preservation
    this.exportWithStyling(contentArea, loadingEl);
  }

  /**
   * Export PDF with preserved styling using html2canvas
   * @param {HTMLElement} contentArea - The content area to export
   * @param {HTMLElement} loadingEl - The loading indicator element
   */
  async exportWithStyling(contentArea, loadingEl) {
    try {
      // Check if html2canvas is available
      if (typeof html2canvas === 'undefined') {
        console.warn('html2canvas not available, falling back to text-based export');
        this.exportTextBasedPDF(contentArea, loadingEl);
        return;
      }

      const { jsPDF } = window.jspdf;
      
      // Clone content area to avoid modifying original
      const clonedContent = contentArea.cloneNode(true);
      
      // Remove generated TOC if it exists to avoid duplication
      const generatedTOC = clonedContent.querySelector('.generated-toc');
      if (generatedTOC) {
        generatedTOC.remove();
      }
      
      // Create a temporary container with proper styling
      const tempContainer = document.createElement('div');
      tempContainer.style.cssText = `
        position: absolute;
        top: -9999px;
        left: -9999px;
        width: 800px;
        background: white;
        padding: 40px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #333;
      `;
      
      // Apply content styling
      clonedContent.style.cssText = `
        width: 100%;
        background: white;
        color: #333;
      `;
      
      // Enhance styling for better PDF appearance
      const headings = clonedContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        heading.style.cssText += `
          color: #2c3e50;
          margin-top: 24px;
          margin-bottom: 16px;
          font-weight: bold;
        `;
      });
      
      const codeBlocks = clonedContent.querySelectorAll('pre, code');
      codeBlocks.forEach(code => {
        code.style.cssText += `
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 4px;
          padding: 12px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 14px;
          color: #495057;
        `;
      });
      
      const paragraphs = clonedContent.querySelectorAll('p');
      paragraphs.forEach(p => {
        p.style.cssText += `
          margin-bottom: 16px;
          line-height: 1.6;
        `;
      });
      
      tempContainer.appendChild(clonedContent);
      document.body.appendChild(tempContainer);
      
      // Generate canvas from the styled content
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: tempContainer.scrollHeight
      });
      
      // Remove temporary container
      document.body.removeChild(tempContainer);
      
      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Get current file name for the PDF
      const fileName = this.currentFile
        ? this.currentFile.split("/").pop().replace(".md", "")
        : "interview-guide";
      
      // Save the PDF
      pdf.save(`${fileName}.pdf`);
      
    } catch (error) {
      console.error('Error generating styled PDF:', error);
      // Fallback to text-based export
      this.exportTextBasedPDF(contentArea, loadingEl);
    } finally {
      // Remove loading indicator
      if (loadingEl && loadingEl.parentNode) {
        loadingEl.parentNode.removeChild(loadingEl);
      }
    }
  }

  /**
   * Fallback text-based PDF export
   * @param {HTMLElement} contentArea - The content area to export
   * @param {HTMLElement} loadingEl - The loading indicator element
   */
  exportTextBasedPDF(contentArea, loadingEl) {
    // Use setTimeout to allow the loading indicator to render
    setTimeout(() => {
      try {
        // Create PDF with proper A4 dimensions and enhanced settings
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
          compress: true,
          precision: 2,
          userUnit: 1.0
        });

        // A4 dimensions in mm
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 15;
        const contentWidth = pageWidth - margin * 2;
        const contentHeight = pageHeight - margin * 2;

        // Get current file name for the PDF title
        const fileName = this.currentFile
          ? this.currentFile.split("/").pop().replace(".md", "")
          : "interview-guide";

        // Add title with better formatting
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(44, 62, 80); // Dark blue-gray
        const title = fileName.replace(/-/g, " ").toUpperCase();
        doc.text(title, margin, margin + 12);

        // Add a colored line under title
        doc.setDrawColor(52, 152, 219); // Blue
        doc.setLineWidth(1);
        doc.line(margin, margin + 18, pageWidth - margin, margin + 18);

        let yPosition = margin + 30;

        // Clone content area to avoid modifying original
        const clonedContent = contentArea.cloneNode(true);
        
        // Remove generated TOC if it exists to avoid duplication
        const generatedTOC = clonedContent.querySelector('.generated-toc');
        if (generatedTOC) {
          generatedTOC.remove();
        }

        // Extract and format content
        const elements = clonedContent.children;

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

          // Handle different element types with enhanced formatting
          switch (tagName) {
            case "h1":
              yPosition += 8; // Add space before heading
              doc.setFontSize(18);
              doc.setFont("helvetica", "bold");
              doc.setTextColor(44, 62, 80); // Dark blue-gray
              doc.text(text, margin, yPosition);
              yPosition += 12;
              // Add underline for h1
              doc.setDrawColor(52, 152, 219);
              doc.setLineWidth(0.5);
              doc.line(margin, yPosition - 8, margin + 100, yPosition - 8);
              break;

            case "h2":
              yPosition += 6; // Add space before heading
              doc.setFontSize(16);
              doc.setFont("helvetica", "bold");
              doc.setTextColor(52, 73, 94); // Darker gray
              doc.text(text, margin, yPosition);
              yPosition += 10;
              break;

            case "h3":
              yPosition += 4; // Add space before heading
              doc.setFontSize(14);
              doc.setFont("helvetica", "bold");
              doc.setTextColor(85, 85, 85); // Medium gray
              doc.text(text, margin, yPosition);
              yPosition += 8;
              break;

            case "p":
              doc.setFontSize(11);
              doc.setFont("helvetica", "normal");
              doc.setTextColor(0, 0, 0); // Black for body text
              
              // Handle special formatting for strong/bold text
              if (element.querySelector('strong') || element.querySelector('b')) {
                // Process mixed content with bold
                this.processMixedContent(doc, element, margin, yPosition, contentWidth);
                const lineCount = Math.ceil(text.length / 80); // Rough estimate
                yPosition += lineCount * 5 + 3;
              } else {
                const lines = doc.splitTextToSize(text, contentWidth);
                for (let line of lines) {
                  if (yPosition > pageHeight - margin - 15) {
                    doc.addPage();
                    yPosition = margin + 15;
                  }
                  doc.text(line, margin, yPosition);
                  yPosition += 5;
                }
                yPosition += 3;
              }
              break;

            case "pre":
              doc.setFontSize(9);
              doc.setFont("courier", "normal");
              doc.setTextColor(0, 0, 0);
              
              // Enhanced code block styling
              const codeLines = text.split("\n");
              const lineHeight = 4;
              const padding = 4;
              const codeHeight = codeLines.length * lineHeight + padding * 2;

              if (yPosition + codeHeight > pageHeight - margin - 10) {
                doc.addPage();
                yPosition = margin + 15;
              }

              // Draw code background with border
              doc.setFillColor(248, 249, 250); // Light gray background
              doc.setDrawColor(220, 220, 220); // Border color
              doc.setLineWidth(0.5);
              doc.rect(margin, yPosition - padding, contentWidth, codeHeight, "FD");

              // Add code content
              doc.setTextColor(33, 37, 41); // Dark text for code
              for (let codeLine of codeLines) {
                if (codeLine.trim()) { // Only render non-empty lines
                  doc.text(codeLine, margin + 2, yPosition);
                }
                yPosition += lineHeight;
              }
              yPosition += padding + 4;
              break;

            case "ul":
            case "ol":
              doc.setFontSize(11);
              doc.setFont("helvetica", "normal");
              doc.setTextColor(0, 0, 0);
              const listItems = element.querySelectorAll("li");
              yPosition += 2; // Add space before list

              listItems.forEach((li, liIndex) => {
                const bullet = tagName === "UL" ? "•" : `${liIndex + 1}.`;
                const liText = li.textContent.trim();
                const fullText = `${bullet} ${liText}`;
                const liLines = doc.splitTextToSize(fullText, contentWidth - 15);

                liLines.forEach((line, lineIndex) => {
                  if (yPosition > pageHeight - margin - 15) {
                    doc.addPage();
                    yPosition = margin + 15;
                  }
                  doc.text(
                    line,
                    margin + (lineIndex === 0 ? 5 : 15),
                    yPosition
                  );
                  yPosition += 5;
                });
                yPosition += 1;
              });
              yPosition += 4;
              break;

            default:
              // Handle other elements as paragraphs
              if (text) {
                doc.setFontSize(11);
                doc.setFont("helvetica", "normal");
                doc.setTextColor(0, 0, 0);
                const lines = doc.splitTextToSize(text, contentWidth);
                for (let line of lines) {
                  if (yPosition > pageHeight - margin - 15) {
                    doc.addPage();
                    yPosition = margin + 15;
                  }
                  doc.text(line, margin, yPosition);
                  yPosition += 5;
                }
                yPosition += 3;
              }
              break;
          }
        }

        // Add footer with page numbers and metadata
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.setFont("helvetica", "normal");
          doc.setTextColor(128, 128, 128);
          
          // Add page number
          doc.text(
            `Page ${i} of ${pageCount}`,
            pageWidth - margin - 25,
            pageHeight - 8
          );
          
          // Add generation date on first page
          if (i === 1) {
            const now = new Date();
            const dateStr = now.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            doc.text(
              `Generated on ${dateStr}`,
              margin,
              pageHeight - 8
            );
          }
        }

        // Save the PDF
        doc.save(`${fileName}.pdf`);
      } catch (error) {
        console.error("PDF generation error:", error);
        alert("Error generating PDF. Please try again.");
      } finally {
        // Remove loading indicator
        if (loadingEl && loadingEl.parentNode) {
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

    // Handle initial URL routing
    this.handleDirectURLAccess();

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
    if (window.innerWidth <= 1024) {
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
    isMobile: window.innerWidth <= 1024,
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
