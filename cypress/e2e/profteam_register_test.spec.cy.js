Cypress.on('uncaught:exception', (err, runnable) => {
    // Игнорируем ошибку "e is undefined", чтобы тест продолжился
    return false;
});
describe('Registrations Tests', () => {
    it('None-existent register test', () => {
        cy.fixture('registrationTests').then(data => {

            cy.log('Переход на страницу регистрации')
            cy.visit(data.main_url)
            cy.wait(4000)

            cy.log('Клик по кнопке регистрации')
            cy.get('#app > div.page > div > main > div > div.header-container__buttons > a:nth-child(2) > button')
                .click()
            cy.wait(4000)

            cy.log('Ввод не валидного логина')
            cy.get('#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(1) > div > input')
                .type(data.none_existent_login)

            cy.log('Проверка что появился элемент сигнализирующий об ошибке')
            cy.get('#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(1) > div.form-error.form-error--.form-error--.form-error-- > span')
                .should('exist')

            cy.log('Ввод не валидной почты')
            cy.get('#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(2) > div > input')
                .type(data.none_existent_email)

            cy.log('Проверка что появился элемент сигнализирующий об ошибке')
            cy.get('#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(2) > div.form-error.form-error--.form-error--.form-error-- > span')
                .should('exist')

            cy.log('Ввод не валидного пароля')
            cy.get('#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(3) > div > input')
                .type(data.none_existent_password)

            cy.log('Проверка что появился элемент сигнализирующий об ошибке')
            cy.get('#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(3) > div.form-error.form-error--.form-error--.form-error-- > span')
                .should('exist')

            cy.log('Ввод не валидного подтверждения пароля')
            cy.get('#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(4) > div > input')
                .type(data.none_existent_password_confirm)

            cy.log('Проверка что появился элемент сигнализирующий об ошибке')
            cy.get('#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(4) > div.form-error.form-error--.form-error--.form-error-- > span')
                .should('exist')
        })
    })
    it('Existent register test', () => {
        cy.fixture('registrationTests').then(data => {

            cy.log('Переход на страницу регистрации')
            cy.visit(data.main_url)
            cy.wait(4000)

            cy.log('Клик по кнопке регистрации')
            cy.get('#app > div.page > div > main > div > div.header-container__buttons > a:nth-child(2) > button')
                .click()
            cy.wait(4000)

            cy.log('Ввод валидного логина')
            cy.get('#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(1) > div > input')
                .type(data.login)


            cy.log('Ввод валидной почты')
            cy.get('#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(2) > div > input')
                .type(data.email)

            cy.log('Ввод валидного пароля')
            cy.get('#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(3) > div > input')
                .type(data.password)

            cy.log('Ввод валидного подтверждения пароля')
            cy.get('#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(1) > div:nth-child(4) > div > input')
                .type(data.password_confirm)

            cy.log('Клик по кнопке "Далее"')
            cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(4)')
                .click()

            cy.log('Заполнения поля Фамилии')
            cy.get('#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(2) > div:nth-child(1) > div > input')
                .type(data.name)
            cy.log('Заполнения поля Имя')
            cy.get('#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(2) > div:nth-child(2) > div > input')
                .type(data.surname)
            cy.log('Заполнения поля Отчества')
            cy.get('#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(2) > div:nth-child(3) > div > input')
                .type(data.patronym)

            cy.log('Загрузка фотографию')
            cy.get('#app > div.page > div > section > form > div:nth-child(1) > div.form__labels > div:nth-child(2) > div:nth-child(4) > div > input')
                .selectFile('files/coding.jpg', { force: true });

            cy.log('Клик по кнопке "Создать аккаунт"')
            cy.get('#app > div.page > div > section > form > div.form__buttons > div:nth-child(3)')
                .click()
        })
    })
})