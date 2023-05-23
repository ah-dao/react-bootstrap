import { Octokit } from 'octokit'

const octokit = new Octokit({
  auth: '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',
})

export async function getUserRepo(username) {
  const data = await octokit.request('GET /users/{username}/repos', {
    username,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  return data
}
