Cypress.on('uncaught:exception', (err, runnable) => {
    // Игнорируем ошибку "e is undefined", чтобы тест продолжился
    return false;
});

describe('Authorizations Tests', () => {
    // Селекторы
    const selectors = {
        mainPage: {
            loginButton: '#app > div.page > div > main > div > div.header-container__buttons > a:nth-child(1) > button',
        },
        loginForm: {
            loginInput: 'input[type="text"]',
            passwordInput: 'input[type="password"]',
            submitButton: '#app > div.page > div > section > form > div.form__buttons > div:nth-child(3) > button',
        },
    };

    let testData;

    beforeEach(() => {
        cy.fixture('authorizationTests').then(data => {
            testData = data;
            cy.log('Переход на главную страницу');
            cy.visit(testData.main_url);
            cy.wait(4000);

            cy.log('Клик по кнопке авторизации');
            cy.get(selectors.mainPage.loginButton).click();
            cy.wait(4000);
        });
    });

    it('None-existent login test', () => {
        cy.log('Ввод не существующего логина');
        cy.get(selectors.loginForm.loginInput).type(testData.none_existent_login);

        cy.log('Ввод не существующего пароля');
        cy.get(selectors.loginForm.passwordInput).type(testData.none_existent_password);

        cy.wait(2000);
        cy.log('Клик по кнопке "Войти"');
        cy.get(selectors.loginForm.submitButton).click();

        cy.log('Проверка что появился элемент сигнализирующий об ошибке');
        cy.contains('Неверный логин или пароль, попробуйте заново.').should('be.visible');
    });

    it('None-existent second login test', () => {
        cy.log('Ввод валидного логина');
        cy.get(selectors.loginForm.loginInput).type(' ');

        cy.log('Ввод не валидного пароля');
        cy.get(selectors.loginForm.passwordInput).type(' ');

        cy.log('Клик по кнопке "Войти"');
        cy.get(selectors.loginForm.submitButton).click();

        cy.log('Проверка что появился элемент сигнализирующий об ошибке');
        cy.contains('Обязательное поле, без пробелов').should('be.visible');
        cy.contains('Обязательное поле, без пробелов').should('be.visible');
    });

    it('Existent login test', () => {
        cy.log('Ввод существующего логина');
        cy.get(selectors.loginForm.loginInput).type(testData.login);

        cy.log('Ввод существующего пароля');
        cy.get(selectors.loginForm.passwordInput).type(testData.password);

        cy.log('Клик по кнопке "Войти"');
        cy.get(selectors.loginForm.submitButton).click();
        cy.wait(4000);
    });
});