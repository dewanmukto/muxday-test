// Main JavaScript for MuxDay Jekyll Site
;(() => {
  // Declare gtag variable
  const gtag =
    window.gtag ||
    (() => {
      ;(window.dataLayer = window.dataLayer || []).push(arguments)
    })

  // DOM Elements
  const searchToggle = document.querySelector(".search-toggle")
  const searchOverlay = document.getElementById("search-overlay")
  const searchInput = document.getElementById("search-input")
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const floatingShare = document.getElementById("floating-share")
  const readingProgress = document.getElementById("reading-progress")

  // Search functionality
  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener("click", () => {
      searchOverlay.classList.add("active")
      searchInput.focus()
    })

    searchOverlay.addEventListener("click", (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove("active")
      }
    })

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
        searchOverlay.classList.remove("active")
      }
    })
  }

  // Reading progress bar
  if (readingProgress) {
    function updateReadingProgress() {
      const article = document.querySelector(".post-article")
      if (!article) return

      const articleTop = article.offsetTop
      const articleHeight = article.offsetHeight
      const windowHeight = window.innerHeight
      const scrollTop = window.pageYOffset

      const progress = Math.min(Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0), 1)

      readingProgress.style.width = progress * 100 + "%"
    }

    window.addEventListener("scroll", updateReadingProgress)
    window.addEventListener("resize", updateReadingProgress)
    updateReadingProgress()
  }

  // Sticky share sidebar visibility
  const stickyShareSidebar = document.querySelector(".sticky-share-sidebar")
  if (stickyShareSidebar) {
    function toggleStickyShare() {
      const scrollTop = window.pageYOffset
      const postContent = document.querySelector(".post-content")

      if (postContent && scrollTop > postContent.offsetTop && window.innerWidth > 1024) {
        stickyShareSidebar.style.display = "block"
      } else {
        stickyShareSidebar.style.display = "none"
      }
    }

    window.addEventListener("scroll", toggleStickyShare)
    window.addEventListener("resize", toggleStickyShare)
    toggleStickyShare()
  }

  // Share functionality
  function shareContent(platform) {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(document.title)
    const description = encodeURIComponent(document.querySelector('meta[name="description"]')?.content || "")

    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case "copy":
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification("Link copied to clipboard!")
          })
        } else {
          // Fallback for older browsers
          const textArea = document.createElement("textarea")
          textArea.value = window.location.href
          document.body.appendChild(textArea)
          textArea.select()
          document.execCommand("copy")
          document.body.removeChild(textArea)
          showNotification("Link copied to clipboard!")
        }
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
      trackShare(platform)
      updateShareCount(platform)
    }
  }

  // Add click listeners to all share buttons
  document.addEventListener("click", (e) => {
    const shareBtn = e.target.closest("[data-share]")
    if (shareBtn) {
      e.preventDefault()
      const platform = shareBtn.getAttribute("data-share")
      shareContent(platform)
    }
  })

  // Track shares (integrate with your analytics)
  function trackShare(platform) {
    if (typeof gtag !== "undefined") {
      gtag("event", "share", {
        method: platform,
        content_type: "article",
        item_id: window.location.pathname,
      })
    }

    // Update local storage for share counts
    const shareKey = `shares_${window.location.pathname}_${platform}`
    const currentCount = Number.parseInt(localStorage.getItem(shareKey) || "0")
    localStorage.setItem(shareKey, (currentCount + 1).toString())
  }

  // Update share count display
  function updateShareCount(platform) {
    const shareKey = `shares_${window.location.pathname}_${platform}`
    const count = Number.parseInt(localStorage.getItem(shareKey) || "0")

    const shareCountElements = document.querySelectorAll(`[data-platform="${platform}"]`)
    shareCountElements.forEach((element) => {
      element.textContent = count
    })

    updateTotalShares()
  }

  // Update total share count
  function updateTotalShares() {
    const platforms = ["twitter", "facebook", "linkedin"]
    let total = 0

    platforms.forEach((platform) => {
      const shareKey = `shares_${window.location.pathname}_${platform}`
      total += Number.parseInt(localStorage.getItem(shareKey) || "0")
    })

    const totalSharesElement = document.querySelector(".total-shares")
    if (totalSharesElement) {
      totalSharesElement.textContent = total
    }
  }

  // Initialize share counts on page load
  function initializeShareCounts() {
    const platforms = ["twitter", "facebook", "linkedin"]
    platforms.forEach((platform) => {
      updateShareCount(platform)
    })
    updateTotalShares()
  }

  // Show notification
  function showNotification(message) {
    const notification = document.createElement("div")
    notification.className = "notification"
    notification.textContent = message
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // Add CSS animations for notifications
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `
  document.head.appendChild(style)

  // Smooth scrolling for anchor links
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]')
    if (link) {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
  })

  // Lazy loading for images
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          observer.unobserve(img)
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }

  // Newsletter form handling
  const newsletterForms = document.querySelectorAll(".newsletter-form, .newsletter-form-inline, .newsletter-form-hero")
  newsletterForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = form.querySelector('input[type="email"]').value

      if (email) {
        // Here you would integrate with your newsletter service
        // For now, we'll just show a success message
        showNotification("Thank you for subscribing!")
        form.reset()

        // Track newsletter signup
        if (typeof gtag !== "undefined") {
          gtag("event", "newsletter_signup", {
            method: "website",
            content_type: "email",
          })
        }
      }
    })
  })

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      const navbarMenu = document.querySelector(".navbar-menu")
      navbarMenu.classList.toggle("active")
      mobileMenuToggle.classList.toggle("active")
    })
  }

  // Initialize everything when DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    initializeShareCounts()

    // Add loading animation to share buttons
    const shareButtons = document.querySelectorAll("[data-share]")
    shareButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.style.transform = "scale(0.95)"
        setTimeout(() => {
          button.style.transform = ""
        }, 150)
      })
    })

    // Preload critical resources
    const criticalImages = document.querySelectorAll("img[data-critical]")
    criticalImages.forEach((img) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = img.src
      document.head.appendChild(link)
    })
  })

  // Performance monitoring
  if ("PerformanceObserver" in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "largest-contentful-paint") {
          console.log("LCP:", entry.startTime)
        }
        if (entry.entryType === "first-input") {
          console.log("FID:", entry.processingStart - entry.startTime)
        }
      }
    })

    observer.observe({ entryTypes: ["largest-contentful-paint", "first-input"] })
  }

  // Service Worker registration for PWA capabilities
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration)
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError)
        })
    })
  }
})()
