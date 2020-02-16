const expect = require('expect.js')
const deepClone = require('..')

const checkReferencesAreDifferent = (value1, value2) => expect(value1).not.to.be(value2)
const checkValuesAreEqual = (value1, value2) => expect(value1).to.eql(value2)

describe('the clone deep fn', () => {

    describe('when cloning objects', () => {

        it('should clone an empty object', () => {
            const input = {}
            const clone = deepClone(input)
            // reference check
            checkReferencesAreDifferent(clone, input)
            // values check
            checkValuesAreEqual(clone, input)
        })
        
        it('should clone a shallow object', () => {
            const input = { a: 'prop', another: 'prop' }
            const clone = deepClone(input)
            checkReferencesAreDifferent(clone, input)
            checkValuesAreEqual(clone, input)
        })
        
        it('should clone an object with nested properties', () => {
            const input = { name: 'Paddy', address: { town: 'Lerum', country: 'Sweden' } }
            const clone = deepClone(input)
            checkReferencesAreDifferent(clone, input)
            checkValuesAreEqual(clone, input)
        })

        it('should copy only values, not references', () => {
            const input = { name: 'Paddy', address: { town: 'Lerum', country: 'Sweden' } }
            const clone = deepClone(input)
            clone.address.town = 'Floda'
            // checks if the assignment changed the original object
            expect(input.address.town).to.be('Lerum')
        })

        it('show correctly clone a complex object', () => {
            const input = {
                name: 'Paddy',
                address: {
                    town: 'Lerum',
                    country: 'Sweden'
                },
                companies: [
                    'Spidergap',
                    'Bridging Insight',
                    'PA Consulting',
                    'Majorgold',
                    'IT Innovation'
                ],
                competences: {
                    strategy: {
                        votes: 17,
                    },
                    agile: {
                        votes: 11
                    },
                    consulting: {
                        votes: 9
                    }
                },
                sendEmail: () => console.log('Email sent'),
                created: new Date()
            }
            const clone = deepClone(input)
            checkValuesAreEqual(clone, input)
        })

    })

    describe('when cloning arrays', () => {

        it('should clone an empty array', () => {
            const input = []
            const clone = deepClone(input)
            checkReferencesAreDifferent(clone, input)
            checkValuesAreEqual(clone, input)
        })
        
        it('should clone an one-dimension array', () => {
            const input = [ 'a', 1, null ]
            const clone = deepClone(input)
            checkReferencesAreDifferent(clone, input)
            checkValuesAreEqual(clone, input)
        })
        
        it('should clone an object with nested properties', () => {
            const input = [
                {
                    name: 'Paddy'
                }, 
                {
                    address: {
                        town: 'Lerum',
                        country: 'Sweden'
                    }
                },
                {
                    companies: [
                        'Spidergap',
                        'Bridging Insight',
                        'PA Consulting',
                        'Majorgold',
                        'IT Innovation'
                    ],
                }
            ]
            const clone = deepClone(input)
            checkReferencesAreDifferent(clone, input)
            checkValuesAreEqual(clone, input)
        })

    })

})