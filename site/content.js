// Edit this file to change your page. Reorder rows or set visible: false to hide one.
window.HUB = {
  name: 'Pearl Pospiech',
  handle: '',
  bio: 'Polymath, futurist, artist, producer.',
  intro: '',
  articles: [
    { icon: 'mail', title: 'Inbox Zero? Here’s How to Fix Your Email Fatigue in 2026', note: 'Digital life · Medium', url: 'https://pearlpospiech.medium.com/inbox-zero-heres-how-to-fix-your-email-fatigue-in-2026-f84dc9040507', visible: true },
    { icon: 'sheet', title: 'DIY Bookkeeping Magic', note: 'Venmo → CSV with Google Sheets + Apps Script · Medium', url: 'https://pearlpospiech.medium.com/diy-bookkeeping-magic-parsing-venmo-transactions-to-csv-with-google-sheets-apps-script-0bd867104d47', visible: true },
    { icon: 'database', title: 'One-Minute Wonder Workflow: AI → Database', note: 'An untethered workflow · Medium', url: 'https://pearlpospiech.medium.com/one-minute-wonder-workflow-ai-to-database-7f2efce72966', visible: true }
  ],
  apps: [
    { icon: 'form', title: 'PopForms', note: 'Free app', url: 'https://popforms.replit.app/', visible: true },
    { icon: 'cards', title: 'Classic Solitaire', note: 'Free game', url: 'https://classicsolitaire.replit.app/', visible: true },
    { icon: 'celebrate', title: 'Bachelorette', note: 'Free app', url: 'https://bachelorette.replit.app/', visible: true }
  ],
  projects: [
    { icon: 'world', title: 'Pearl’s Mini Worlds', note: '', url: 'https://pearlsminiworlds.com/', visible: true },
    { icon: 'vr', title: 'T-Mobile VR', note: 'Project page coming soon', url: '', pending: true, visible: true },
    { icon: 'social', title: 'Spatial.chat & Social Experiments', note: 'Project page coming soon', url: '', pending: true, visible: true }
  ],
  goodies: [
    { icon: 'bag', title: 'Pearl Makes It POP on Gumroad', note: 'Browse the shop', url: 'https://pearlmakesitpop.gumroad.com/', visible: true },
    { icon: 'coffee', title: 'Buy me a coffee', note: 'Support what I make', url: 'https://buymeacoffee.com/pearlpop', visible: true }
  ],
  // Paste your newsletter provider’s public signup URL here to enable signup.
  // A hosted signup keeps personal data with your newsletter provider.
  newsletter: { url: '', title: 'Stay in the loop.', description: 'New writing, projects, and things worth sharing.' },
  // Public configuration only. Credentials belong on the submission server.
  tutoring: {
    title: 'Learn with Pearl and make... anything!',
    description: 'Private web & graphic design tutoring, tailored to your project and experience level.',
    endpoint: 'https://pearl-discovery-intake.whoaitsaimz.workers.dev/inquiry',
    bookingUrl: 'https://calendly.com/pearlmakesitpop/discovery',
    turnstileSiteKey: '0x4AAAAAAF_Kbh023AbH_4aH',
    prefillParameter: 'email'
  }
};
