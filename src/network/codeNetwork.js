import {
  getRepoContent, getARepo,
  getRepoBranches, getrRepoLanguages,
  getrRepoContributors,
} from './index'

// 集中发送 code 所有可并行发送的请求，并返回结果集合
export const getConcentrate = async (props) => {
  const [contentRes, repoRes, branchRes, LanguageRes, ContributorsRes] = await Promise.all([
    // 请求文件列表
    getRepoContent(props),

    // 请求仓库信息
    getARepo(props),

    // 请求分支信息
    getRepoBranches(props),

    // 仓库所用语言
    getrRepoLanguages(props),

    // 仓库的贡献者
    getrRepoContributors(props),
  ])

  return {
    contentRes, repoRes, branchRes, LanguageRes, ContributorsRes,
  }
}
