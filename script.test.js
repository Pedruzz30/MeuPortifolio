const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Contact form', () => {
  let dom;
  let document;
  let form;

  beforeEach(() => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    document = dom.window.document;

    global.window = dom.window;
    global.document = document;

    // Stub external libs used in script.js
    global.gsap = {
      registerPlugin: jest.fn(),
      utils: { toArray: jest.fn(() => []) },
      from: jest.fn(),
      fromTo: jest.fn()
    };
    global.ScrollTrigger = {};
    global.VanillaTilt = { init: jest.fn() };

    require('./script');

    form = document.getElementById('contact-form');
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetModules();
    dom.window.close();
    delete global.window;
    delete global.document;
  });

  test('submitting shows success alert and resets the form', async () => {
    const resetSpy = jest.spyOn(form, 'reset');
    const submitEvent = new dom.window.Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(submitEvent);

    await Promise.resolve();
    jest.advanceTimersByTime(1500);
    await Promise.resolve();

    const alert = form.querySelector('.form-alert.success');
    expect(alert).not.toBeNull();
    expect(resetSpy).toHaveBeenCalled();
  });
});