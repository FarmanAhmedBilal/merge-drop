/* Sponsor ad slots for the Merge Drop arcade.
   Every page with <div id="adSlot"></div> gets a slim banner filled from
   ads.json, sitting next to this script tag with a data-context of
   "hub" or "game".

   ads.json schema (owner-controlled, no code changes needed):
   {
     "ads": [                                  // real advertisers
       { "img": "ad.png",                      // optional thumb/wide image
         "text": "Acme Widgets — 50% off",     // headline line
         "sub":  "acme.example",               // optional second line
         "url":  "https://acme.example",       // click target (opens new tab)
         "weight": 3,                          // optional rotation weight, default 1
         "html": "<ins class=\"adsbygoogle\" ...></ins>"   // optional raw network snippet
       }
     ],
     "house": {                                // fallback while ads list is empty
       "hub":  { "text": "...", "sub": "...", "url": "" },
       "game": { "text": "...", "sub": "...", "url": "./" }
     }
   }

   To switch to a third-party network later (AdSense etc.): put the
   network's snippet into an entry's "html" field — a one-file change.
   Any entry with "html" replaces the whole banner with that markup. */
(function(){
  var slot = document.getElementById('adSlot');
  if(!slot) return;
  var ctx = 'game';
  try{ ctx = document.currentScript.getAttribute('data-context') || 'game'; }catch(e){}

  var css = document.createElement('style');
  css.textContent =
    '.adSlot{margin:14px 0 0;border:1px solid var(--line,#22303e);background:var(--surface2,#1a2430);' +
    'border-radius:12px;padding:8px 12px;display:flex;align-items:center;min-height:52px;}' +
    '.adlink{display:flex;align-items:center;gap:10px;flex:1;min-width:0;text-decoration:none;color:inherit;}' +
    '.adlink:hover .adt{color:var(--accent,#2dd4bf);}' +
    '.adSlot img{width:36px;height:36px;border-radius:8px;object-fit:cover;flex:0 0 auto;}' +
    '.adtx{flex:1;min-width:0;}' +
    '.adt{display:block;font-size:12.5px;font-weight:800;color:var(--text,#e6edf3);line-height:1.25;}' +
    '.ads2{display:block;font-size:11px;color:var(--dim,#8b9bab);line-height:1.35;margin-top:1px;}' +
    '.adtag{flex:0 0 auto;font-size:9px;font-weight:800;letter-spacing:.18em;color:var(--dim,#8b9bab);' +
    'border:1px solid var(--line,#22303e);border-radius:99px;padding:3px 7px;}';
  document.head.appendChild(css);

  function esc(s){
    return String(s).replace(/[&<>"]/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];
    });
  }
  function render(ad){
    slot.classList.add('adSlot');
    if(ad.html){ slot.innerHTML = ad.html; return; }
    var inner =
      (ad.img ? '<img src="' + esc(ad.img) + '" alt="">' : '') +
      '<span class="adtx"><span class="adt">' + esc(ad.text || '') + '</span>' +
      (ad.sub ? '<span class="ads2">' + esc(ad.sub) + '</span>' : '') + '</span>' +
      '<span class="adtag">SPONSOR</span>';
    if(ad.url){
      var a = document.createElement('a');
      a.className = 'adlink';
      a.href = ad.url; a.target = '_blank'; a.rel = 'noopener';
      a.innerHTML = inner;
      slot.appendChild(a);
    }else{
      slot.innerHTML = '<span class="adlink">' + inner + '</span>';
    }
  }
  function pick(list){
    var total = 0, i;
    for(i = 0; i < list.length; i++) total += (list[i].weight || 1);
    var r = Math.random() * total;
    for(i = 0; i < list.length; i++){
      r -= (list[i].weight || 1);
      if(r <= 0) return list[i];
    }
    return list[list.length - 1];
  }
  function renderHouse(h){
    render({
      text: (h && h.text) || 'SPONSOR SLOT',
      sub:  h && h.sub,
      url:  (h && h.url) || ''
    });
  }

  fetch('ads.json').then(function(r){ return r.json(); }).then(function(cfg){
    var list = (cfg && cfg.ads) || [];
    if(list.length) render(pick(list));
    else renderHouse(cfg && cfg.house && cfg.house[ctx]);
  }).catch(function(){
    renderHouse(ctx === 'hub'
      ? { text: 'SPONSOR SLOT OPEN', sub: 'Your brand here — one slim banner across the arcade.' }
      : { text: 'PLAYED ONE? PLAY THEM ALL', sub: 'Quick games for every kind of run', url: './' });
  });
})();
