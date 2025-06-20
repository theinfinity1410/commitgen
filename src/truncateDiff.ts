export function truncateDiff(diff: string, maxChars = 3000): string {
    const lines = diff
      .split('\n')
      .filter(line =>
        line.trim() !== '' &&                          // remove blank lines
        !line.trim().startsWith('//') &&              // single-line comments
        !line.trim().startsWith('#') &&               // shell/python comments
        !line.trim().startsWith('*') &&               // block-style comments
        !/^\s*\/\*/.test(line.trim()) &&              // multi-line comment start
        !/^\s*\*/.test(line.trim())                   // continuation of multi-line
      );
  
    let result = '';
    for (const line of lines) {
      if ((result + line + '\n').length > maxChars) break;
      result += line + '\n';
    }
  
    return result.trim();
  }
  