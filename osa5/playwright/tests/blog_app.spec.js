const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Jasse Merivirta',
        username: 'merivja',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  describe('login', () => {

    test('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, 'merivja', 'salainen')
      await expect(page.getByText('Jasse Merivirta logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'merivja', 'väärä')
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })

  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'merivja', 'salainen')
    })



})
})
