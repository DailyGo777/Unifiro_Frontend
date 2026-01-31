export const kanLayout = [
    // Top Logos
    { id: 'logo-1', type: 'image', label: 'Logos', x: 50, y: 20, w: 80, h: 76, zIndex: 10, properties: { src: 'https://placehold.co/400x80/white/png?text=Logos+Here' } },

    // Hero Section

    { id: 'hero-img', type: 'image', label: 'Hero Image', x: 0, y: 0, w: 1000, h: 550, zIndex: 1, properties: { src: 'https://placehold.co/600x800/orange/white?text=Tower+Image' } },

    // Floating Info Cards
    { id: 'card-1', type: 'icon-card', label: 'Date', x: 50, y: 480, w: 220, h: 120, zIndex: 20, properties: { icon: 'calendar', label: 'Date', text: 'JANUARY 16, 2026' } },
    { id: 'card-2', type: 'icon-card', label: 'Time', x: 290, y: 480, w: 220, h: 120, zIndex: 20, properties: { icon: 'clock', label: 'Time', text: '9AM - 4PM' } },
    { id: 'card-3', type: 'icon-card', label: 'Location', x: 530, y: 480, w: 300, h: 120, zIndex: 20, properties: { icon: 'map', label: 'Location', text: 'University Auditorium, Mangalore' } },

    // About Section
    {
        id: 'about-1', type: 'section', label: 'About', x: 50, y: 650, w: 900, h: 200, zIndex: 2, properties: {
            title: 'ABOUT THE PROGRAM',
            subtitle: 'To create a national platform where all the fisheries stakeholders come together...',
            color: '#ffffff'
        }
    },

    // Feature Section
    { id: 'feat-img', type: 'image', label: 'Feature Image', x: 50, y: 880, w: 400, h: 300, zIndex: 3, properties: { src: 'https://placehold.co/400x300/e2e8f0/64748b?text=Illustration' } },
    {
        id: 'feat-txt', type: 'section', label: 'About Logic', x: 480, y: 880, w: 470, h: 300, zIndex: 3, properties: {
            title: 'Mission',
            subtitle: 'Identify ground-level challenges in aquaculture and fisheries.',
            color: '#ffffff'
        }
    },

    // Implementation List
    {
        id: 'imp-list', type: 'list', label: 'Implementation', x: 50, y: 1200, w: 900, h: 300, zIndex: 4, properties: {
            items: [
                'Industry + Farmers + Hatcheries submit real problems via JSVB portal',
                'Officials & scientists access the data to analyze problems',
                'Potential startups & researchers work on these real-world challenges',
                'Creates a strong Lab-to-Land connection',
                'Supports funding, innovation, and collaboration'
            ]
        }
    },
    //button section
    { id: 'btn-1', type: 'button', label: 'Action', x: 631, y: 1441, w: 189, h: 76, zIndex: 4, properties: { label: 'REGISTER NOW'}, color: '#ffffff', isLocked: true },

    // Footer
    {
        id: 'footer', type: 'hero', label: 'Contact', x: 0, y: 1550, w: 1000, h: 200, zIndex: 5, properties: {
            title: 'Contact Us',
            subtitle: 'Dr. Ashwath Nayak | 7760570519 | ashwath.nayak@nitte.edu.in',
            color: '#f97316'
        }
    }
];

export const standardLayout = [
    { id: 'st-1', type: 'navigation', label: 'Simple Navbar', x: 50, y: 20, w: 900, h: 70, zIndex: 1, properties: { title: 'Standard Event', links: ['About', 'Register'], color: '#ffffff' } },
    { id: 'st-2', type: 'hero', label: 'Hero', x: 50, y: 120, w: 900, h: 300, zIndex: 2, properties: { title: 'Welcome to Our Event', subtitle: 'Join us for an amazing experience.', color: '#ffffff' } },
    { id: 'st-3', type: 'section', label: 'Details', x: 50, y: 450, w: 900, h: 200, zIndex: 3, properties: { title: 'Event Details', subtitle: 'Date: Oct 24 | Location: Online', color: '#ffffff' } },
    { id: 'st-4', type: 'button', label: 'Action', x: 631, y: 1441, w: 189, h: 76, zIndex: 4, properties: { label: 'REGISTER NOW', color: '#19dd78fc', isLocked: true } }
];
