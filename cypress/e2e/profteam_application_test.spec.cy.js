describe('Application Tests', () => {
    const selectors = {
        mainPage: {
            loginButton: '#app > div.page > div > main > div > div.header-container__buttons > a:nth-child(1) > button',
        },
        loginForm: {
            loginInput: 'input[type="text"]',
            passwordInput: 'input[type="password"]',
            submitButton: '#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button',
        },
        putApplication: {
            changeRoleButton: '#app > div.page > div > div.page-navigation > div.page-nav > div.page-nav__menu-item > div.page-nav__role-block > button',
            commercialOrganization: 'body > div:nth-child(6) > div.desktop-modal > div > div.select-role > div.select-role-form > div:nth-child(1)',
            existingOffice: 'body > div:nth-child(6) > div.desktop-modal > div > div.select-role > div.variants-company > div:nth-child(1)',
            organizationInput: 'body > div:nth-child(6) > div.desktop-modal > div > div.choose-company > div > div > div > div > input',
            choiceButton: 'body > div:nth-child(6) > div.desktop-modal > div > div.choose-company > button',
            droppingListInput: 'div[class="search-input__wrapper-result"]',
        },
        putEducation: {
            educationOrganization: 'body > div:nth-child(6) > div.desktop-modal > div > div.select-role > div.select-role-form > div:nth-child(2)',
            existingEducation: 'body > div:nth-child(6) > div.desktop-modal > div > div.select-role > div.variants-company > div:nth-child(1)',
            EducationInput: 'body > div:nth-child(6) > div.desktop-modal > div > div.choose-company > div > div > div > div > input',
            choiceButton: 'body > div:nth-child(6) > div.desktop-modal > div > div.choose-company > button',
            droppingListInput: 'div[class="search-input__wrapper-result"]',
        }
    };

    let testData;

    beforeEach(() => {
        cy.fixture('applicationsTests').then(data => {
            testData = data;
            cy.log('Переход на главную страницу');
            cy.visit(testData.main_url);
            cy.wait(4000);

            cy.log('Клик по кнопке авторизации');
            cy.get(selectors.mainPage.loginButton).click();
            cy.wait(2000);

            cy.log('Вход в аккаунт');
            cy.get(selectors.loginForm.loginInput).type(testData.login);
            cy.get(selectors.loginForm.passwordInput).type(testData.password);
            cy.get(selectors.loginForm.submitButton).click();
            cy.wait(3000);

            cy.log('Клик по кнопке "Выбрать роль"');
            cy.get(selectors.putApplication.changeRoleButton).click();
        });
    });

    it('Existent application organization test', () => {

        cy.log('Клик по блоку коммерческой организации');
        cy.get(selectors.putApplication.commercialOrganization).click();

        cy.log('Клик по блоку существующей коммерческой организации');
        cy.get(selectors.putApplication.existingOffice).click();

        cy.log('Заполнение поля организацией');
        cy.get(selectors.putApplication.organizationInput).type(testData.commercialOrganization);

        cy.log('Выбор организации');
        cy.get(selectors.putApplication.droppingListInput).click();

        cy.log('Клик по кнопке "Выбрать компанию"');
        cy.get(selectors.putApplication.choiceButton).click();
    });
    it('None-existent organization application test', () => {

        cy.log('Клик по блоку коммерческой организации');
        cy.get(selectors.putApplication.commercialOrganization).click();

        cy.log('Клик по блоку существующей коммерческой организации');
        cy.get(selectors.putApplication.existingOffice).click();

        cy.log('Заполнение поля организацией');
        cy.get(selectors.putApplication.organizationInput).type(testData.organization_none_exist);

        cy.log('Проверка что появился элемент сигнализирующий об ошибке');
        cy.contains('Совпадений не найдено').should('be.visible');
    });

    it('Existent application educational test', () => {

        cy.log('Клик по блоку учебной организации');
        cy.get(selectors.putEducation.educationOrganization).click();

        cy.log('Клик по блоку существующей учебной организации');
        cy.get(selectors.putEducation.existingEducation).click();

        cy.log('Заполнение поля организацией');
        cy.get(selectors.putEducation.EducationInput).type(testData.educationOrganization);

        cy.log('Выбор организации');
        cy.get(selectors.putEducation.droppingListInput).click();

        cy.log('Клик по кнопке "Выбрать компанию"');
        cy.get(selectors.putEducation.choiceButton).click();
    });
    it('None-existent organization educational test', () => {

        cy.log('Клик по блоку учебной организации');
        cy.get(selectors.putEducation.educationOrganization).click();

        cy.log('Клик по блоку существующей учебной организации');
        cy.get(selectors.putEducation.existingEducation).click();

        cy.log('Заполнение поля организацией');
        cy.get(selectors.putApplication.organizationInput).type(testData.organization_none_exist);

        cy.log('Проверка что появился элемент сигнализирующий об ошибке');
        cy.contains('Совпадений не найдено').should('be.visible');
    });
});