## Release Checklist

### Create Release Branch
* `git checkout develop`
* `git pull origin develop` - No really. Run this again.
* `git checkout -b release/v${release_version}`

### Pre-release Work
* vBumpo
  * package.json
  * appveyor.yml
* Linting
  * `npm run lint`
  * Fix anything reasonable to fix. Don't fix the unreasonable stuff.
* Regenerate documentation
  * `npm run generate-docs`
  
### Last-minute Checks
* `npm run test-unit`
* `npm run test-integration`

### Release
* `npm run build` - If you do not do this, you will look like a fool on the internet. Ok, an even bigger fool than you already are.
* `npm pack`
* Quadruple check that the pack file contains the dist folder. I don't care if you're sure it has it. Check it again.
* `npm publish`

### Post-release
* `git push origin tag v${release_version}`
* Upstream merge release to master
  * `git checkout master`
  * `git pull origin master`
  * `git merge --no-ff release/v${release_version}`
  * `git push origin master`
* Tag master
  * `git tag v${release_version}`
  * `git push origin tag v${release_version}`
* Downstream merge release to develop
  * `git checkout develop`
  * `git pull origin develop`
  * `git merge --no-ff release/v${release_version}`
  * `git push origin develop`
* Create release on github
  * Upload pack output to the release
