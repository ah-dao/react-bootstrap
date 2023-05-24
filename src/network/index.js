import { Octokit } from 'octokit'

const octokit = new Octokit({
  auth: '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',
})

// function splitGetParams(url) {
//   const queryStr = url.split('?')[1]
//   const paramArr = queryStr.split('&')
// }

export async function getUserRepo(username) {
  const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i
  const lastPattern = /(?<=<)([\S]*)(?=>; rel="Last")/i

  const response = await octokit.request('GET /users/{username}/repos', {
    username,
    per_page: 5,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  const linkHeader = response.headers.link
  const pagesRemaining = linkHeader && linkHeader.includes('rel="next"')
  const lastRemaining = linkHeader && linkHeader.includes('rel="last"')
  console.log('pagesRemaining', pagesRemaining)
  if (pagesRemaining) {
    const url = linkHeader.match(nextPattern)[0]
    console.log(url)
  }
  if (lastRemaining) {
    const url = linkHeader.match(lastPattern)[0]
    console.log(url)
  }
  return response
}
