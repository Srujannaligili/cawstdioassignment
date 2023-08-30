import { $ } from '@wdio/globals'
import Page from './page.js';

const user = [{ "name": "Bob", "age": 20, "gender": "male" }, { "name": "George", "age": 42, "gender": "male" }, { "name": "Sandra", "age": 43, "gender": "female" }, { "name": "Barbara", "age": 21, "gender": "female" }, { "name": "Tom", "age": 45, "gender": "male" }, { "name": "Phil", "age": 49, "gender": "male" }]
/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {


    /**
     * define selectors using getter methods
     */
    // get inputUsername() {
    //     return $('#username');
    // }

    // get inputPassword() {
    //     return $('#password');
    // }

    get clickTable() {
        return $('//summary');
    }

    get jsonElement() {
        return $('#jsondata')
    }

    get refreshTable() {
        return $('#refreshtable')
    }

    async login() {
        await this.clickTable.click()
        await this.jsonElement.click()
        await this.jsonElement.setValue(`${JSON.stringify(user)}`);
        await this.refreshTable.click();
        let len = await $$('//table[@id="dynamictable"]/tr')
        for (var rowLen = 2; rowLen <= len.length; rowLen++) {
            for (var userLen = rowLen - 2; userLen < user.length; userLen++) {
                let nameText = await $(`//table[@id="dynamictable"]/tr[${rowLen}]/td[text()='${user[userLen].name}']`).getText()
                if (nameText == user[userLen].name) {
                    let txtName = await $(`//table[@id="dynamictable"]/tr[${rowLen}]/td[text()='${user[userLen].name}']`).getText()
                    let txtAge = await $(`//table[@id="dynamictable"]/tr[${rowLen}]/td[text()='${user[userLen].age}']`).getText()
                    let txtGender = await $(`//table[@id="dynamictable"]/tr[${rowLen}]/td[text()='${user[userLen].gender}']`).getText()
                    if ((txtName == user[userLen].name) && (txtAge == user[userLen].age) && (txtGender == user[userLen].gender)) {
                        console.log(`Details of  ${user[userLen].name} are matcing to actual`);
                        break;
                    }
                    else {
                        console.log(`Details of  ${user[userLen].name} are not matcing to actual`);
                        break;
                    }

                }

            }

        }

    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    // async login(username, password) {
    //     await this.inputUsername.setValue(username);
    //     await this.inputPassword.setValue(password);
    //     await this.btnSubmit.click();
    //     JASONPage.sample.forEach(obj => {
    //         console.log(obj);
    //     })
    // }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('login');
    }
}

export default new LoginPage();
