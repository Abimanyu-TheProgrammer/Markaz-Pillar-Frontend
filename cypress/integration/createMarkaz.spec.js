// beforeEach(() => {
//     cy.visit('http://localhost:3000/')
//     localStorage.setItem("currentUser", JSON.stringify("Admin123@gmail.com"))
//     localStorage.setItem("currentUserRole", JSON.stringify("ROLE_SUPERUSER"))
//     localStorage.setItem("currentAccessToken", JSON.stringify('ey@9wersldgndg'))
//     localStorage.setItem("currentRefreshToken", JSON.stringify('refresh'))
//     cy.visit('http://localhost:3000/admin/markaz/create')
// })

beforeEach(() => {
    const testEmail = `achmadafriza123@gmail.com`
    cy.visit('http://localhost:3000/login')
    cy.get('#email').type(testEmail)
    cy.get('#password').type('Admin123')
    cy.get('#submitAtLogin').contains('Masuk').click()
    cy.wait(2000)
    cy.visit('http://localhost:3000/admin/markaz/create')
})

describe('Test it is in the correct page', () => {
    it('Test if create.js contains "Upload New Thumbnail" or not', () => {
        cy.visit('http://localhost:3000/admin/markaz/create')
        cy.get('h5').contains('Upload New Thumbnail').should('exist')
    })

    it('Test if create.js contains "This is create page" or not', () => {
        cy.visit('http://localhost:3000/admin/markaz/create')
        cy.get('p').contains('This is create page').should('not.exist')
    })
})

describe(`Test functionality of inputs when create new markaz`, () => {
    const testMarkaz = `Markaz ${Math.random()}`
    it('Test if succeed', () => {
        cy.get(`[data-cy="dropzone"]`).attachFile('low.png', { subjectType: 'drag-n-drop' });
        cy.get(`#dropzone-uploaded`).should('exist');
        cy.get(`#dropzone-uploaded`).contains('low.png');
        cy.get('#markazNameAtComponentAdminCreateOrEditMarkaz').type(testMarkaz)
        cy.get('#markazBackgroundAtComponentAdminCreateOrEditMarkaz').type('test-fullName')
        cy.get('#category-select').click().get('li').contains('Markaz Umum').click()
        cy.get('#markazAddressAtComponentAdminCreateOrEditMarkaz').type('Bogor')
        cy.get('#markazContactInfoAtComponentAdminCreateOrEditMarkaz').type('0811122343')
        cy.get('#markazContactNameAtComponentAdminCreateOrEditMarkaz').type('Rija')
        cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').click()
        cy.get('#snackbarAtLayout').contains('Markaz Created').should('exist', { timeout: 5000 })
        cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').should('not.be.disabled')
    });

    it('Test if fails if empty field(s)', () => {
        cy.get(`[data-cy="dropzone"]`).attachFile('low.png', { subjectType: 'drag-n-drop' });
        cy.get(`#dropzone-uploaded`).should('exist');
        cy.get(`#dropzone-uploaded`).contains('low.png');
        cy.get('#markazNameAtComponentAdminCreateOrEditMarkaz').type("test-username")
        cy.get('#markazBackgroundAtComponentAdminCreateOrEditMarkaz').type('test-fullName')
        cy.get('#category-select').click().get('li').contains('Markaz Umum').click()
        cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').click()
        cy.get('#snackbarAtLayout').should('exist', {timeout: 5000})
        cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').should('not.be.disabled')
    });

    it('Test if fails if image is too big', () => {
        cy.get(`[data-cy="dropzone"]`).attachFile('high.png', { subjectType: 'drag-n-drop' });
        cy.get(`#dropzone-uploaded`).should('not.exist', {timeout: 5000});
        cy.get('#markazNameAtComponentAdminCreateOrEditMarkaz').type("test-username")
        cy.get('#markazBackgroundAtComponentAdminCreateOrEditMarkaz').type('test-fullName')
        cy.get('#category-select').click().get('li').contains('Markaz Umum').click()
        cy.get('#markazAddressAtComponentAdminCreateOrEditMarkaz').type('0811114433')
        cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').click()
        cy.get('#snackbarAtLayout').should('exist', {timeout: 5000})
        cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').should('not.be.disabled')
    });
});