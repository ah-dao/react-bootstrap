import { Octokit } from 'octokit'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const octokit = new Octokit({
  auth: 'token',
})

const requestFunc = async (reqStr, params, npFlag) => {
  npFlag && Nprogress.start()
  const response = await octokit.request(reqStr, { ...params })
  npFlag && Nprogress.done()
  return response
}

function splitGetParams(url) {
  // 切分获取的 link url，返回参数 page
  const queryStr = url.split('?')[1]
  const paramStr = queryStr.split('&')[1]
  const page = parseInt(paramStr.split('=')[1], 10)
  return page
}

export async function getUserRepo({
  username, page, sort, type,
}) {
  const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i
  const lastPattern = /(?<=<)([\S]*)(?=>; rel="Last")/i

  // const response = await octokit.request('GET /users/{username}/repos', {
  //   username,
  //   per_page: 5,
  //   page,
  //   sort,
  //   type,
  //   headers: {
  //     'X-GitHub-Api-Version': '2022-11-28',
  //   },
  // })
  const response = await requestFunc('GET /users/{username}/repos', {
    username,
    per_page: 5,
    page,
    sort,
    type,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  }, false)
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
  // const response = await octokit.request('GET /users/{username}', {
  //   username,
  //   headers: {
  //     'X-GitHub-Api-Version': '2022-11-28',
  //   },
  // })
  const response = await requestFunc('GET /users/{username}', {
    username,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  }, false)
  return response
}

export async function getRepoContent({
  owner, repo, path = undefined, ref,
}) {
  const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner,
    repo,
    path,
    ref,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  // const response = await requestFunc('GET /repos/{owner}/{repo}/contents/{path}', {
  //   owner,
  //   repo,
  //   path,
  //   ref,
  //   headers: {
  //     'X-GitHub-Api-Version': '2022-11-28',
  //   },
  // }, true)
  return response
}

export async function getARepo({ owner, repo }) {
  // const response = await octokit.request('GET /repos/{owner}/{repo}', {
  //   owner,
  //   repo,
  //   headers: {
  //     'X-GitHub-Api-Version': '2022-11-28',
  //   },
  // })
  const response = await requestFunc('GET /repos/{owner}/{repo}', {
    owner,
    repo,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  }, false)
  return response
}

export async function getRepoReadme({ owner, repo }) {
  // const response = await octokit.request('GET /repos/{owner}/{repo}/readme', {
  // })
  const response = await requestFunc('GET /repos/{owner}/{repo}/readme', {
    owner,
    repo,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  }, false)
  return response
}

export async function mdRender({ text, mode = null, context = null }) {
  // const response = await octokit.request('POST /markdown', {
  //   text,
  //   mode,
  //   context,
  //   headers: {
  //     'X-GitHub-Api-Version': '2022-11-28',
  //   },
  // })
  const response = await requestFunc('POST /markdown', {
    text,
    mode,
    context,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  }, false)
  return response
}

// 获取第一页的分支
export async function getRepoBranches({ owner, repo }) {
  const response = await octokit.request('GET /repos/{owner}/{repo}/branches', {
    owner,
    repo,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  return response
}
