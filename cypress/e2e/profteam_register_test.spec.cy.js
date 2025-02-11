Cypress.on('uncaught:exception', (err, runnable) => {
    // Игнорируем ошибку "e is undefined", чтобы тест продолжился
    return false;
});

describe('Registrations Tests', () => {
    const selectors = {
        mainPage: {
            registerButton: '#app > div.page > div > main > div > div.header-container__buttons > a:nth-child(2) > button',
        },
        registrationForm: {
            loginInput: '#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(1) > div > input',
            emailInput: '#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(2) > div > input',
            passwordInput: '#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(3) > div > input',
            passwordConfirmInput: '#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(4) > div > input',
            nextButton: '#app > div.page > div > section > form > div.form__buttons > div:nth-child(4)',
            nameInput: '#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(2) > div:nth-child(1) > div > input',
            surnameInput: '#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(2) > div:nth-child(2) > div > input',
            patronymInput: '#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(2) > div:nth-child(3) > div > input',
            photoInput: '#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(2) > div:nth-child(4) > div > input',
            createAccountButton: '#app > div.page > div > section > form > div.form__buttons > div:nth-child(3)',
        },
        errorMessages: {
            loginError: '#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(1) > div.form-error.form-error--.form-error--.form-error-- > span',
            emailError: '#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(2) > div.form-error.form-error--.form-error--.form-error-- > span',
            passwordError: '#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(3) > div.form-error.form-error--.form-error--.form-error-- > span',
            passwordConfirmError: '#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(4) > div.form-error.form-error--.form-error--.form-error-- > span',
        },
    };

    let testData;

    beforeEach(() => {
        cy.fixture('registrationTests').then(data => {
            testData = data;
            cy.log('Переход на главную страницу');
            cy.visit(testData.main_url);
            cy.wait(4000);

            cy.log('Клик по кнопке регистрации');
            cy.get(selectors.mainPage.registerButton).click();
            cy.wait(4000);
        });
    });

    it('None-existent register test', () => {
        cy.log('Ввод не валидного логина');
        cy.get(selectors.registrationForm.loginInput).type(testData.none_existent_login);

        cy.log('Проверка что появился элемент сигнализирующий об ошибке');
        cy.get(selectors.errorMessages.loginError).should('exist');

        cy.log('Ввод не валидной почты');
        cy.get(selectors.registrationForm.emailInput).type(testData.none_existent_email);

        cy.log('Проверка что появился элемент сигнализирующий об ошибке');
        cy.get(selectors.errorMessages.emailError).should('exist');

        cy.log('Ввод не валидного пароля');
        cy.get(selectors.registrationForm.passwordInput).type(testData.none_existent_password);

        cy.log('Проверка что появился элемент сигнализирующий об ошибке');
        cy.get(selectors.errorMessages.passwordError).should('exist');

        cy.log('Ввод не валидного подтверждения пароля');
        cy.get(selectors.registrationForm.passwordConfirmInput).type(testData.none_existent_password_confirm);

        cy.log('Проверка что появился элемент сигнализирующий об ошибке');
        cy.get(selectors.errorMessages.passwordConfirmError).should('exist');
    });

    it('Existent register test', () => {
        cy.log('Ввод валидного логина');
        cy.get(selectors.registrationForm.loginInput).type(testData.login);

        cy.log('Ввод валидной почты');
        cy.get(selectors.registrationForm.emailInput).type(testData.email);

        cy.log('Ввод валидного пароля');
        cy.get(selectors.registrationForm.passwordInput).type(testData.password);

        cy.log('Ввод валидного подтверждения пароля');
        cy.get(selectors.registrationForm.passwordConfirmInput).type(testData.password_confirm);

        cy.log('Клик по кнопке "Далее"');
        cy.get(selectors.registrationForm.nextButton).click();

        cy.log('Заполнение поля Фамилии');
        cy.get(selectors.registrationForm.nameInput).type(testData.name);

        cy.log('Заполнение поля Имя');
        cy.get(selectors.registrationForm.surnameInput).type(testData.surname);

        cy.log('Заполнение поля Отчества');
        cy.get(selectors.registrationForm.patronymInput).type(testData.patronym);

        cy.log('Загрузка фотографии');
        cy.get(selectors.registrationForm.photoInput).selectFile('files/coding.jpg', { force: true });

        cy.log('Клик по кнопке "Создать аккаунт"');
        cy.get(selectors.registrationForm.createAccountButton).click();
    });
});