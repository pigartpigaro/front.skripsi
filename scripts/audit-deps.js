import { exec } from 'child_process';
import { writeFileSync } from 'fs';

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
        return;
      }
      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch (parseError) {
        reject({ error: parseError, stdout });
      }
    });
  });
};

const auditDependencies = async () => {
  try {
    // First try regular audit
    console.log('Running npm audit...');
    const auditResult = await runCommand('npm audit --json');

    writeFileSync(
      'audit-report.json',
      JSON.stringify(auditResult, null, 2)
    );

    if (auditResult.vulnerabilities) {
      console.log('\nVulnerabilities found:', auditResult.vulnerabilities);

      // Try to fix vulnerabilities
      console.log('\nAttempting to fix vulnerabilities...');
      try {
        await runCommand('npm audit fix');
        console.log('Vulnerabilities fixed where possible');
      } catch (fixError) {
        console.log('Could not automatically fix all vulnerabilities');
        console.log('Consider running: npm audit fix --force');
      }
    }

    // Check for outdated packages
    console.log('\nChecking for outdated packages...');
    try {
      const outdatedPackages = await runCommand('npm outdated --json');
      console.log('Outdated packages:', outdatedPackages);
    } catch (outdatedError) {
      console.log('No outdated packages found');
    }

  } catch (error) {
    console.error('\nError during audit:');
    if (error.stderr) {
      console.error(error.stderr);
    } else {
      console.error(error);
    }

    // Try with legacy peer deps flag as fallback
    console.log('\nRetrying with --legacy-peer-deps...');
    try {
      await runCommand('npm audit --json --legacy-peer-deps');
    } catch (legacyError) {
      console.error('Audit failed even with legacy peer deps');
      process.exit(1);
    }
  }
};

auditDependencies();
