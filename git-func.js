import simpleGit from "simple-git";

const git = simpleGit();

export const getGitDiff = async () => {
  try {
    await git.add(".");

    const diff = await git.diff();
    if (!diff) {
      const diffStaged = await git.diff(["--cached"]);
      return diffStaged;
    }
    return diff;
  } catch (error) {
    console.error("Error getting git diff:", error.message);
    process.exit(1);
  }
};