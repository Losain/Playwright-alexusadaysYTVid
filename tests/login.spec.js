//we'll go over the lines of code from the previous lesson
//ctrl+click ==see where a thing is coming from
import {test, expect} from '@playwright/test'

test('Title of the test case @smoke @regression', async ({page})=>{
    // the => i think is a function notation I need to figure that out. 

    //this is the boiler plate for running tests. or writing tests. 

    //called "arror functions" inherit 'this' from the enclosing scope. good for recursion and stuff

    //async and await allows the elements of the site to load. 

    //used to have to managed a lot of syncronizing code for automation. this does it for you. 

    await page.goto('https://the-internet.herokuapp.com/login');
    await page.pause();
    await page.locator('#username').click();
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').click();
    await page.locator('#password').fill('SuperSecretPassword!');
    await page.getByRole('button', {name: /login/i}).click();
    await expect(page.locator('#flash')).toContainText(/you logged into a secure area!/i);
    await expect(page.locator('h4.subheader')).toContainText(/Welcome to the Secure Area. When you are done click logout below./i);
    await page.pause();
    await page.locator('a.button.secondary.radius:has-text("logout")').click();
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('11');
    await expect(page.getByLabel('Username')).toHaveValue('11');
    await page.pause();

    //playwright says to use their locators to make the test as resiliant tests are possible. 
    //element ID is second best. 

    //locate by CSS or XPATH. I need to learn more about xpath.

    //oof, long CSS or Long XPATH are the worst ways to get locators. I'm going to need to learn more about getting good locators SO FAST.

    //you can use console to find id's and things. 
    //look for label tags
    //you'll need to get used to looking at the DOM to properly prepare the POM. LOLOLOOLOOL

    //use regex to find buttons better. /login/i = login case insensitive

    //regex might show big brainness. 
    //can add class with a . example 'h4.subheader'
})