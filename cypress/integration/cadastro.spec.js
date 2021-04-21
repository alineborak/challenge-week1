let Chance = require('chance');
let chance = new Chance();

describe('Cadastrar um novo usuário', () => {
    const userpassword = chance.string({ length: 6, casing: 'lower', alpha: true, numeric: true })
    it('Acessar homepage, clicar em login, selecionar a opcao de criar uma conta', () => {
        cy.visit('baseUrl');
        cy.get('div[class*=header_user_info]').click();
        cy.get('div[class*=form-group] input#email_create').type(chance.email());
        cy.get('button#SubmitCreate').click();
        cy.get('input[type=radio]').check('1');
        cy.get('input#customer_firstname').type(chance.first());
        cy.get('input#customer_lastname').type(chance.last());
        cy.get('input#passwd').type(userpassword);
        cy.get('div[class*=selector] #days').select('22');
        cy.get('div[class*=selector] #months').select('April');
        cy.get('div[class*=selector] #years').select('1989');
        cy.get('input#address1').type(chance.address());
        cy.get('input#city').type(chance.city());
        cy.get('div[class*=selector] #id_state').select('Illinois');
        cy.get('input#postcode').type(10022);
        cy.get('div[class*=account_creation] #other').type(chance.phone({ formatted: false }));
        cy.get('input#phone_mobile').type(chance.phone({ formatted: false }));
        cy.get('input#alias').type(chance.address());
        cy.get('button#submitAccount').click();
        cy.url().should("contain", "?controller=my-account", {timeout: 8000});
        cy.get('div#center_column [class*=info-account]').should('contain', "Welcome to your account. Here you can manage all of your personal information and orders."); 
    });
});