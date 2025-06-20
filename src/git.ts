import simpleGit from 'simple-git';

const git = simpleGit();

export async function getStagedDiff(): Promise<string> {
  try {
    const diff = await git.diff(['--staged']);
    return diff;
  } catch (err) {
    console.error('❌ Failed to get staged diff:', err);
    return '';
  }
}

export async function commitWithMessage(msg: string) {
  try {
    await git.commit(msg);
  } catch (err) {
    console.error('❌ Git commit failed:', err);
    process.exit(1);
  }
}
