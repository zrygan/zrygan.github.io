// ── Apple Liquid Glass Optical Magnifying Lens Cursor ──────────────
(function initLiquidGlassMagnifier() {
  function start() {
    // Only run on devices with a pointing device (mouse/trackpad/pen)
    if (
      window.matchMedia &&
      window.matchMedia('(pointer: coarse)').matches &&
      !window.matchMedia('(pointer: fine)').matches
    ) {
      return;
    }

    // Lens dimensions & optical zoom ratio
    const R = 14; // Radius in px (28px diameter)
    const ZOOM = 1.5; // 1.5x magnification

    // Create the magnifying lens DOM elements
    const lens = document.createElement('div');
    lens.className = 'magnifier-lens';
    lens.id = 'magnifier-lens';
    lens.setAttribute('aria-hidden', 'true');

    const view = document.createElement('div');
    view.className = 'magnifier-view';
    view.id = 'magnifier-view';
    lens.appendChild(view);

    const glint = document.createElement('div');
    glint.className = 'magnifier-glass-glint';
    lens.appendChild(glint);

    document.body.appendChild(lens);

    // Hide default system cursor
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    // Identify primary content container to magnify
    function getSourceElement() {
      const modal = document.querySelector('.modal-overlay');
      if (
        modal &&
        (modal.classList.contains('active') ||
          (modal.style.display && modal.style.display !== 'none'))
      ) {
        return modal;
      }
      return (
        document.querySelector('.transition-box') ||
        document.querySelector('.container') ||
        document.body
      );
    }

    // Match lens background color with document
    function updateLensBackground() {
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      if (bodyBg && bodyBg !== 'transparent' && bodyBg !== 'rgba(0, 0, 0, 0)') {
        lens.style.backgroundColor = bodyBg;
      } else {
        lens.style.backgroundColor = '#07070f';
      }
    }
    updateLensBackground();

    let currentClone = null;
    let targetSource = null;
    let rectLeft = 0;
    let rectTop = 0;
    let lastHoveredClone = null;

    let cloneNodesMap = [];

    // Cache target source bounding rect to eliminate layout thrashing
    function updateRect() {
      if (!targetSource) targetSource = getSourceElement();
      if (targetSource) {
        const rect = targetSource.getBoundingClientRect();
        rectLeft = rect.left;
        rectTop = rect.top;
      }
    }

    // Sync scroll positions of inner scrollable containers (e.g. .display-box)
    function syncScrolls() {
      if (!targetSource || !currentClone) return;
      const srcScrolls = targetSource.querySelectorAll('.display-box, .content, .modal-content, .contents-list');
      const cloneScrolls = currentClone.querySelectorAll('.display-box, .content, .modal-content, .contents-list');
      const count = Math.min(srcScrolls.length, cloneScrolls.length);
      for (let i = 0; i < count; i++) {
        cloneScrolls[i].scrollTop = srcScrolls[i].scrollTop;
        cloneScrolls[i].scrollLeft = srcScrolls[i].scrollLeft;
      }
    }

    // Tag matching elements with IDs for fast O(1) hover and interaction synchronization
    function tagElements(src, clone) {
      const srcAll = src.querySelectorAll('*');
      const cloneAll = clone.querySelectorAll('*');
      const len = Math.min(srcAll.length, cloneAll.length);
      cloneNodesMap = new Array(len);
      for (let i = 0; i < len; i++) {
        srcAll[i].setAttribute('data-lens-id', i);
        cloneAll[i].setAttribute('data-lens-id', i);
        cloneNodesMap[i] = cloneAll[i];
      }
    }

    // Map DOM nodes between targetSource and currentClone via child path
    function getNodePath(node, root) {
      const path = [];
      let curr = node;
      while (curr && curr !== root) {
        let idx = 0;
        let sib = curr;
        while ((sib = sib.previousSibling)) idx++;
        path.unshift(idx);
        curr = curr.parentNode;
      }
      return curr === root ? path : null;
    }

    function getNodeFromPath(path, root) {
      let curr = root;
      for (let i = 0; i < path.length; i++) {
        if (!curr || !curr.childNodes || path[i] >= curr.childNodes.length) return null;
        curr = curr.childNodes[path[i]];
      }
      return curr;
    }

    function getCloneNode(srcNode) {
      if (!targetSource || !currentClone) return null;
      const path = getNodePath(srcNode, targetSource);
      if (!path) return null;
      return getNodeFromPath(path, currentClone);
    }

    // Synchronize live text selection to the cloned view
    function syncSelection() {
      if (!targetSource || !currentClone) return;

      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.rangeCount) {
        if (typeof CSS !== 'undefined' && CSS.highlights) {
          CSS.highlights.delete('lens-selection');
        }
        currentClone.querySelectorAll('.lens-selected').forEach((el) => {
          const parent = el.parentNode;
          if (parent) {
            while (el.firstChild) parent.insertBefore(el.firstChild, el);
            parent.removeChild(el);
            parent.normalize();
          }
        });
        return;
      }

      const range = sel.getRangeAt(0);
      if (!targetSource.contains(range.startContainer) && !targetSource.contains(range.endContainer)) {
        if (typeof CSS !== 'undefined' && CSS.highlights) {
          CSS.highlights.delete('lens-selection');
        }
        return;
      }

      const cloneStart = getCloneNode(range.startContainer);
      const cloneEnd = getCloneNode(range.endContainer);
      if (!cloneStart || !cloneEnd) return;

      try {
        const cloneRange = document.createRange();
        cloneRange.setStart(cloneStart, range.startOffset);
        cloneRange.setEnd(cloneEnd, range.endOffset);

        if (typeof CSS !== 'undefined' && CSS.highlights && typeof Highlight !== 'undefined') {
          const hl = new Highlight(cloneRange);
          CSS.highlights.set('lens-selection', hl);
        } else {
          currentClone.querySelectorAll('.lens-selected').forEach((el) => {
            const parent = el.parentNode;
            if (parent) {
              while (el.firstChild) parent.insertBefore(el.firstChild, el);
              parent.removeChild(el);
              parent.normalize();
            }
          });
          const span = document.createElement('span');
          span.className = 'lens-selected';
          cloneRange.surroundContents(span);
        }
      } catch (e) {
        // Ignore cross-element boundary selection edge cases
      }
    }

    function syncClone() {
      targetSource = getSourceElement();
      if (!targetSource) return;

      view.innerHTML = '';
      const clone = targetSource.cloneNode(true);

      // Preserve IDs so CSS layout selectors (e.g. #section-nav, div[id]) match 100% identically!
      // Accessibility & audio safety
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('video, audio').forEach((media) => {
        media.pause();
        media.removeAttribute('autoplay');
        media.muted = true;
      });

      // Set explicit width matching the source container
      const rect = targetSource.getBoundingClientRect();
      clone.style.width = `${rect.width}px`;
      clone.style.margin = '0';
      clone.style.maxWidth = 'none';

      // Ensure active modal overlay fills the view and is visible
      if (targetSource.classList.contains('modal-overlay')) {
        clone.style.position = 'absolute';
        clone.style.inset = '0';
        clone.style.width = '100vw';
        clone.style.height = '100vh';
        clone.style.display = 'flex';
        clone.style.opacity = '1';
      }

      view.appendChild(clone);
      currentClone = clone;
      lastHoveredClone = null;

      tagElements(targetSource, clone);
      updateRect();
      syncScrolls();
      syncSelection();
    }

    syncClone();

    // Debounced sync for DOM mutations
    let syncScheduled = false;
    function scheduleSync() {
      if (!syncScheduled) {
        syncScheduled = true;
        requestAnimationFrame(() => {
          syncScheduled = false;
          syncClone();
        });
      }
    }

    // Observe DOM mutations across document.body to catch modal toggles, section changes, and clocks
    const observer = new MutationObserver((mutations) => {
      let needsFullSync = false;
      for (let i = 0; i < mutations.length; i++) {
        const target = mutations[i].target;
        if (lens.contains(target)) continue;

        // Fast-path: clock updates (#manila-time or #nyc-time) sync text directly to clone without full re-clone
        const el = target.nodeType === Node.ELEMENT_NODE ? target : target.parentElement;
        const clockSpan = el ? el.closest('#manila-time, #nyc-time') : null;
        if (clockSpan) {
          if (currentClone) {
            const cloneClock = currentClone.querySelector('#' + clockSpan.id);
            if (cloneClock) cloneClock.textContent = clockSpan.textContent;
          }
          continue;
        }

        needsFullSync = true;
        break;
      }
      if (needsFullSync) {
        scheduleSync();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
      characterData: true
    });

    let clientX = window.innerWidth / 2;
    let clientY = window.innerHeight / 2;
    let isInsideWindow = false;
    let isClicking = false;
    let isHoveringInteractive = false;
    let rafPending = false;

    // Instant zero-lag hardware transform update (no layout reflow)
    function renderLens() {
      rafPending = false;
      const localX = clientX - rectLeft;
      const localY = clientY - rectTop;

      const transX = R - ZOOM * localX;
      const transY = R - ZOOM * localY;

      const scale = isClicking ? 0.92 : 1;
      lens.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) scale(${scale})`;
      view.style.transform = `translate3d(${transX}px, ${transY}px, 0) scale(${ZOOM})`;
    }

    function scheduleRender() {
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(renderLens);
      }
    }

    const INTERACTIVE_SELECTOR =
      'a, button, .btn, [role="button"], .back-home-btn, .back-to-top-btn, .contents-btn, .close-modal, .references-btn';
    const MIRROR_SELECTOR = 'a, button, .btn, tr, .small-box a, .display-box a';

    // Event-driven hover state (zero document.elementFromPoint layout thrashing)
    function updateHoverFromElement(el) {
      if (!el || !(el instanceof Element)) return;

      const isInteractive = !!el.closest(INTERACTIVE_SELECTOR);
      if (isInteractive !== isHoveringInteractive) {
        isHoveringInteractive = isInteractive;
        lens.classList.toggle('hovering-interactive', isHoveringInteractive);
      }

      // Mirror hover styling inside the magnified view
      const hoveredInteractive = el.closest(MIRROR_SELECTOR);
      let newHoveredClone = null;
      if (hoveredInteractive && targetSource && targetSource.contains(hoveredInteractive)) {
        const lensId = hoveredInteractive.getAttribute('data-lens-id');
        if (lensId !== null && cloneNodesMap && cloneNodesMap[lensId]) {
          newHoveredClone = cloneNodesMap[lensId];
        }
      }

      if (newHoveredClone !== lastHoveredClone) {
        if (lastHoveredClone) lastHoveredClone.classList.remove('lens-hover');
        if (newHoveredClone) newHoveredClone.classList.add('lens-hover');
        lastHoveredClone = newHoveredClone;
      }
    }

    document.addEventListener(
      'mousemove',
      (e) => {
        clientX = e.clientX;
        clientY = e.clientY;

        if (!isInsideWindow) {
          isInsideWindow = true;
          lens.style.opacity = '1';
        }

        scheduleRender();
      },
      { passive: true }
    );

    document.addEventListener(
      'mouseover',
      (e) => {
        updateHoverFromElement(e.target);
      },
      { passive: true }
    );

    document.addEventListener('selectionchange', syncSelection);

    document.addEventListener('mousedown', () => {
      isClicking = true;
      lens.classList.add('clicking');
      renderLens();
    });

    document.addEventListener('mouseup', () => {
      isClicking = false;
      lens.classList.remove('clicking');
      renderLens();
    });

    document.documentElement.addEventListener('mouseleave', () => {
      isInsideWindow = false;
      isClicking = false;
      lens.classList.remove('clicking');
      lens.style.opacity = '0';
      if (lastHoveredClone) {
        lastHoveredClone.classList.remove('lens-hover');
        lastHoveredClone = null;
      }
      if (isHoveringInteractive) {
        isHoveringInteractive = false;
        lens.classList.remove('hovering-interactive');
      }
    });

    document.documentElement.addEventListener('mouseenter', () => {
      isInsideWindow = true;
      lens.style.opacity = '1';
    });

    // Capture scrolls on window and any inner containers (e.g. .display-box)
    window.addEventListener(
      'scroll',
      () => {
        updateRect();
        syncScrolls();
        scheduleRender();
      },
      { capture: true, passive: true }
    );

    window.addEventListener(
      'resize',
      () => {
        syncClone();
        updateRect();
        scheduleRender();
      },
      { passive: true }
    );

    // Print support
    window.addEventListener('beforeprint', () => {
      document.body.style.cursor = '';
      lens.style.display = 'none';
    });
    window.addEventListener('afterprint', () => {
      document.body.style.cursor = 'none';
      lens.style.display = '';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
