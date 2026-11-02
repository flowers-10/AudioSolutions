// Local generated-artifact verification. This does not launch a browser.
const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;
const htmlPath = path.resolve(process.argv[2]);
const html = fs.readFileSync(htmlPath, 'utf8');
const reportText = html.match(/<script id="comparison-data" type="application\/json">([\s\S]*?)<\/script>/)[1];
const report = JSON.parse(reportText);
const nodes = new Map();
const requestedImages = [];
class Element {
  constructor(tag = 'div') { this.tagName = tag; this.children = []; this.style = {}; this.handlers = {}; this.hidden = false; this.value = ''; this.textContent = ''; }
  set src(value) {
    // Browsers request an image when src changes even if its element is hidden.
    requestedImages.push(value);
    assert(fs.existsSync(path.join(path.dirname(htmlPath), value)), `Missing requested image ${value}`);
    this._src = value;
  }
  get src() { return this._src; }
  append(...elements) { this.children.push(...elements); if (this.tagName === 'select' && !this.value) this.value = elements[0].value; }
  addEventListener(event, handler) { this.handlers[event] = handler; }
}
for (const match of html.matchAll(/<([a-z][\w-]*)\b[^>]*\bid="([^"]+)"[^>]*>/g)) nodes.set(match[2], new Element(match[1]));
nodes.get('comparison-data').textContent = reportText;
nodes.get('pass-select').value = 'pbr';
nodes.get('layout-select').value = 'pair';
const document = { getElementById: id => { assert(nodes.has(id), `Unknown element ${id}`); return nodes.get(id); }, createElement: tag => new Element(tag) };
const script = html.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
const run = new Function('document', script + '\nreturn { update, data };');
const { update, data } = run(document);
assert.equal(data.geometry.views && Object.keys(data.geometry.views).length, 9);
assert.equal(nodes.get('view-select').children.length, 9);
assert.equal(nodes.get('metrics-body').children.length, 9);
assert.equal(nodes.get('details').children.length, data.details.length);
assert.equal(nodes.get('pair').hidden, false);
assert.equal(nodes.get('overlay').hidden, true);
nodes.get('layout-select').value = 'overlay'; update();
assert.equal(nodes.get('pair').hidden, true);
assert.equal(nodes.get('overlay').hidden, false);
nodes.get('wipe').handlers.input({ target: { value: '73' } });
assert.equal(nodes.get('overlay-new').style.clipPath, 'inset(0 0 0 73%)');
assert.equal(nodes.get('split').style.left, '73%');
for (const view of Object.keys(data.geometry.views)) {
  nodes.get('view-select').value = view;
  for (const pass of ['pbr', 'difference', 'mask', 'difference', 'pbr']) {
    nodes.get('pass-select').value = pass; update();
    const ids = pass === 'difference' ? ['difference-image'] : ['source-image', 'candidate-image'];
    for (const id of ids) assert(fs.existsSync(path.join(path.dirname(htmlPath), nodes.get(id).src)), `Missing ${nodes.get(id).src}`);
    if (pass === 'difference') {
      assert.equal(nodes.get('layout-select').disabled, true);
      for (const id of ['source-image', 'candidate-image', 'overlay-source', 'overlay-new']) assert(!nodes.get(id).src.includes('__difference'), `Hidden image ${id} requested an invalid per-model difference render`);
    }
  }
}
for (const detail of report.details) assert(fs.existsSync(path.join(path.dirname(htmlPath), 'fidelity/details', detail.file)));
for (const file of ['metrics.json', 'appearance-metrics.json', 'report.json']) assert(fs.existsSync(path.join(path.dirname(htmlPath), 'fidelity', file)));
for (const match of html.matchAll(/href="(fidelity\/[^"#]+)"/g)) assert(fs.existsSync(path.join(path.dirname(htmlPath), match[1])), `Missing report link ${match[1]}`);
if (report.artifact) {
  assert(/^[a-f0-9]{64}$/.test(report.artifact.source_sha256));
  assert(/^[a-f0-9]{64}$/.test(report.artifact.candidate_sha256));
  assert.equal(report.geometry.artifact.candidate_sha256, report.artifact.candidate_sha256);
}
console.log(`PASS: inline report, ${Object.keys(report.geometry.views).length} views, ${report.details.length} detail pairs, every image request including hidden images (${requestedImages.length} assignments), report links, side-by-side/overlay/difference modes, and divider interaction.`);
