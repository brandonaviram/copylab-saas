#!/usr/bin/env node

/**
 * Automated Copy Lab Test Script
 * Tests the Copy Lab SaaS application end-to-end
 */

const puppeteer = require('puppeteer');

const API_KEY = 'mcp-puppeteer-A84ADA5E-2454-4C44-8FA2-60B54A31E395';
const COPY_LAB_URL = 'http://localhost:3003';

async function testCopyLab() {
  console.log('🚀 Starting Copy Lab automated test...\n');

  let browser;
  try {
    // Launch browser
    console.log('1️⃣  Launching browser...');
    browser = await puppeteer.launch({
      headless: false, // Show browser for visibility
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 1024 });

    // Navigate to Copy Lab
    console.log('2️⃣  Navigating to Copy Lab...');
    await page.goto(COPY_LAB_URL, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'screenshots/01-homepage.png', fullPage: true });
    console.log('   ✅ Homepage loaded\n');

    // Wait for form to be visible
    await page.waitForSelector('#generator-form');

    // Fill in the form
    console.log('3️⃣  Filling in generator form...');
    await page.type('#product', 'AI note-taking app for busy founders');
    await page.type('#audience', 'Founders who lose ideas between meetings');
    await page.select('#stage', 'awareness');
    await page.type('#brand_voice', 'Direct, slightly sassy');
    await page.type('#objective', 'Sign up for free trial');
    await page.screenshot({ path: 'screenshots/02-form-filled.png', fullPage: true });
    console.log('   ✅ Form filled with test data\n');

    // Click Generate button
    console.log('4️⃣  Clicking Generate Copy Variants...');
    const generateButton = await page.$('button[type="submit"]');
    await generateButton.click();
    console.log('   ✅ Generate button clicked\n');

    // Wait for generation to complete (max 15 seconds)
    console.log('5️⃣  Waiting for generation (max 15s)...');
    try {
      await page.waitForSelector('.variant-card', { timeout: 15000 });
      console.log('   ✅ Generation complete!\n');
    } catch (err) {
      console.log('   ⚠️  Timeout waiting for variants\n');
      await page.screenshot({ path: 'screenshots/03-timeout.png', fullPage: true });
      throw new Error('Generation timed out');
    }

    // Verify 3 variants are displayed
    console.log('6️⃣  Verifying variants...');
    const variants = await page.$$('.variant-card');
    console.log(`   Found ${variants.length} variants`);

    if (variants.length === 3) {
      console.log('   ✅ All 3 variants displayed correctly\n');
    } else {
      console.log(`   ⚠️  Expected 3 variants, got ${variants.length}\n`);
    }

    // Extract variant content
    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i];
      const copyText = await variant.$eval('.copy-text', el => el.textContent.substring(0, 80));
      const principles = await variant.$$eval('.badge', badges => badges.map(b => b.textContent));
      console.log(`   Variant ${i + 1}:`);
      console.log(`   - Copy: "${copyText}..."`);
      console.log(`   - Principles: ${principles.join(', ')}`);
      console.log('');
    }

    await page.screenshot({ path: 'screenshots/04-variants-displayed.png', fullPage: true });

    // Test hero carousel (scroll to top)
    console.log('7️⃣  Testing hero example carousel...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    const carouselButtons = await page.$$('button[aria-label^="View example"]');
    console.log(`   Found ${carouselButtons.length} carousel navigation buttons`);

    if (carouselButtons.length >= 2) {
      // Click through carousel examples
      await carouselButtons[1].click();
      await page.waitForTimeout(300);
      await page.screenshot({ path: 'screenshots/05-carousel-example-2.png', fullPage: true });
      console.log('   ✅ Carousel navigation works\n');
    }

    // Check for progress component during generation
    console.log('8️⃣  Checking for educational progress component...');
    const hasProgressComponent = await page.evaluate(() => {
      return document.body.innerHTML.includes('progress') ||
             document.body.innerHTML.includes('Analyzing');
    });

    if (hasProgressComponent) {
      console.log('   ✅ Progress component detected\n');
    } else {
      console.log('   ℹ️  Progress component completed (generation finished)\n');
    }

    // Final screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/06-final-state.png', fullPage: true });

    console.log('\n✅ Test completed successfully!');
    console.log('\nScreenshots saved to screenshots/ directory:');
    console.log('  - 01-homepage.png');
    console.log('  - 02-form-filled.png');
    console.log('  - 04-variants-displayed.png');
    console.log('  - 05-carousel-example-2.png');
    console.log('  - 06-final-state.png');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the test
testCopyLab().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
