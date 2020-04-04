# noise.cat

_Your band home_

Currently just the home of [Left Alive](https://www.leftalive.nl/) and [Coral Springs](https://www.coralsprings.nl/).

**Features and to-do's:**

- [x] See all your planned shows
  - [x] From Google Sheets source
  - [x] From Notion source
  - [ ] From Airtable source?
- [ ] See previous shows and options
- [ ] Share your demo's, with versioning and notes
- [ ] Keep a list of useful links (eg. stageplan, presskit)
- [ ] Member management
  - [x] Remove members from your band
  - [ ] Invite members to your band (yay)

**Development**

`yarn dev` => open [localhost:3000](http://localhost:3000)

**Preview deployments and auth**

Branches and PRs are autodeployed to now.sh domains like https://noisecat-abc.now.sh/

Note: The auth0 config has a hardcoded return url https://noise.cat/api/callback -> this means login on preview deployments will fail. As a hack change the domain from noise.cat to the preview domain and go on your merry way:

https://noise.cat/api/callback -> https://noisecat-abc.now.sh/api/callback

**Storybook**

Stories names `Abc.stories.tsx` will be picked up by storybook.

Run storybook with `yarn storybook`

**License: MIT**
