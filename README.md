# MuxDay - Ideas Worth Sharing

A highly optimized Jekyll site for sharing powerful ideas, technology insights, global trends, music recommendations, and transformative thoughts.

## Features

### SEO & AEO Optimization
- Complete meta tags, Open Graph, and Twitter Cards
- JSON-LD structured data for articles and website
- Semantic HTML structure with proper headings
- Optimized images with alt text
- Fast loading with preconnect and resource hints
- Mobile-first responsive design
- Accessibility features (skip links, ARIA labels)

### Psychological Sharing Triggers
- Multiple share button placements (header, sidebar, CTA sections)
- Social proof with share counts
- Visually appealing gradient backgrounds that encourage sharing
- Floating share buttons for easy access
- One-click sharing with pre-filled content
- Share count gamification
- Newsletter signup with social proof stats

### Advanced Features
- Reading progress bar
- Lazy loading images
- Service Worker for PWA capabilities
- Performance monitoring
- Search functionality
- Mobile-optimized design
- Dark mode support
- Print styles

## Installation

1. Clone this repository
2. Install dependencies:
   \`\`\`bash
   bundle install
   \`\`\`
3. Run the development server:
   \`\`\`bash
   bundle exec jekyll serve
   \`\`\`
4. Open your browser to `http://localhost:4000`

## Configuration

1. Update `_config.yml` with your site details
2. Replace placeholder images in `/assets/images/`
3. Update social media links and analytics IDs
4. Configure your newsletter service endpoint

## Content Structure

### Posts
Create posts in the `_posts` directory with the following front matter:
\`\`\`yaml
---
layout: post
title: "Your Post Title"
category: technology
tags: [ai, innovation, future]
image: /assets/images/your-post-image.jpg
author: "Author Name"
author_image: /assets/images/author.jpg
author_bio: "Author bio here"
excerpt: "Post excerpt for SEO and social sharing"
---
\`\`\`

### Pages
Create pages in the `_pages` directory or root directory.

## Customization

### Colors
Update CSS custom properties in `assets/css/main.css`:
\`\`\`css
:root {
    --primary-color: #2563eb;
    --secondary-color: #f59e0b;
    --accent-color: #10b981;
}
\`\`\`

### Typography
The site uses Inter font by default. Update the Google Fonts link in `_layouts/default.html` to change fonts.

### Social Sharing
Share buttons are automatically generated. Update social media URLs in `_config.yml`.

## Performance

The site is optimized for:
- Core Web Vitals
- Fast loading times
- Mobile performance
- SEO rankings
- Social sharing

## License

MIT License - feel free to use for your own projects.
