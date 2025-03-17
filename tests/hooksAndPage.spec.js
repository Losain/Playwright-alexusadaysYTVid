import {test, expect} from '@playwright/test';
import { chromium } from 'playwright';
import { permission } from 'process';

let browser1;
let context1;
let page1;

test.beforeAll(async()=>{
    //launch chromium browser before all tests
    browser1 = await chromium.launch();
    console.log("BEFORE ALL HOOK LAUNCHED CHROMIUM BROWSER");
    
})

test.beforeEach(async()=>{
    //create context (context can be different for each test)
    context1 = await browser1.newContext();
    //create new page
    page1 = await context1.newPage();//this page is used for testing, so we can make changes. 
    //before each test can go to the same page. 
    await page1.goto('https://the-internet.herokuapp.com/');
    //a lot of thes are not auto completing. I don't like that. 
    console.log("BEFORE EACH HOOK LAUNCHED NEW PAGE");
    
    //give a lil pause
    //await page1.pause();
})

//need to tear things down otherwise everything is going to stay open. 

test.afterEach(async()=>{
    //just need to close the pages
    await page1.close();

    //close the context
    await context1.close();
    console.log("AFTER EACH HOOK CLOSE PAGE AND CONTEXT");
    
})

test.afterAll(async()=>{
    //close browser
    await browser1.close();
    console.log("AFTER ALL BROWSER CLOSED");
    
})

test("AB Testing", async()=>{
    //click on the AB testing link
    //await page1.pause();
    await page1.click('text="A/B Testing"');
    const header = await page1.textContent('h3');
    expect(header).toContain('A/B Test');
})

test("checkbox verification", async()=>{
    await page1.pause();
    await page1.click('text="Checkboxes"');
    //const checkbox = await page1.isChecked(getByRole('checkbox').nth(0));
    //interesting, for some reason getByRole() is not defined in this instance
    const checkbox = await page1.isChecked('input[type="checkbox"]:first-child')
    expect(checkbox).toBe(false);
})

test.only("Geolocation", async()=>{
    //we want a new context
    context1 = await browser1.newContext({
        //we want to do new specific settings for this context. 
        permission: ['geolocation'],
        geolocation:{latitude: 37.774929, longitude: -122.419416},
        viewport: {width:1280, height:720}
    });
    //create a new page
    page1 = await context1.newPage();
    console.log("USING NEW CONTEXT AND PAGE");
    
    //will need a new pause
    await page1.pause();
    //navigation is not going to happen because we are overriding the context. 
    await page1.goto('https://the-internet.herokuapp.com/geolocation');
    await page1.getByRole('button', { name: 'Where am I?' }).click();//doing this the long way because the short way wasn't working for me. 
    //in this test I was asked if I wanted to offer my location. Is there a way for playwright to always allow? 

    const lat = await page1.textContent('#lat-value');
    const long = await page1.textContent('#long-value')

    expect(parseFloat(lat)).toBeCloseTo(37.774929);
    expect(parseFloat(long)).toBeCloseTo(-122.419416);

})