#!/usr/bin/env node
// Static site generator for Number 8 AI. No dependencies.
// Usage: node build.js   -> writes the site into ./public
const fs=require('fs'),path=require('path');
const ROOT=__dirname,OUT=path.join(ROOT,'public');
const site=JSON.parse(fs.readFileSync(path.join(ROOT,'data/site.json'),'utf8'));
const cats=JSON.parse(fs.readFileSync(path.join(ROOT,'data/categories.json'),'utf8'));
const tools=JSON.parse(fs.readFileSync(path.join(ROOT,'data/tools.json'),'utf8'));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const catBy=Object.fromEntries(cats.map(c=>[c.slug,c]));
for(const t of tools){if(!catBy[t.category])throw new Error(`Unknown category ${t.category} for ${t.id}`);if(!/^https:\/\//.test(t.url))throw new Error(`Bad url for ${t.id}`);}
const nzCount=tools.filter(t=>t.nzMade).length;
const abs=p=>site.baseUrl.replace(/\/$/,'')+p;
const B=new URL(site.baseUrl).pathname.replace(/\/$/,''); // e.g. /number8ai
const L=p=>(p&&p.startsWith('/'))?B+p:p;
const utm=u=>{try{const x=new URL(u);x.searchParams.set('ref','number8ai');return x.toString();}catch{return u}};

function layout({title,description,pathName,body,jsonld=[],active=''}){
  const full=title?`${title} | ${site.name}`:`${site.name} — ${site.tagline}`;
  const nav=[['/','Directory'],['/about/','About'],['/submit/','Submit a tool'],['/sponsor/','Sponsor us']];
  return `<!doctype html>
<html lang="en-NZ">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${abs(pathName)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${abs(pathName)}">
<meta property="og:image" content="${abs('/assets/og.png')}">
<meta property="og:locale" content="${site.locale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(full)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs('/assets/og.png')}">
<meta name="theme-color" content="#0f766e">
<link rel="icon" href="${B}/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${B}/assets/styles.css">
${jsonld.map(j=>`<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site"><div class="wrap">
<a class="logo" href="${B}/"><span class="mark">8</span>${esc(site.name)}</a>
<button class="menu-btn" aria-label="Menu" aria-expanded="false">☰</button>
<nav class="main">${nav.map(([h,l])=>`<a href="${B}${h}"${active===h?' aria-current="page"':''}${h==='/sponsor/'?' class="cta"':''}>${l}</a>`).join('')}</nav>
</div></header>
<main id="main">${body}</main>
<footer class="site"><div class="wrap">
<div><strong>${esc(site.name)}</strong> — ${esc(site.tagline)}.<br>Made in Aotearoa New Zealand. Last updated ${esc(site.lastUpdated)}.</div>
<div><a href="${B}/about/">About</a> · <a href="${B}/submit/">Submit a tool</a> · <a href="${B}/sponsor/">Sponsor</a> · <a href="${B}/llms.txt">llms.txt</a> · <a href="mailto:${esc(site.contactEmail)}">${esc(site.contactEmail)}</a></div>
</div></footer>
<script src="${B}/assets/app.js" defer></script>
</body></html>`;
}

const card=t=>{const c=catBy[t.category];const search=[t.name,t.description,c.name,t.nzNotes,t.pricing].join(' ').toLowerCase();
return `<article class="card" data-cat="${t.category}" data-nz="${t.nzMade?1:0}" data-search="${esc(search)}" id="${esc(t.id)}">
<h3><a href="${esc(utm(t.url))}" target="_blank" rel="noopener">${esc(t.name)}</a>${t.nzMade?'<span class="badge nz" title="NZ-made">🥝 NZ-made</span>':''}<span class="badge">${esc(c.name)}</span></h3>
<p>${esc(t.description)}</p>
${t.nzNotes?`<div class="nznote"><strong>NZ notes:</strong> ${esc(t.nzNotes)}</div>`:''}
<div class="meta"><span><strong>Pricing:</strong> ${esc(t.pricing)}</span><a class="visit" href="${esc(utm(t.url))}" target="_blank" rel="noopener">Visit ${esc(t.name)} →</a></div>
</article>`;};

const featured=()=>{const f=site.featured;if(!f||!f.enabled)return '';
return `<aside class="featured" aria-label="Featured sponsor">
<div><div class="label">⭐ Featured / Sponsored</div><h2>${esc(f.name)}</h2><p>${esc(f.description)}</p></div>
<a class="btn alt" href="${esc(L(f.url))}"${f.placeholder?'':' rel="sponsored noopener" target="_blank"'}>${esc(f.cta)}</a></aside>`;};

const newsletter=()=>`<section class="newsletter" id="newsletter" aria-labelledby="nl-h">
<div><h2 id="nl-h">One useful AI tool a week. Two-minute read.</h2><p>Practical picks for Kiwi small business owners — what it does, what it costs, and whether it plays nicely with Xero. No hype, unsubscribe any time.</p></div>
<form data-newsletter action="#" method="post"><label class="skip" for="nl-email">Email address</label>
<input id="nl-email" type="email" name="email" placeholder="you@yourbusiness.co.nz" required autocomplete="email">
<button class="btn" type="submit">Subscribe</button><div class="note">Sign-ups launching soon.</div></form>
</section>`;

const sections=cats.map(c=>{const list=tools.filter(t=>t.category===c.slug);if(!list.length)return '';
return `<section class="cat-block" id="cat-${c.slug}"><div class="section-title"><h2>${c.icon} ${esc(c.name)}</h2><a href="${B}/category/${c.slug}/">View all ${list.length} →</a></div><p>${esc(c.blurb)}</p><div class="grid">${list.map(card).join('')}</div></section>`;}).join('');

const orgLd={"@context":"https://schema.org","@type":"Organization","name":site.name,"url":site.baseUrl,"email":site.contactEmail,"contactPoint":{"@type":"ContactPoint","email":site.contactEmail,"contactType":"customer support","areaServed":"NZ"},"areaServed":"NZ"};
const webLd={"@context":"https://schema.org","@type":"WebSite","name":site.name,"url":site.baseUrl,"description":site.description,"inLanguage":"en-NZ","potentialAction":{"@type":"SearchAction","target":abs('/?q={search_term_string}'),"query-input":"required name=search_term_string"}};
const listLd=(list,name)=>({"@context":"https://schema.org","@type":"ItemList","name":name,"numberOfItems":list.length,"itemListElement":list.map((t,i)=>({"@type":"ListItem","position":i+1,"item":{"@type":"SoftwareApplication","name":t.name,"url":t.url,"description":t.description,"applicationCategory":"BusinessApplication","operatingSystem":"Web"}}))});

const pages={};
pages['index.html']=layout({title:'',description:site.description,pathName:'/',active:'/',jsonld:[orgLd,webLd,listLd(tools,'AI tools for NZ small businesses')],body:`
<div class="wrap">
<section class="hero"><span class="eyebrow">🥝 Built for Aotearoa's small businesses</span>
<h1>Find the AI tools that actually save Kiwi businesses time</h1>
<p class="lead">A hand-checked directory of ${tools.length} AI tools for NZ sole traders, tradies, cafés, retailers and service businesses — with plain-English descriptions, pricing notes and the ones that work with Xero. No hype, no jargon.</p>
<div class="stats"><span><b>${tools.length}</b> tools</span><span><b>${cats.length}</b> categories</span><span><b>${nzCount}</b> NZ-made</span><span>Checked <b>${esc(site.lastUpdated)}</b></span></div>
</section>
${featured()}
<div class="controls">
<div class="search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
<label class="skip" for="q">Search tools</label><input id="q" type="search" placeholder="Search e.g. “quotes”, “Xero”, “receptionist”, “Shopify”…" autocomplete="off"></div>
<div class="chips" role="toolbar" aria-label="Filter by category"><button class="chip" data-filter="all" aria-pressed="true">All</button>${cats.map(c=>`<button class="chip" data-filter="${c.slug}" aria-pressed="false">${c.icon} ${esc(c.name)}</button>`).join('')}</div>
<label class="toggle"><input type="checkbox" id="nzonly"> Show NZ-made tools only</label>
<p class="toggle">Showing <b id="count">${tools.length}</b> tools</p>
</div>
${sections}
<p class="empty">No tools match that search yet. <a href="${B}/submit/">Suggest one?</a></p>
${newsletter()}
<p class="disclaimer">Pricing notes are as shown on each provider's website when we last checked (${esc(site.lastUpdated)}) and can change — always confirm on their site. Prices may be in USD or exclude GST. “NZ-made” means the company was founded in or is based in New Zealand. Listings are editorial; sponsored placements are always labelled.</p>
</div>`});

for(const c of cats){const list=tools.filter(t=>t.category===c.slug);
pages[`category/${c.slug}/index.html`]=layout({title:`${c.name} AI tools for NZ small businesses`,description:`${list.length} AI tools for ${c.name.toLowerCase()} for New Zealand small businesses. ${c.blurb}`,pathName:`/category/${c.slug}/`,jsonld:[orgLd,listLd(list,`${c.name} AI tools for NZ small businesses`),{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Directory","item":abs('/')},{"@type":"ListItem","position":2,"name":c.name,"item":abs(`/category/${c.slug}/`)}]}],body:`
<div class="wrap"><section class="page" style="max-width:none"><p><a href="${B}/">← All categories</a></p><h1>${c.icon} ${esc(c.name)}</h1><p class="lead">${esc(c.blurb)}</p></section>
${featured()}<div class="grid">${list.map(card).join('')}</div>
<div class="chips" style="margin-top:28px">${cats.filter(x=>x.slug!==c.slug).map(x=>`<a class="chip" href="${B}/category/${x.slug}/">${x.icon} ${esc(x.name)}</a>`).join('')}</div>
${newsletter()}</div>`});}

pages['sponsor/index.html']=layout({title:'Sponsor us — reach Kiwi small business owners',description:`Put your product in front of New Zealand small business owners looking for AI tools. Featured listings, newsletter sponsorships and category spots on ${site.name}.`,pathName:'/sponsor/',active:'/sponsor/',jsonld:[orgLd],body:`
<div class="wrap"><section class="page" style="max-width:960px">
<h1>Sponsor ${esc(site.name)}</h1>
<p class="lead">Our readers are NZ business owners actively looking for software to save time — sole traders, tradies, hospo, retail and professional services. Sponsorship gets your tool in front of them at the moment they're choosing.</p>
<p class="notice"><span class="placeholder-tag">PLACEHOLDER PRICES</span> The prices below are suggested starting points only and haven't been confirmed yet. Get in touch for current rates and availability.</p>
<div class="packages">
<div class="pkg"><h3>Featured spot</h3><div class="price">NZ$149 <small>/ week — suggested, TBC</small></div><ul><li>Top-of-homepage “Featured” slot</li><li>Shown on every category page</li><li>One sponsor at a time</li><li>Clearly labelled as sponsored</li></ul></div>
<div class="pkg"><h3>Newsletter sponsor</h3><div class="price">NZ$99 <small>/ issue — suggested, TBC</small></div><ul><li>Top placement in our weekly email</li><li>Short write-up + link</li><li>Clearly labelled as sponsored</li></ul></div>
<div class="pkg"><h3>Category sponsor</h3><div class="price">NZ$79 <small>/ month — suggested, TBC</small></div><ul><li>Pinned at the top of one category (e.g. Tradies)</li><li>“Sponsored” badge</li><li>Great for niche tools</li></ul></div>
<div class="pkg"><h3>Founding sponsor bundle</h3><div class="price">NZ$399 <small>/ month — suggested, TBC</small></div><ul><li>Featured spot for 1 week each month</li><li>2 newsletter mentions</li><li>1 category sponsorship</li></ul></div>
</div>
<h2>How it works</h2>
<ol><li>Email us with your tool, the package you're interested in and preferred dates.</li><li>We check the tool is a good fit for NZ small businesses (we only promote real, working products).</li><li>You approve the copy, we schedule it, and it goes live.</li></ol>
<p>Sponsorship never changes our editorial listings, and every paid placement is clearly labelled.</p>
<p class="notice"><strong>Sponsorship enquiries:</strong> <a href="mailto:${esc(site.contactEmail)}?subject=Sponsorship%20enquiry">${esc(site.contactEmail)}</a></p>
<p><a class="btn" href="mailto:${esc(site.contactEmail)}?subject=Sponsorship%20enquiry">Email us about sponsorship</a></p>
</section></div>`});

pages['submit/index.html']=layout({title:'Submit an AI tool',description:`Know an AI tool that helps New Zealand small businesses? Submit it to ${site.name} — NZ-made tools especially welcome.`,pathName:'/submit/',active:'/submit/',jsonld:[orgLd],body:`
<div class="wrap"><section class="page">
<h1>Submit a tool</h1>
<p class="lead">Built an AI tool, or love one that saves your business time? Tell us about it. NZ-made tools and anything that plays nicely with Xero, NZ GST or local payment providers are especially welcome.</p>
<p class="notice">Listings are free and editorial — we check every tool before it goes live. Want guaranteed placement? See <a href="${B}/sponsor/">sponsorship options</a>.</p>
<div class="stack" style="display:block">
<h2 style="margin-top:0">Email us your tool</h2>
<p>Our online form isn't connected yet, so for now please email tool submissions to <a href="mailto:${esc(site.contactEmail)}?subject=Tool%20submission">${esc(site.contactEmail)}</a>.</p>
<p>Include:</p>
<ul><li>Tool name and website</li><li>Which category it fits (${cats.map(c=>esc(c.name)).join(', ')})</li><li>What it does, in one or two sentences</li><li>Pricing (free plan / starting price)</li><li>Anything NZ-specific — NZ-made, Xero integration, NZ GST support, NZ data hosting</li></ul>
<p><a class="btn" href="mailto:${esc(site.contactEmail)}?subject=Tool%20submission">Email a tool submission</a></p>
</div>

</section></div>`});

pages['about/index.html']=layout({title:'About',description:`${site.name} is an independent directory of AI tools for New Zealand small businesses — plain-English, checked, and Kiwi-focused.`,pathName:'/about/',active:'/about/',jsonld:[orgLd,{"@context":"https://schema.org","@type":"AboutPage","name":`About ${site.name}`,"url":abs('/about/')}],body:`
<div class="wrap"><section class="page">
<h1>About ${esc(site.name)}</h1>
<p class="lead">Kiwis have always been good at making do with number 8 wire. ${esc(site.name)} is about doing the same with AI: finding the practical tools that save a small business real hours, without the hype.</p>
<h2>Why we built it</h2>
<p>There are thousands of AI tools out there and most lists are written for Silicon Valley start-ups. We wanted one for the sparky in Hamilton, the café in Dunedin and the online store run from a spare room in Tauranga — what the tool does, roughly what it costs, and whether it works with the software NZ businesses already use, like Xero.</p>
<h2>How we choose tools</h2>
<ul><li>Every tool is a real product with a working website, checked on ${esc(site.lastUpdated)}.</li>
<li>Pricing notes come from the provider's own site. If we couldn't confirm it, we say “See site”.</li>
<li>“NZ-made” and other NZ notes are only added where we could verify them.</li>
<li>We highlight NZ-made tools wherever good ones exist.</li>
<li>Sponsored placements are always clearly labelled and never change editorial listings.</li></ul>
<h2>Get in touch</h2>
<p>Spotted something out of date, or want to suggest a tool? <a href="${B}/submit/">submit it here</a> or email <a href="mailto:${esc(site.contactEmail)}">${esc(site.contactEmail)}</a>.</p>
${newsletter()}
</section></div>`});

// Write pages
fs.rmSync(OUT,{recursive:true,force:true});
for(const [p,html] of Object.entries(pages)){const f=path.join(OUT,p);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,html);}
fs.cpSync(path.join(ROOT,'assets'),path.join(OUT,'assets'),{recursive:true});
fs.writeFileSync(path.join(OUT,'tools.json'),JSON.stringify({updated:site.lastUpdated,categories:cats,tools},null,2));
// SEO files
const urls=Object.keys(pages).map(p=>'/'+p.replace(/index\.html$/,''));
fs.writeFileSync(path.join(OUT,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${abs(u)}</loc><lastmod>${site.lastUpdated}</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(OUT,'robots.txt'),`User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);
const llms=[`# ${site.name}`,'',`> ${site.description}`,'',`Website: ${site.baseUrl}`,`Last updated: ${site.lastUpdated}`,`Machine-readable data: ${abs('/tools.json')}`,'',
'Notes: Pricing is as shown on each provider\'s site when checked and may be in USD or exclude GST; "See site" means unverified. "NZ-made" means founded in or based in New Zealand.','',
'## Pages',`- [Directory](${abs('/')}): all tools with search and category filter`,`- [Sponsor us](${abs('/sponsor/')})`,`- [Submit a tool](${abs('/submit/')})`,`- [About](${abs('/about/')})`,'',
...cats.flatMap(c=>{const l=tools.filter(t=>t.category===c.slug);return [`## ${c.name}`,`Category page: ${abs(`/category/${c.slug}/`)}`,...l.map(t=>`- [${t.name}](${t.url}): ${t.description} Pricing: ${t.pricing}${t.nzNotes?` NZ notes: ${t.nzNotes}`:''}`),''];})].join('\n');
fs.writeFileSync(path.join(OUT,'llms.txt'),llms);
fs.writeFileSync(path.join(OUT,'.nojekyll'),'');
console.log(`Built ${Object.keys(pages).length} pages, ${tools.length} tools, ${cats.length} categories, ${nzCount} NZ-made -> ${OUT}`);
