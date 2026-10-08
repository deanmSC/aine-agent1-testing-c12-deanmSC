// Visual testing script for Project Planner
// Captures screenshots at 390px, 768px, and 1100px widths

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const widths = [390, 768, 1100];
const screens = ['projects-list', 'project-detail'];
const states = ['default', 'empty', 'loading', 'error'];

async function captureScreenshots() {
  // Create screenshots directory if it doesn't exist
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const indexPath = path.join(__dirname, '..', 'index.html');
  const fileUrl = 'file://' + indexPath;

  console.log('Starting visual tests...');
  console.log('Testing at widths:', widths.join('px, ') + 'px');
  console.log('');

  for (const width of widths) {
    console.log(`Testing at ${width}px width:`);
    
    await page.setViewportSize({ width, height: 800 });

    for (const screen of screens) {
      for (const state of states) {
        const url = `${fileUrl}?state=${state}`;
        await page.goto(url);
        
        // Wait for page to load
        await page.waitForTimeout(500);
        
        // Show the correct screen
        await page.evaluate((screenId) => {
          const screens = document.querySelectorAll('[data-studio-screen]');
          screens.forEach(s => {
            s.style.display = s.getAttribute('data-studio-screen') === screenId ? 'block' : 'none';
          });
        }, screen);
        
        await page.waitForTimeout(300);
        
        const filename = `${screen}-${state}-${width}px.png`;
        const filepath = path.join(screenshotsDir, filename);
        
        await page.screenshot({ 
          path: filepath,
          fullPage: true
        });
        
        console.log(`  ✓ ${filename}`);
      }
    }
    console.log('');
  }

  await browser.close();
  console.log('Visual tests complete!');
  console.log(`Screenshots saved to: ${screenshotsDir}`);
}

captureScreenshots().catch(error => {
  console.error('Error during visual testing:', error);
  process.exit(1);
});
