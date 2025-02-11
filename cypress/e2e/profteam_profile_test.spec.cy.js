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
        toastData: {
            toastButton: '#app > div.page > div > div.header-container.header-personal > div.header-container__user-avatar-info > div > div > div.base-icon.base-icon__medium.base-icon__default.notification-bell__icon__desktop > svg',
            readAll: '#app > div.page > div > div.header-container.header-personal > div.header-container__user-avatar-info > div > div > div.notification-bell__similar > aside > header > div.link.link--size-small'
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

        });
    });

    it('Existent application organization test', () => {

        cy.log('Клик по интерфейсу уведомлений');
        cy.get(selectors.toastData.toastButton).click();

        cy.log('Клик кнопке "Прочитать все"');
        cy.get(selectors.toastData.readAll).click();

    });

});