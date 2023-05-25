import { Octokit } from 'octokit'

const octokit = new Octokit({
  auth: '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',
  // auth: 'token',
})

function splitGetParams(url) {
  // 切分获取的 link url，返回参数 page
  const queryStr = url.split('?')[1]
  const paramStr = queryStr.split('&')[1]
  const page = parseInt(paramStr.split('=')[1], 10)
  return page
}

export async function getUserRepo({ username, page }) {
  const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i
  const lastPattern = /(?<=<)([\S]*)(?=>; rel="Last")/i

  const response = await octokit.request('GET /users/{username}/repos', {
    username,
    per_page: 5,
    page,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  const linkHeader = response.headers.link
  const pagesRemaining = linkHeader && linkHeader.includes('rel="next"')
  const lastRemaining = linkHeader && linkHeader.includes('rel="last"')
  if (pagesRemaining) {
    const url = linkHeader.match(nextPattern)[0]
    const next = splitGetParams(url)
    response.nextPage = next
  }
  if (lastRemaining) {
    const url = linkHeader.match(lastPattern)[0]
    const last = splitGetParams(url)
    response.lastPage = last
  }
  return response
}

export async function getUserInfo({ username }) {
  const response = await octokit.request('GET /users/{username}', {
    username,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  return response
}

export async function getRepoContent({ owner, repo, path = null }) {
  const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner,
    repo,
    path,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  return response
}
