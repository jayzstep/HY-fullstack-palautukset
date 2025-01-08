const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
      await loginWith(page, 'merivja', 'salainen')
      await expect(page.getByText('Jasse Merivirta logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'merivja', 'väärä')
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })

  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'merivja', 'salainen')
    })

  test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'testiblogi', 'Jaakko Testi', 'www.testi.fi')
      await expect(page.getByTestId('blog-title')).toBeVisible()
  })

  test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'testiblogi', 'Jaakko Testi', 'www.testi.fi')
      await page.getByRole('button', { name: 'show' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
    })


})
})
