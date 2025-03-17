import {test, expect} from '@playwright/test'

test.describe("learn assertions", () =>{
    //describe is like a group of things.
    test("Verify Webpage Behavior", async({page})=>{
        await page.goto("https://the-internet.herokuapp.com/");
        //first assertion is to have url
        await expect(page).toHaveURL("https://the-internet.herokuapp.com/");
        await page.pause();
        //2. to have title (this is what shows in the tab section at the top of the web page)
        await expect(page).toHaveTitle("The Internet");
    })

    test("continue with assertions", async ({page})=>{
        //3. assert visibility
        //nav to page
        await page.goto("https://the-internet.herokuapp.com/");
        //see h1 is visible
        await expect(page.locator("h1")).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Welcome to the-internet' })).toBeVisible();
        

        //4.assert element to have text
        await expect(page.locator("h1")).toHaveText(/welcome to the/i);


        //5. assert contains the text
        //which is what i did in tes case 4. TESTING THE WHOLE BODY
        await expect(page.locator('body')).toContainText("WYSIWYG");

        //pause
        await page.pause();
    })

    test("assertions two", async({page})=>{
        await page.goto("https://the-internet.herokuapp.com/");

        //6. lets count the number of links
        await page.pause();
        await expect(page.locator('a')).toHaveCount(46);
        await page.pause();

        //7. elements to be checked
        await page.goto("https://the-internet.herokuapp.com/checkboxes");
        //can check or uncheck or check checked status

        await page.pause();//can use waitForTimeout(####)in ms. 
        //can also wait for load state. Wait until the whole network tab stops. 

        //let checkbox = page.getByRole('checkbox').nth(1)
        //await checkbox.waitFor();
        //This waits for the element to show on the page.

        await page.getByRole('checkbox').nth(0).check();
        await page.getByRole('checkbox').nth(1).uncheck();

        await expect(page.getByRole('checkbox').nth(0)).toBeChecked();
        await expect(page.getByRole('checkbox').nth(1)).not.toBeChecked();
        await page.pause()

        
    })

    test("login page assert @smoke", async({page})=>{
        await page.goto("https://the-internet.herokuapp.com/login");
        //interesting usage of the fill. Keep this to remem
        //await page.pause();

        //await page.fill('#username', 'tomsmith');
        await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
        //note I tried to use ID here and it could not resolve. 

        await expect(page.getByRole('textbox', { name: 'Username' })).toHaveValue('tomsmith');

        await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
        //await page.pause();

        //you can store data in variables for validation as well
        const headerText = await page.locator('h2').textContent();
        await expect(headerText).toBe("Login Page");

    })
})