import {test, expect} from '@playwright/test'

test("Learning Selectors", async({page})=>{
    //navigate to the webpage
    await page.goto("http://127.0.0.1:5500/clickMe.html");
    //1 select by ID. This is the best. 
    await page.getByRole('button', {id: 'clickButton'}).click();
    //await page.locator('#clickButton').click();
    //await page.pause();

    //2 selecting by class.
    await page.locator('.button-style').click();
    //await page.pause();

    //3 by tag and class
    //classes are used by different elements, you can add tags to narrow down the selection (tag then class or tag.class)
    await page.locator('button.button-style').click();

    //4 by attribute value
    await page.locator('[data-action="increment"]').click();
    await page.locator('[id="clickButton"]').click();
    await page.locator('[class="button-style"]').click();

    //5 parial attribute
    await page.locator('[role*="but"]').click();

    //6 by text content
    await page.locator('text=CLICK ME').click();

    //7 combine selectors for precision, class and text
    await page.locator('.button-style:text("CLICK ME")').click();

    //8 has text flexible, partial match, case insentive by default
    await page.locator('button:has-text("click m")').click();

    //9 attribute and text combination
    await page.locator('[data-action="increment"]:text("CLICK ME")').click();

    //10 playwright locators. (refer to playwright docs for all your things.)
    //lets do playwright getbytext
    await page.getByText('CLICK ME').click();
    //documentation will be useful in the long run. Make sure you have it readily available

    //11 getbyrole
    await page.getByRole('button', {name:/click me/i}).click();

    //assert the counter is at a certain number
    //codegen will not always grab the best most stable locator. Playwright for example would try to use getbyText on this one. That's not stable.
    await expect(page.locator('#counter')).toContainText('13');

    await page.pause();//not this is only helpful running in headed or debug to see a step actually happen. 

    //almost anything can be used with that format. You just need to decide what is best for your use case. I think best bet is going to be the get by role with the id. That seems prefered, most exact. 
})