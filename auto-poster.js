const { chromium } = require('playwright');
const axios = require('axios');
const FormData = require('form-data');

// Facebook Configuration from GitHub Secrets & Environment Variables
const PAGE_ID = process.env.FB_PAGE_ID || 'YOUR_FACEBOOK_PAGE_ID';
const ACCESS_TOKEN = process.env.FB_PAGE_TOKEN;

const rasiList = [
  { name: "Mesha", te: "మేషం", enText: "🌙 Moon in 3rd — courage and short travel help.", teText: "🌙 చంద్రుడు 3వ భావంలో — ధైర్యం, చిన్న ప్రయాణాలు సాయపడతాయి." },
  { name: "Vrishabha", te: "వృషభం", enText: "🌙 Moon in 2nd — speech brings gains.", teText: "🌙 చంద్రుడు 2వ భావంలో — మాట ద్వారా లాభం." },
  { name: "Mithuna", te: "మిథునం", enText: "🌙 Moon in 1st — personal focus and high energy.", teText: "🌙 చంద్రుడు 1వ భావంలో — వ్యక్తిగత ఉత్సాహం పెరుగుతుంది." },
  { name: "Karkataka", te: "కర్కాటకం", enText: "🌙 Moon in 12th — rest and introspection needed.", teText: "🌙 చంద్రుడు 12వ భావంలో — విశ్రాంతి అవసరం." },
  { name: "Simha", te: "సింహం", enText: "🌙 Moon in 11th — gains through networks and friends.", teText: "🌙 చంద్రుడు 11వ భావంలో — స్నేహితుల ద్వారా లాభాలు." },
  { name: "Kanya", te: "కన్య", enText: "🌙 Moon in 10th — career focus and public recognition.", teText: "🌙 చంద్రుడు 10వ భావంలో — వృత్తిపరమైన గుర్తింపు." },
  { name: "Tula", te: "తుల", enText: "🌙 Moon in 9th — long journeys and higher learning.", teText: "🌙 చంద్రుడు 9వ భావంలో — దూర ప్రయాణాలు, ఆధ్యాత్మికత." },
  { name: "Vrischika", te: "వృశ్చికం", enText: "🌙 Moon in 8th — deal with sudden changes calmly.", teText: "🌙 చంద్రుడు 8వ భావంలో — అకస్మిక మార్పులను ప్రశాంతంగా స్వీకరించండి." },
  { name: "Dhanu", te: "ధనుస్సు", enText: "🌙 Moon in 7th — partnerships and client relations.", teText: "🌙 చంద్రుడు 7వ భావంలో — భాగస్వామ్య వ్యాపారాలు లాభసాటిగా ఉంటాయి." },
  { name: "Makara", te: "మకరం", enText: "🌙 Moon in 6th — overcoming obstacles with discipline.", teText: "🌙 చంద్రుడు 6వ భావంలో — శ్రమతో అడ్డంకులు దాటవచ్చు." },
  { name: "Kumbha", te: "కుంభం", enText: "🌙 Moon in 5th — intellect and speculative gains.", teText: "🌙 చంద్రుడు 5వ భావంలో — సృజనాత్మక ఆలోచనలు, లాభాలు." },
  { name: "Meena", te: "మీనం", enText: "🌙 Moon in 4th — home comfort and emotional peace.", teText: "🌙 చంద్రుడు 4వ భావంలో — గృహంలో ప్రశాంతత." }
];

async function generateAndPost() {
  console.log("Launching browser for daily card generation...");
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1200, height: 630 } });
  
  for (const rasi of rasiList) {
    const page = await context.newPage();
    await page.setContent(`
      <html>
        <head>
          <style>
            body { background: #090d16; color: #f8fafc; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { width: 1000px; padding: 50px; background: #0f172a; border: 2px solid rgba(245, 158, 11, 0.4); border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
            h1 { color: #f59e0b; font-size: 36px; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; }
            p { font-size: 22px; line-height: 1.6; margin-bottom: 15px; }
            .footer { margin-top: 30px; font-size: 16px; color: #94a3b8; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>${rasi.name} | ${rasi.te} · Daily Rashifal</h1>
            <p><strong>English:</strong> ${rasi.enText}</p>
            <p><strong>తెలుగు:</strong> ${rasi.teText}</p>
            <div class="footer">Scientific Astro · scientificastro.in</div>
          </div>
        </body>
      </html>
    `);

    // Render high-res screenshot as an image buffer
    const imageBuffer = await page.screenshot({ type: 'png' });
    await page.close();
    console.log(`Generated card image for ${rasi.name}`);

    // Publish to Facebook
    await postToFacebook(rasi, imageBuffer);
  }

  await browser.close();
  console.log("All 12 Rasi cards generated and posted to Facebook successfully!");
}

async function postToFacebook(rasi, imageBuffer) {
  if (!ACCESS_TOKEN || ACCESS_TOKEN === 'YOUR_PAGE_ACCESS_TOKEN') {
    console.log(`[Dry Run] Skipping FB post for ${rasi.name} (Access Token not set).`);
    return;
  }

  try {
    const caption = `🌟 ${rasi.name} | ${rasi.te} · Daily Horoscope\n\n${rasi.enText}\n\n${rasi.teText}\n\n🌐 Visit: https://scientificastro.in\n\n#ScientificAstro #Rashifal #TeluguHoroscope #${rasi.name}`;

    const form = new FormData();
    form.append('access_token', ACCESS_TOKEN);
    form.append('caption', caption);
    form.append('source', imageBuffer, { filename: `${rasi.name.toLowerCase()}-horoscope.png`, contentType: 'image/png' });

    const response = await axios.post(`https://graph.facebook.com/v18.0/${PAGE_ID}/photos`, form, {
      headers: { ...form.getHeaders() }
    });

    console.log(`Successfully posted ${rasi.name} to Facebook! Post ID: ${response.data.id}`);
  } catch (error) {
    console.error(`Failed to post ${rasi.name} to Facebook:`, error.response?.data || error.message);
  }
}

generateAndPost().catch(err => {
  console.error("Error in auto-poster:", err);
  process.exit(1);
});
